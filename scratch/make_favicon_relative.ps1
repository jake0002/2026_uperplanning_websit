Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\jake\.gemini\antigravity-ide\brain\00587b66-b3d5-4fc1-8a1d-a61c4a848efe\.user_uploaded\media_1786862511761.png"
$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Source Image Size: $($img.Width)x$($img.Height)"

# Get current script dir
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$destDir = Join-Path -Path $scriptDir -ChildPath "..\implementation"
$destDir = [System.IO.Path]::GetFullPath($destDir)
$imgDir = Join-Path -Path $destDir -ChildPath "images"

if (-not (Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir | Out-Null
}

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

# 1. Copy favicon.png
Copy-Item -Path $srcPath -Destination (Join-Path $destDir "favicon.png") -Force
Copy-Item -Path $srcPath -Destination (Join-Path $imgDir "favicon.png") -Force

# 2. Resized PNGs
$f32 = Join-Path $destDir "favicon-32x32.png"
$f16 = Join-Path $destDir "favicon-16x16.png"
$apple = Join-Path $destDir "apple-touch-icon.png"
$android = Join-Path $destDir "android-chrome-512x512.png"

Resize-Image -src $img -width 32 -height 32 -outputPath $f32
Resize-Image -src $img -width 16 -height 16 -outputPath $f16
Resize-Image -src $img -width 180 -height 180 -outputPath $apple
Resize-Image -src $img -width 512 -height 512 -outputPath $android

Copy-Item -Path $f32 -Destination (Join-Path $imgDir "favicon-32x32.png") -Force
Copy-Item -Path $f16 -Destination (Join-Path $imgDir "favicon-16x16.png") -Force
Copy-Item -Path $apple -Destination (Join-Path $imgDir "apple-touch-icon.png") -Force

# 3. Favicon.ico
$ico = Join-Path $destDir "favicon.ico"
Convert-PngToIco -pngPath $f32 -icoPath $ico
Copy-Item -Path $ico -Destination (Join-Path $imgDir "favicon.ico") -Force

$img.Dispose()
Write-Host "Favicon generation complete!"
