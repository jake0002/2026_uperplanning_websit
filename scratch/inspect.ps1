Add-Type -AssemblyName System.Drawing

$stream1 = [System.IO.File]::OpenRead("scratch/img1.jpg")
$img1 = [System.Drawing.Image]::FromStream($stream1)
Write-Host ("img1 W: {0}, H: {1}" -f $img1.Width, $img1.Height)
$img1.Dispose()
$stream1.Close()

$stream2 = [System.IO.File]::OpenRead("scratch/img2.jpg")
$img2 = [System.Drawing.Image]::FromStream($stream2)
Write-Host ("img2 W: {0}, H: {1}" -f $img2.Width, $img2.Height)
$img2.Dispose()
$stream2.Close()
