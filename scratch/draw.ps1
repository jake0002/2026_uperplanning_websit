$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public class ImageCaptioner {
    public static string ProcessImage(string srcPath, string text, int bannerHeight) {
        using (FileStream fs = File.OpenRead(srcPath))
        using (Image orig = Image.FromStream(fs)) {
            int w = orig.Width;
            int h = orig.Height;
            using (Bitmap bmp = new Bitmap(w, h))
            using (Graphics g = Graphics.FromImage(bmp)) {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.SmoothingMode = SmoothingMode.HighQuality;
                g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;

                Rectangle rect = new Rectangle(0, 0, w, h);
                g.DrawImage(orig, rect, rect, GraphicsUnit.Pixel);

                Rectangle bannerRect = new Rectangle(0, h - bannerHeight, w, bannerHeight);
                using (SolidBrush bannerBrush = new SolidBrush(Color.FromArgb(210, 15, 15, 15))) {
                    g.FillRectangle(bannerBrush, bannerRect);
                }

                using (Font font = new Font("Malgun Gothic", 14, FontStyle.Bold, GraphicsUnit.Pixel))
                using (SolidBrush textBrush = new SolidBrush(Color.White))
                using (StringFormat sf = new StringFormat()) {
                    sf.Alignment = StringAlignment.Center;
                    sf.LineAlignment = StringAlignment.Center;
                    g.DrawString(text, font, textBrush, bannerRect, sf);
                }

                EncoderParameters encoderParams = new EncoderParameters(1);
                encoderParams.Param[0] = new EncoderParameter(Encoder.Quality, 95L);
                ImageCodecInfo jpegCodec = null;
                foreach (ImageCodecInfo codec in ImageCodecInfo.GetImageEncoders()) {
                    if (codec.MimeType == "image/jpeg") {
                        jpegCodec = codec;
                        break;
                    }
                }

                using (MemoryStream ms = new MemoryStream()) {
                    bmp.Save(ms, jpegCodec, encoderParams);
                    byte[] bytes = ms.ToArray();
                    File.WriteAllBytes(srcPath, bytes);
                    return Convert.ToBase64String(bytes);
                }
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies "System.Drawing.dll"

$b64_1 = [ImageCaptioner]::ProcessImage("d:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\images\ux_consulting_1.jpg", "📷 스타트업 1:1 UX컨설팅", 46)
$b64_2 = [ImageCaptioner]::ProcessImage("d:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\images\ux_consulting_2.jpg", "📷 모바일앱 UX리뉴얼 컨설팅", 44)

Write-Host ("B64_1 len: " + $b64_1.Length + ", B64_2 len: " + $b64_2.Length)

[System.IO.File]::WriteAllText("scratch/b64_1.txt", $b64_1)
[System.IO.File]::WriteAllText("scratch/b64_2.txt", $b64_2)
