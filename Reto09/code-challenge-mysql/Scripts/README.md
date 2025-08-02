# PowerShell Scripts para Control de Servicios: MongoDB & MySQL (Usuarios de Windows)

Este proyecto te permite administrar fácilmente los servicios de **MongoDB** y **MySQL** desde cualquier consola PowerShell en Windows, usando scripts personalizados y aliases definidos en tu perfil de PowerShell.

---

## ✨ Características

- Iniciar, detener, reiniciar y verificar el estado de los servicios MongoDB y MySQL.
- Registra logs diarios automáticamente en `C:\Scripts\logs`.
- Limpia automáticamente los logs que tengan más de 7 días.
- Alias personalizados para comandos rápidos.

---

## ᴹ Uso de Scripts

### MongoDB

Ubicación del script: `C:\Scripts\MongoDBServiceControl.ps1`

```powershell
mongostatus     # 📋 Ver estado
mongostart      # ✅ Iniciar MongoDB
mongostop       # 🚫 Detener MongoDB
mongorestart    # 🔄 Reiniciar MongoDB
```

### MySQL

Ubicación del script: `C:\Scripts\MySQLServiceControl.ps1`

```powershell
mysqlstatus     # 📋 Ver estado
mysqlstart      # ✅ Iniciar MySQL
mysqlstop       # 🚫 Detener MySQL
mysqlrestart    # 🔄 Reiniciar MySQL
```

---

## 📁 Crear o Editar tu Perfil de PowerShell

Ejecuta en tu terminal:

```powershell
notepad $PROFILE
```

Agrega el siguiente contenido al final del archivo:

```powershell
##################################### MONGO DB #####################################

Function mongostatus  { & "C:\Scripts\MongoDBServiceControl.ps1" -action status }
Function mongostart   { & "C:\Scripts\MongoDBServiceControl.ps1" -action start }
Function mongostop    { & "C:\Scripts\MongoDBServiceControl.ps1" -action stop }
Function mongorestart { & "C:\Scripts\MongoDBServiceControl.ps1" -action restart }

# 🔍 Verificación de aliases MongoDB
$aliases = "mongostatus","mongostart","mongostop","mongorestart"
foreach ($alias in $aliases) {
    $item = Get-Command $alias -ErrorAction SilentlyContinue
    if ($item) {
        Write-Host "✅ Alias '$alias' cargado: $($item.Definition)" -ForegroundColor Green
    } else {
        Write-Host "❌ Alias '$alias' NO está cargado." -ForegroundColor Red
    }
}

####################################### MYSQL ######################################

Function mysqlstatus  { & "C:\Scripts\MySQLServiceControl.ps1" -action status }
Function mysqlstart   { & "C:\Scripts\MySQLServiceControl.ps1" -action start }
Function mysqlstop    { & "C:\Scripts\MySQLServiceControl.ps1" -action stop }
Function mysqlrestart { & "C:\Scripts\MySQLServiceControl.ps1" -action restart }

# 🔍 Verificación de aliases MySQL
$mysqlAliases = "mysqlstart", "mysqlstop", "mysqlrestart", "mysqlstatus"
foreach ($alias in $mysqlAliases) {
    $cmd = Get-Command $alias -ErrorAction SilentlyContinue
    if ($cmd) {
        Write-Host "✅ Alias '$alias' cargado: $($cmd.Definition)" -ForegroundColor Green
    } else {
        Write-Host "❌ Alias '$alias' NO está definido." -ForegroundColor Red
    }
}
```

Guarda el archivo y vuelve a abrir PowerShell para aplicar los cambios.

---

## ⚙️ Agregar la Ruta `C:\Scripts` a Variables de Entorno

1. Abre **Panel de Control → Sistema y Seguridad → Sistema**.
2. Clic en **Configuración avanzada del sistema**.
3. En la pestaña **Opciones avanzadas**, clic en **Variables de entorno**.
4. En **Variables del sistema**, busca y selecciona `Path` → clic en **Editar**.
5. Agrega la ruta:

   ```
   C:\Scripts
   ```
6. Acepta los cambios y reinicia PowerShell (o reinicia la sesión).

---

## 📆 Logs de Servicio

Los logs se almacenan automáticamente por fecha en:

```
C:\Scripts\logs\MySQLService_YYYY-MM-DD.log
C:\Scripts\logs\MongoDBService_YYYY-MM-DD.log
```

Los archivos con más de 7 días se eliminan automáticamente al ejecutar los scripts.

---

## ✉️ Contacto

Para dudas o mejoras, abre un issue o envía tus sugerencias.

---

© 2025 - Scripts de automatización en PowerShell para entornos de desarrollo.
