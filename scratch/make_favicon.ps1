Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\jake\.gemini\antigravity-ide\brain\00587b66-b3d5-4fc1-8a1d-a61c4a848efe\.user_uploaded\media_1786862511761.png"
$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Source Image Size: $($img.Width)x$($img.Height)"

# Function to resize image into square with padding or stretching
function Resize-Image {
    param(
        [System.Drawing.Image]$src,
        [int]$width,
        [int]$height,
        [string]$outputPath
    )
    $bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.Clear([System.Drawing.Color]::Transparent)

    # Maintain aspect ratio with padding or draw directly
    # Since it's a favicon logo, center it inside square canvas
    $ratioX = $width / $src.Width
    $ratioY = $height / $src.Height
    $ratio = [Math]::Min($ratioX, $ratioY)
    
    $newW = [int]($src.Width * $ratio)
    $newH = [int]($src.Height * $ratio)
    
    $posX = [int](($width - $newW) / 2)
    $posY = [int](($height - $newH) / 2)

    $g.DrawImage($src, $posX, $posY, $newW, $newH)
    $g.Dispose()
    
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved: $outputPath ($width x $height)"
}

# Function to create .ico file containing standard icon sizes
function Convert-PngToIco {
    param(
        [string]$pngPath,
        [string]$icoPath
    )
    $pngImg = [System.Drawing.Image]::FromFile($pngPath)
    $icon = [System.Drawing.Icon]::FromHandle($pngImg.GetHicon())
    $fileStream = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
    $icon.Save($fileStream)
    $fileStream.Close()
    $icon.Dispose()
    $pngImg.Dispose()
    Write-Host "Saved ICO: $icoPath"
}

# Destinations
$destDir = "d:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation"
$imgDir = "$destDir\images"
if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir }

# Generate variations
# 1. Original copied as favicon.png
Copy-Item -Path $srcPath -Destination "$destDir\favicon.png" -Force
Copy-Item -Path $srcPath -Destination "$imgDir\favicon.png" -Force

# 2. Square versions (32x32, 16x16, 180x180 apple touch, 512x512)
Resize-Image -src $img -width 32 -height 32 -outputPath "$destDir\favicon-32x32.png"
Resize-Image -src $img -width 16 -height 16 -outputPath "$destDir\favicon-16x16.png"
Resize-Image -src $img -width 180 -height 180 -outputPath "$destDir\apple-touch-icon.png"
Resize-Image -src $img -width 512 -height 512 -outputPath "$destDir\android-chrome-512x512.png"

# Copy to images dir as well
Copy-Item -Path "$destDir\favicon-32x32.png" -Destination "$imgDir\favicon-32x32.png" -Force
Copy-Item -Path "$destDir\favicon-16x16.png" -Destination "$imgDir\favicon-16x16.png" -Force
Copy-Item -Path "$destDir\apple-touch-icon.png" -Destination "$imgDir\apple-touch-icon.png" -Force

# Generate favicon.ico
Convert-PngToIco -pngPath "$destDir\favicon-32x32.png" -icoPath "$destDir\favicon.ico"
Copy-Item -Path "$destDir\favicon.ico" -Destination "$imgDir\favicon.ico" -Force

$img.Dispose()
Write-Host "Favicon generation completed successfully!"
