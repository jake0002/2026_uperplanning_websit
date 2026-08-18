using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public class CaptionApp {
    public static void Main(string[] args) {
        try {
            string b64_1 = ProcessImage(
                @"implementation\images\ux_consulting_1.jpg", 
                "📷 스타트업 1:1 UX컨설팅", 
                46
            );
            File.WriteAllText(@"scratch\b64_1.txt", b64_1);

            string b64_2 = ProcessImage(
                @"implementation\images\ux_consulting_2.jpg", 
                "📷 모바일앱 UX리뉴얼 컨설팅", 
                44
            );
            File.WriteAllText(@"scratch\b64_2.txt", b64_2);

            Console.WriteLine("SUCCESS");
        } catch (Exception ex) {
            Console.WriteLine("Error: " + ex.Message + "\n" + ex.StackTrace);
        }
    }

    public static string ProcessImage(string srcPath, string text, int bannerHeight) {
        byte[] origBytes = File.ReadAllBytes(srcPath);
        using (MemoryStream msIn = new MemoryStream(origBytes))
        using (Image orig = Image.FromStream(msIn)) {
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

                using (MemoryStream msOut = new MemoryStream()) {
                    bmp.Save(msOut, jpegCodec, encoderParams);
                    byte[] bytes = msOut.ToArray();
                    File.WriteAllBytes(srcPath, bytes);
                    return Convert.ToBase64String(bytes);
                }
            }
        }
    }
}
