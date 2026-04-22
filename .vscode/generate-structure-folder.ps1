# =============================================================
#  generate-structure.ps1
#  Uso: ejecutar desde VS Code Task o directamente en terminal
#  Comand: powershell -ExecutionPolicy Bypass -File .vscode/generate-structure-folder.ps1
#  Ruta carpetas ejemplo: src/config/employee -> Se creará la estructura dentro de src/config/employee
#  Nombre nueva carpeta: stateEmployee -> Se creará la estructura dentro de src/config/employee/stateEmployee
# =============================================================

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Generador de estructura de carpetas" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ── Paso 1: ruta destino ─────────────────────────────────────
Write-Host "Cual es la ruta para crear las carpetas?" -ForegroundColor Yellow
Write-Host "(relativa a la raiz del proyecto, ej: src/config/employee)" -ForegroundColor DarkGray
$rutaRelativa = Read-Host "Ruta"

# ── Paso 2: nombre de la carpeta contenedora ─────────────────
Write-Host ""
Write-Host "Cual es el nombre de la carpeta contenedora?" -ForegroundColor Yellow
Write-Host "(ej: stateEmployee)" -ForegroundColor DarkGray
$nombreCarpeta = Read-Host "Nombre"

# ── Construir ruta base ───────────────────────────────────────
$workspaceRoot = Split-Path -Parent $PSScriptRoot
$rutaLimpia    = $rutaRelativa.TrimStart('/\').Replace('/', '\')
$base          = Join-Path $workspaceRoot "$rutaLimpia\$nombreCarpeta"

Write-Host ""
Write-Host "Generando estructura en: $base" -ForegroundColor Magenta
Write-Host ""

# ── Crear carpetas ────────────────────────────────────────────
$folders = @(
    # domain
    "domain\entities",
    "domain\exceptions",
    "domain\repositories",
    # application
    "application\dtos\responses",
    "application\dtos\requests",
    "application\helpers",
    "application\mappers",
    "application\ports",
    "application\uses-cases",
    # infrastructure
    "infrastructure\database\psql\typeorm\entities",
    "infrastructure\database\psql\queries",
    "infrastructure\database\repositories",
    "infrastructure\http\controllers",
    "infrastructure\http\routers",
    "infrastructure\http\dtos\requests",
    "infrastructure\http\mappers"
)

foreach ($f in $folders) {
    $path = Join-Path $base $f
    New-Item -ItemType Directory -Path $path -Force | Out-Null
    Write-Host "  + $f" -ForegroundColor DarkGreen
}

# ── Resumen final ─────────────────────────────────────────────
Write-Host ""
Write-Host "Estructura creada exitosamente en:" -ForegroundColor Green
Write-Host "  $base" -ForegroundColor White
Write-Host ""
Write-Host "Listo!" -ForegroundColor Cyan
Write-Host ""