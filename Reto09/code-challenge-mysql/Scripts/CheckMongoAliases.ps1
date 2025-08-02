$aliases = "mongostatus","mongostart","mongostop","mongorestart"

foreach ($alias in $aliases) {
    $item = Get-Command $alias -ErrorAction SilentlyContinue
    if ($item) {
        Write-Host "? Alias '$alias' está cargado y apunta a: $($item.Definition)" -ForegroundColor Green
    } else {
        Write-Host "? Alias '$alias' NO está cargado." -ForegroundColor Red
    }
}