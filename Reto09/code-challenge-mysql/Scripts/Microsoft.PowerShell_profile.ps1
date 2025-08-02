##################################### MONGO DB #####################################

Function mongostatus  { & "C:\Scripts\MongoDBServiceControl.ps1" -action status }
Function mongostart   { & "C:\Scripts\MongoDBServiceControl.ps1" -action start }
Function mongostop    { & "C:\Scripts\MongoDBServiceControl.ps1" -action stop }
Function mongorestart { & "C:\Scripts\MongoDBServiceControl.ps1" -action restart }

# ?? Verificación automática de aliases personalizados de MongoDB al iniciar PowerShell
$aliases = "mongostatus","mongostart","mongostop","mongorestart"

foreach ($alias in $aliases) {
    $item = Get-Command $alias -ErrorAction SilentlyContinue
    if ($item) {
        Write-Host "? Alias '$alias' está cargado y apunta a: $($item.Definition)" -ForegroundColor Green
    } else {
        Write-Host "? Alias '$alias' NO está cargado." -ForegroundColor Red
    }
}

# mongostart      # ? Iniciar MongoDB
# mongostop       # ?? Detener MongoDB
# mongostatus     # ?? Ver estado
# mongorestart    # ?? Reiniciar MongoDB

####################################################################################

####################################### MYSQL ######################################

Function mysqlstatus  { & "C:\Scripts\MySQLServiceControl.ps1" -action status }
Function mysqlstart   { & "C:\Scripts\MySQLServiceControl.ps1" -action start }
Function mysqlstop    { & "C:\Scripts\MySQLServiceControl.ps1" -action stop }
Function mysqlrestart { & "C:\Scripts\MySQLServiceControl.ps1" -action restart }

# ?? Verificación automática de aliases personalizados de MySQL al iniciar PowerShell
$mysqlAliases = "mysqlstart", "mysqlstop", "mysqlrestart", "mysqlstatus"

foreach ($alias in $mysqlAliases) {
    $cmd = Get-Command $alias -ErrorAction SilentlyContinue
    if ($cmd) {
        Write-Host "? Alias '$alias' está cargado y apunta a: $($cmd.Definition)" -ForegroundColor Green
    } else {
        Write-Host "? Alias '$alias' NO está definido." -ForegroundColor Red
    }
}

####################################################################################