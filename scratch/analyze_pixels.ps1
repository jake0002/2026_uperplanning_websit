Add-Type -AssemblyName System.Drawing

function Analyze-BottomPixels($path) {
    $stream = [System.IO.File]::OpenRead($path)
    $bmp = [System.Drawing.Bitmap]::FromStream($stream)
    
    Write-Host ("=== Analyzing {0} ({1}x{2}) ===" -f $path, $bmp.Width, $bmp.Height)
    
    # Check average brightness/darkness of bottom 50 rows vs middle
    for ($y = $bmp.Height - 60; $y -lt $bmp.Height; $y += 5) {
        $totalR = 0; $totalG = 0; $totalB = 0;
        for ($x = 0; $x -lt $bmp.Width; $x += 10) {
            $pixel = $bmp.GetPixel($x, $y)
            $totalR += $pixel.R
            $totalG += $pixel.G
            $totalB += $pixel.B
        }
        $count = [int]($bmp.Width / 10)
        Write-Host ("Row {0}: Avg RGB({1}, {2}, {3})" -f $y, [int]($totalR/$count), [int]($totalG/$count), [int]($totalB/$count))
    }
    
    $bmp.Dispose()
    $stream.Close()
}

Analyze-BottomPixels "implementation/images/ux_consulting_1.jpg"
Analyze-BottomPixels "implementation/images/ux_consulting_2.jpg"
