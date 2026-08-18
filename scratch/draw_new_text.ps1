Add-Type -AssemblyName System.Drawing

function Draw-NewCaptionOnImage {
    param(
        [string]$srcPath,
        [string]$dstPath,
        [string]$newText,
        [int]$bannerHeight
    )
    $stream = [System.IO.File]::OpenRead($srcPath)
    $orig = [System.Drawing.Image]::FromStream($stream)
    
    $W = [int]$orig.Width
    $H = [int]$orig.Height
    
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    
    # Draw original image
    $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
    $g.DrawImage($orig, $rect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    
    # Draw dark overlay banner at bottom
    $bannerY = [int]($H - $bannerHeight)
    $bannerRect = New-Object System.Drawing.Rectangle(0, $bannerY, $W, $bannerHeight)
    $bannerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 15, 15, 15))
    $g.FillRectangle($bannerBrush, $bannerRect)
    
    # Draw new centered white text
    $font = New-Object System.Drawing.Font("Malgun Gothic", 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    
    $g.DrawString($newText, $font, $textBrush, [System.Drawing.RectangleF]$bannerRect, $sf)
    
    # Cleanup
    $sf.Dispose()
    $font.Dispose()
    $textBrush.Dispose()
    $bannerBrush.Dispose()
    $g.Dispose()
    $orig.Dispose()
    $stream.Close()
    
    # Save as high quality JPEG
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 95L)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    
    $bmp.Save($dstPath, $jpegCodec, $encoderParams)
    $bmp.Dispose()
    Write-Host ("Drawn new caption on {0}" -f $dstPath)
}

Draw-NewCaptionOnImage -srcPath "implementation/images/ux_consulting_1.jpg" -dstPath "implementation/images/ux_consulting_1.jpg" -newText "📷 스타트업 1:1 UX컨설팅" -bannerHeight 46

Draw-NewCaptionOnImage -srcPath "implementation/images/ux_consulting_2.jpg" -dstPath "implementation/images/ux_consulting_2.jpg" -newText "📷 모바일앱 UX리뉴얼 컨설팅" -bannerHeight 44

$bytes1 = [System.IO.File]::ReadAllBytes("implementation/images/ux_consulting_1.jpg")
$b64_1 = [System.Convert]::ToBase64String($bytes1)

$bytes2 = [System.IO.File]::ReadAllBytes("implementation/images/ux_consulting_2.jpg")
$b64_2 = [System.Convert]::ToBase64String($bytes2)

Write-Host ("New drawn Base64 1 len: {0}, Base64 2 len: {1}" -f $b64_1.Length, $b64_2.Length)

[System.IO.File]::WriteAllText("scratch/b64_1.txt", $b64_1)
[System.IO.File]::WriteAllText("scratch/b64_2.txt", $b64_2)
