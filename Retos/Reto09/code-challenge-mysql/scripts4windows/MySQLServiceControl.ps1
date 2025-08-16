param (
    [ValidateSet("start", "stop", "restart", "status")]
    [string]$action = "status"
)

$mysqlService = "MySQL80"
$logDir = Join-Path $PSScriptRoot "logs"

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
}

$today = Get-Date -Format "yyyy-MM-dd"
$logFile = Join-Path $logDir "MySQLService_$today.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

function Log {
    param (
        [string]$message,
        [ConsoleColor]$color = "White"
    )
    $entry = "$timestamp - $message"
    Write-Host $entry -ForegroundColor $color
    Add-Content -Path $logFile -Value $entry
}

function Clean-OldLogs {
    $limitDays = 7
    Get-ChildItem -Path $logDir -Filter "MySQLService_*.log" | Where-Object {
        $_.LastWriteTime -lt (Get-Date).AddDays(-$limitDays)
    } | ForEach-Object {
        Remove-Item $_.FullName -Force
        Write-Host "?? Log eliminado: $($_.Name)" -ForegroundColor DarkGray
    }
}

# Limpiar logs viejos
Clean-OldLogs

# Ejecutar acción sobre el servicio MySQL
switch ($action) {
    "start" {
        try {
            Start-Service -Name $mysqlService -ErrorAction Stop
            Log "? Servicio MySQL INICIADO correctamente." Green
        } catch {
            Log "? ERROR al iniciar MySQL: $_" Red
        }
    }
    "stop" {
        try {
            Stop-Service -Name $mysqlService -ErrorAction Stop
            Log "?? Servicio MySQL DETENIDO correctamente." Yellow
        } catch {
            Log "? ERROR al detener MySQL: $_" Red
        }
    }
    "restart" {
        try {
            Restart-Service -Name $mysqlService -Force -ErrorAction Stop
            Log "?? Servicio MySQL REINICIADO correctamente." Cyan
        } catch {
            Log "? ERROR al reiniciar MySQL: $_" Red
        }
    }
    "status" {
        try {
            $status = Get-Service -Name $mysqlService -ErrorAction Stop
            $statusMsg = "?? Estado MySQL: $($status.Status)"
            $color = if ($status.Status -eq "Running") { "Green" } else { "DarkYellow" }
            Log $statusMsg $color
            $status | Select-Object Status, Name, DisplayName
        } catch {
            Log "? ERROR al obtener estado de MySQL: $_" Red
        }
    }
}
