$aliases = "mongostatus","mongostart","mongostop","mongorestart"

foreach ($alias in $aliases) {
    $item = Get-Command $alias -ErrorAction SilentlyContinue
    if ($item) {
        Write-Host "? Alias '$alias' est� cargado y apunta a: $($item.Definition)" -ForegroundColor Green
    } else {
        Write-Host "? Alias '$alias' NO est� cargado." -ForegroundColor Red
    }
}