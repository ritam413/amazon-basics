param(
    [Parameter(Position=0)]
    [string]$InputPath
)

$Host.UI.RawUI.WindowTitle = "Fast Video Compressor (1080p High-Efficiency)"

Clear-Host
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "      VIDEO COMPRESSOR (Uses Installed FFmpeg 8.1.1)        " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

if (-not $InputPath) {
    Write-Host "Paste or enter the full path to your video file below:" -ForegroundColor Yellow
    Write-Host "(Tip: You can drag and drop the file directly into this window)" -ForegroundColor Gray
    Write-Host ""
    $InputPath = Read-Host "Video path"
}

# Clean leading/trailing spaces and any quotation marks from drag-and-drop / copy-as-path
$InputPath = $InputPath.Trim().Trim('"').Trim("'")

if (-not $InputPath) {
    Write-Host "`n[ERROR] No file path provided.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

if (-not (Test-Path -LiteralPath $InputPath)) {
    Write-Host "`n[ERROR] File not found: '$InputPath'" -ForegroundColor Red
    Write-Host "Please check the path and try again.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

$fileItem = Get-Item -LiteralPath $InputPath
$outDir = $fileItem.DirectoryName
$baseName = $fileItem.BaseName
$outputPath = Join-Path $outDir "$($baseName)_compressed_1080p.mp4"

$originalSizeMB = [math]::Round($fileItem.Length / 1MB, 2)

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "Input Video:   $($fileItem.FullName) ($originalSizeMB MB)" -ForegroundColor White
Write-Host "Output Video:  $outputPath" -ForegroundColor White
Write-Host "Mode:          1080p AV1 High Efficiency (Target: ~75% size reduction)" -ForegroundColor White
Write-Host "============================================================`n" -ForegroundColor Cyan
Write-Host "Compressing... Please wait (this uses SVT-AV1 1080p encoding)...`n" -ForegroundColor Green

& ffmpeg -i $fileItem.FullName -c:v libsvtav1 -crf 30 -preset 6 -c:a aac -b:a 128k -vf "scale=1920:-2" $outputPath

if (Test-Path -LiteralPath $outputPath) {
    $newFileItem = Get-Item -LiteralPath $outputPath
    $newSizeMB = [math]::Round($newFileItem.Length / 1MB, 2)
    $savedMB = [math]::Round($originalSizeMB - $newSizeMB, 2)
    $savedPercent = [math]::Round((($originalSizeMB - $newSizeMB) / $originalSizeMB) * 100, 1)

    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "Compression Complete!" -ForegroundColor Green
    Write-Host "Saved to:      $outputPath" -ForegroundColor White
    Write-Host "Original Size: $originalSizeMB MB" -ForegroundColor White
    Write-Host "New Size:      $newSizeMB MB (Saved $savedMB MB / $savedPercent%)" -ForegroundColor Yellow
    Write-Host "============================================================`n" -ForegroundColor Green
} else {
    Write-Host "`n[ERROR] Compression failed or output file was not created.`n" -ForegroundColor Red
}

Read-Host "Press Enter to exit"
