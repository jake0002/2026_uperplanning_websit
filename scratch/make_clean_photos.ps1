Add-Type -AssemblyName System.Drawing

function Crop-CleanPhoto($srcPath, $dstPath, $cropBottomPixels) {
    $stream = [System.IO.File]::OpenRead($srcPath)
    $orig = [System.Drawing.Image]::FromStream($stream)
    
    $newW = $orig.Width
    $newH = $orig.Height - $cropBottomPixels
    
    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle(0, 0, $newW, $newH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $newW, $newH)
    
    $g.DrawImage($orig, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $orig.Dispose()
    $stream.Close()
    
    # Save as high quality JPEG
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 95L)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    
    $bmp.Save($dstPath, $jpegCodec, $encoderParams)
    $bmp.Dispose()
    Write-Host ("Clean photo saved to {0} ({1}x{2})" -f $dstPath, $newW, $newH)
}

# Crop 105px from original img1 and 65px from original img2 in scratch/
Crop-CleanPhoto "scratch/img1.jpg" "implementation/images/ux_consulting_1.jpg" 105
Crop-CleanPhoto "scratch/img2.jpg" "implementation/images/ux_consulting_2.jpg" 65

# Base64 encode
$bytes1 = [System.IO.File]::ReadAllBytes("implementation/images/ux_consulting_1.jpg")
$b64_1 = [System.Convert]::ToBase64String($bytes1)

$bytes2 = [System.IO.File]::ReadAllBytes("implementation/images/ux_consulting_2.jpg")
$b64_2 = [System.Convert]::ToBase64String($bytes2)

Write-Host ("Clean Base64 1 len: {0}, Base64 2 len: {1}" -f $b64_1.Length, $b64_2.Length)

[System.IO.File]::WriteAllText("scratch/b64_1.txt", $b64_1)
[System.IO.File]::WriteAllText("scratch/b64_2.txt", $b64_2)
