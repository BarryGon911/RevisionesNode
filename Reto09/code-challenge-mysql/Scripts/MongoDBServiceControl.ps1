param (
    [ValidateSet("start", "stop", "status", "restart")]
    [string]$action = "status"
)

$serviceName = "MongoDB"
$logDir = Join-Path $PSScriptRoot "logs"
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
}

$today = Get-Date -Format "yyyy-MM-dd"
$logFile = Join-Path $logDir "MongoDBService_$today.log"
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
    Get-ChildItem -Path $logDir -Filter "MongoDBService_*.log" | Where-Object {
        $_.LastWriteTime -lt (Get-Date).AddDays(-$limitDays)
    } | ForEach-Object {
        Remove-Item $_.FullName -Force
        Write-Host "?? Log eliminado: $($_.Name)" -ForegroundColor DarkGray
    }
}

# Limpiar logs viejos antes de ejecutar acción
Clean-OldLogs

switch ($action) {
    "start" {
        try {
            Start-Service -Name $serviceName -ErrorAction Stop
            Log "? Servicio MongoDB INICIADO correctamente." Green
        } catch {
            Log "? ERROR al iniciar MongoDB: $_" Red
        }
    }
    "stop" {
        try {
            Stop-Service -Name $serviceName -ErrorAction Stop
            Log "?? Servicio MongoDB DETENIDO correctamente." Yellow
        } catch {
            Log "? ERROR al detener MongoDB: $_" Red
        }
    }
    "restart" {
        try {
            Restart-Service -Name $serviceName -Force -ErrorAction Stop
            Log "?? Servicio MongoDB REINICIADO correctamente." Cyan
        } catch {
            Log "? ERROR al reiniciar MongoDB: $_" Red
        }
    }
    "status" {
        try {
            $status = Get-Service -Name $serviceName -ErrorAction Stop
            $statusMsg = "?? Estado: $($status.Status)"
            $color = if ($status.Status -eq "Running") { "Green" } else { "DarkYellow" }
            Log $statusMsg $color
            $status | Select-Object Status, Name, DisplayName
        } catch {
            Log "? ERROR al obtener estado de MongoDB: $_" Red
        }
    }
}
