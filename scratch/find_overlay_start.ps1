Add-Type -AssemblyName System.Drawing

function Find-OverlayStart($path) {
    $stream = [System.IO.File]::OpenRead($path)
    $bmp = [System.Drawing.Bitmap]::FromStream($stream)
    
    Write-Host ("=== Scanning {0} (Original {1}x{2}) ===" -f $path, $bmp.Width, $bmp.Height)
    
    # Scan from y = Height - 150 down to Height
    for ($y = $bmp.Height - 150; $y -lt $bmp.Height; $y += 5) {
        $totalR = 0; $totalG = 0; $totalB = 0;
        for ($x = 0; $x -lt $bmp.Width; $x += 10) {
            $pixel = $bmp.GetPixel($x, $y)
            $totalR += $pixel.R; $totalG += $pixel.G; $totalB += $pixel.B
        }
        $count = [int]($bmp.Width / 10)
        $avgR = [int]($totalR/$count)
        $avgG = [int]($totalG/$count)
        $avgB = [int]($totalB/$count)
        Write-Host ("Row {0}: Avg RGB({1}, {2}, {3})" -f $y, $avgR, $avgG, $avgB)
    }
    
    $bmp.Dispose()
    $stream.Close()
}

Find-OverlayStart "scratch/img1.jpg"
Find-OverlayStart "scratch/img2.jpg"
