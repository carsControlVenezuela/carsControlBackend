#!/usr/bin/env bash
# =============================================================================
# gitflow.sh — Automatización de Git Flow
# =============================================================================
# Uso: ./gitflow.sh <comando> [opciones]
#
# Comandos:
#   init                        Inicializa Git Flow en el repositorio
#   feature <start|finish> <nombre>
#   release <start|finish> <version>
#   hotfix  <start|finish> <version>
#   status                      Muestra el estado actual del flujo
#   help                        Muestra esta ayuda
# =============================================================================

set -euo pipefail

# ─── Colores ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ─── Configuración de ramas (editable) ────────────────────────────────────────
MAIN_BRANCH="main"
DEVELOP_BRANCH="develop"
FEATURE_PREFIX="feature/"
RELEASE_PREFIX="release/"
HOTFIX_PREFIX="hotfix/"

# ─── Helpers ──────────────────────────────────────────────────────────────────
log_info()    { echo -e "${BLUE}[INFO]${RESET}  $*"; }
log_success() { echo -e "${GREEN}[OK]${RESET}    $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
log_error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; }
log_step()    { echo -e "\n${BOLD}${CYAN}▶ $*${RESET}"; }

require_git() {
  if ! git rev-parse --git-dir &>/dev/null; then
    log_error "No se encontró un repositorio Git. Ejecuta 'git init' primero."
    exit 1
  fi
}

require_branch() {
  local branch="$1"
  if ! git show-ref --verify --quiet "refs/heads/${branch}"; then
    log_error "La rama '${branch}' no existe. Ejecuta '$(basename "$0") init' primero."
    exit 1
  fi
}

current_branch() {
  git rev-parse --abbrev-ref HEAD
}

branch_exists() {
  git show-ref --verify --quiet "refs/heads/$1"
}

ensure_clean_tree() {
  if ! git diff-index --quiet HEAD --; then
    log_error "Tienes cambios sin commitear. Haz commit o stash antes de continuar."
    exit 1
  fi
}

# ─── Validación de merges prohibidos ──────────────────────────────────────────
# Reglas Git Flow:
#   feature/*  → solo puede mergear en: develop
#   release/*  → solo puede mergear en: main, develop
#   hotfix/*   → solo puede mergear en: main, develop
#   develop    → NO puede mergear directamente en: main
validate_merge() {
  local source_branch="$1"
  local target_branch="$2"

  # Feature → main: PROHIBIDO
  if [[ "$source_branch" == ${FEATURE_PREFIX}* && "$target_branch" == "$MAIN_BRANCH" ]]; then
    log_error "❌ MERGE PROHIBIDO por Git Flow"
    echo -e "   Una rama ${BOLD}feature${RESET} NO puede mergearse directamente en ${BOLD}${MAIN_BRANCH}${RESET}."
    echo -e "   Flujo correcto: feature → ${DEVELOP_BRANCH} → (release) → ${MAIN_BRANCH}"
    exit 1
  fi

  # develop → main directamente: PROHIBIDO (debe pasar por release o hotfix)
  if [[ "$source_branch" == "$DEVELOP_BRANCH" && "$target_branch" == "$MAIN_BRANCH" ]]; then
    log_error "❌ MERGE PROHIBIDO por Git Flow"
    echo -e "   ${BOLD}develop${RESET} NO puede mergearse directamente en ${BOLD}${MAIN_BRANCH}${RESET}."
    echo -e "   Flujo correcto: develop → release/<version> → ${MAIN_BRANCH}"
    exit 1
  fi

  # feature → main (aunque esté en otro orden): PROHIBIDO
  if [[ "$source_branch" == ${FEATURE_PREFIX}* && "$target_branch" != "$DEVELOP_BRANCH" ]]; then
    log_error "❌ MERGE PROHIBIDO por Git Flow"
    echo -e "   Las ramas ${BOLD}feature${RESET} solo pueden mergearse en ${BOLD}${DEVELOP_BRANCH}${RESET}."
    echo -e "   Destino inválido: ${target_branch}"
    exit 1
  fi
}

# Instala un git hook pre-merge-commit que bloquea merges manuales prohibidos
install_merge_guard() {
  local hooks_dir
  hooks_dir="$(git rev-parse --git-dir)/hooks"
  local hook_file="${hooks_dir}/pre-merge-commit"

  cat > "$hook_file" <<'HOOK'
#!/usr/bin/env bash
# Git Flow merge guard — generado por gitflow.sh
# Bloquea merges manuales que violan las reglas de Git Flow

RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

# Cargar configuración
[[ -f ".gitflowrc" ]] && source ".gitflowrc"
MAIN_BRANCH="${MAIN_BRANCH:-main}"
DEVELOP_BRANCH="${DEVELOP_BRANCH:-develop}"
FEATURE_PREFIX="${FEATURE_PREFIX:-feature/}"
RELEASE_PREFIX="${RELEASE_PREFIX:-release/}"
HOTFIX_PREFIX="${HOTFIX_PREFIX:-hotfix/}"

current=$(git rev-parse --abbrev-ref HEAD)
merging=$(git rev-parse --abbrev-ref MERGE_HEAD 2>/dev/null || echo "")

[[ -z "$merging" ]] && exit 0   # no es un merge, dejar pasar

block() {
  echo -e "\n${RED}${BOLD}╔══════════════════════════════════════════════╗${RESET}"
  echo -e "${RED}${BOLD}║  ❌  MERGE BLOQUEADO — Violación Git Flow   ║${RESET}"
  echo -e "${RED}${BOLD}╚══════════════════════════════════════════════╝${RESET}"
  echo -e "$1"
  echo ""
  exit 1
}

# Regla 1: feature → main
if [[ "$merging" == ${FEATURE_PREFIX}* && "$current" == "$MAIN_BRANCH" ]]; then
  block "  Una rama ${BOLD}feature${RESET} NO puede mergearse en ${BOLD}${MAIN_BRANCH}${RESET}.\n  Usa: ./gitflow.sh feature finish <nombre>"
fi

# Regla 2: feature → cualquier cosa que no sea develop
if [[ "$merging" == ${FEATURE_PREFIX}* && "$current" != "$DEVELOP_BRANCH" ]]; then
  block "  Las ramas ${BOLD}feature${RESET} solo se mergean en ${BOLD}${DEVELOP_BRANCH}${RESET}.\n  Destino actual: ${current}"
fi

# Regla 3: develop → main directamente
if [[ "$merging" == "$DEVELOP_BRANCH" && "$current" == "$MAIN_BRANCH" ]]; then
  block "  ${BOLD}develop${RESET} NO puede mergearse directo en ${BOLD}${MAIN_BRANCH}${RESET}.\n  Usa: ./gitflow.sh release start <version>"
fi

exit 0
HOOK

  chmod +x "$hook_file"
  log_success "Hook 'pre-merge-commit' instalado en ${hooks_dir}."
}

# ─── INIT ─────────────────────────────────────────────────────────────────────
cmd_init() {
  require_git
  log_step "Inicializando Git Flow"

  # Crear rama main si no existe
  if ! branch_exists "$MAIN_BRANCH"; then
    log_info "Creando rama '${MAIN_BRANCH}'..."
    git checkout -b "$MAIN_BRANCH" 2>/dev/null || true
    log_success "Rama '${MAIN_BRANCH}' creada."
  else
    log_info "Rama '${MAIN_BRANCH}' ya existe."
  fi

  # Crear rama develop si no existe
  if ! branch_exists "$DEVELOP_BRANCH"; then
    log_info "Creando rama '${DEVELOP_BRANCH}' desde '${MAIN_BRANCH}'..."
    git checkout "$MAIN_BRANCH"
    git checkout -b "$DEVELOP_BRANCH"
    log_success "Rama '${DEVELOP_BRANCH}' creada."
  else
    log_info "Rama '${DEVELOP_BRANCH}' ya existe."
  fi

  git checkout "$DEVELOP_BRANCH"

  # Instalar hook de protección de merges
  install_merge_guard

  # Crear .gitflowrc
  cat > .gitflowrc <<EOF
MAIN_BRANCH=${MAIN_BRANCH}
DEVELOP_BRANCH=${DEVELOP_BRANCH}
FEATURE_PREFIX=${FEATURE_PREFIX}
RELEASE_PREFIX=${RELEASE_PREFIX}
HOTFIX_PREFIX=${HOTFIX_PREFIX}
EOF
  log_success "Archivo .gitflowrc generado."

  echo ""
  echo -e "${GREEN}${BOLD}Git Flow inicializado correctamente.${RESET}"
  echo -e "  Rama principal : ${BOLD}${MAIN_BRANCH}${RESET}"
  echo -e "  Rama desarrollo: ${BOLD}${DEVELOP_BRANCH}${RESET}"
}

# ─── FEATURE ──────────────────────────────────────────────────────────────────
cmd_feature() {
  local action="${1:-}"
  local name="${2:-}"

  require_git
  require_branch "$DEVELOP_BRANCH"

  [[ -z "$action" ]] && { log_error "Uso: gitflow.sh feature <start|finish> <nombre>"; exit 1; }
  [[ -z "$name" ]]   && { log_error "Debes indicar el nombre de la feature."; exit 1; }

  local branch="${FEATURE_PREFIX}${name}"

  case "$action" in
    start)
      log_step "Iniciando feature: ${name}"
      ensure_clean_tree
      git checkout "$DEVELOP_BRANCH"
      git pull origin "$DEVELOP_BRANCH" 2>/dev/null || log_warn "No se pudo hacer pull (¿sin remoto?)."
      git checkout -b "$branch"
      log_success "Rama '${branch}' creada. ¡A trabajar!"
      ;;
    finish)
      log_step "Finalizando feature: ${name}"
      ensure_clean_tree
      require_branch "$branch"
      validate_merge "$branch" "$DEVELOP_BRANCH"
      git checkout "$DEVELOP_BRANCH"
      git pull origin "$DEVELOP_BRANCH" 2>/dev/null || log_warn "No se pudo hacer pull."
      git merge --no-ff "$branch" -m "Merge feature '${name}' into ${DEVELOP_BRANCH}"
      git branch -d "$branch"
      log_success "Feature '${name}' integrada en '${DEVELOP_BRANCH}' y rama eliminada."
      ;;
    *)
      log_error "Acción desconocida: '${action}'. Usa 'start' o 'finish'."
      exit 1
      ;;
  esac
}

# ─── RELEASE ──────────────────────────────────────────────────────────────────
cmd_release() {
  local action="${1:-}"
  local version="${2:-}"

  require_git
  require_branch "$DEVELOP_BRANCH"
  require_branch "$MAIN_BRANCH"

  [[ -z "$action" ]]  && { log_error "Uso: gitflow.sh release <start|finish> <version>"; exit 1; }
  [[ -z "$version" ]] && { log_error "Debes indicar la versión (ej: 1.2.0)."; exit 1; }

  local branch="${RELEASE_PREFIX}${version}"

  case "$action" in
    start)
      log_step "Iniciando release: ${version}"
      ensure_clean_tree
      git checkout "$DEVELOP_BRANCH"
      git pull origin "$DEVELOP_BRANCH" 2>/dev/null || log_warn "No se pudo hacer pull."
      git checkout -b "$branch"
      log_success "Rama '${branch}' creada. Prepara el release (versión, changelog, etc.)."
      ;;
    finish)
      log_step "Finalizando release: ${version}"
      ensure_clean_tree
      require_branch "$branch"

      # Merge en main y tag
      git checkout "$MAIN_BRANCH"
      git pull origin "$MAIN_BRANCH" 2>/dev/null || log_warn "No se pudo hacer pull."
      git merge --no-ff "$branch" -m "Release ${version}"
      git tag -a "v${version}" -m "Release v${version}"
      log_success "Merge en '${MAIN_BRANCH}' y tag 'v${version}' creado."

      # Merge de vuelta en develop
      git checkout "$DEVELOP_BRANCH"
      git merge --no-ff "$branch" -m "Back-merge release ${version} into ${DEVELOP_BRANCH}"
      git branch -d "$branch"
      log_success "Merge en '${DEVELOP_BRANCH}' y rama de release eliminada."

      echo ""
      log_info "Para publicar: git push origin ${MAIN_BRANCH} ${DEVELOP_BRANCH} --tags"
      ;;
    *)
      log_error "Acción desconocida: '${action}'. Usa 'start' o 'finish'."
      exit 1
      ;;
  esac
}

# ─── HOTFIX ───────────────────────────────────────────────────────────────────
cmd_hotfix() {
  local action="${1:-}"
  local version="${2:-}"

  require_git
  require_branch "$MAIN_BRANCH"
  require_branch "$DEVELOP_BRANCH"

  [[ -z "$action" ]]  && { log_error "Uso: gitflow.sh hotfix <start|finish> <version>"; exit 1; }
  [[ -z "$version" ]] && { log_error "Debes indicar la versión del hotfix (ej: 1.2.1)."; exit 1; }

  local branch="${HOTFIX_PREFIX}${version}"

  case "$action" in
    start)
      log_step "Iniciando hotfix: ${version}"
      ensure_clean_tree
      git checkout "$MAIN_BRANCH"
      git pull origin "$MAIN_BRANCH" 2>/dev/null || log_warn "No se pudo hacer pull."
      git checkout -b "$branch"
      log_success "Rama '${branch}' creada desde '${MAIN_BRANCH}'. ¡Aplica el fix!"
      ;;
    finish)
      log_step "Finalizando hotfix: ${version}"
      ensure_clean_tree
      require_branch "$branch"

      # Merge en main y tag
      git checkout "$MAIN_BRANCH"
      git merge --no-ff "$branch" -m "Hotfix ${version}"
      git tag -a "v${version}" -m "Hotfix v${version}"
      log_success "Merge en '${MAIN_BRANCH}' y tag 'v${version}' creado."

      # Merge de vuelta en develop
      git checkout "$DEVELOP_BRANCH"
      git merge --no-ff "$branch" -m "Back-merge hotfix ${version} into ${DEVELOP_BRANCH}"
      git branch -d "$branch"
      log_success "Merge en '${DEVELOP_BRANCH}' y rama de hotfix eliminada."

      echo ""
      log_info "Para publicar: git push origin ${MAIN_BRANCH} ${DEVELOP_BRANCH} --tags"
      ;;
    *)
      log_error "Acción desconocida: '${action}'. Usa 'start' o 'finish'."
      exit 1
      ;;
  esac
}

# ─── STATUS ───────────────────────────────────────────────────────────────────
cmd_status() {
  require_git
  log_step "Estado de Git Flow"

  echo -e "  Rama actual   : ${BOLD}$(current_branch)${RESET}"
  echo ""

  echo -e "${CYAN}Ramas principales:${RESET}"
  for b in "$MAIN_BRANCH" "$DEVELOP_BRANCH"; do
    if branch_exists "$b"; then
      echo -e "  ${GREEN}✔${RESET} ${b}"
    else
      echo -e "  ${RED}✘${RESET} ${b} (no existe)"
    fi
  done

  echo ""
  echo -e "${CYAN}Features activas:${RESET}"
  local features
  features=$(git branch | grep "${FEATURE_PREFIX}" | sed 's/^[* ]*//' || true)
  if [[ -z "$features" ]]; then
    echo "  (ninguna)"
  else
    echo "$features" | while read -r b; do echo "  ${YELLOW}→${RESET} ${b}"; done
  fi

  echo ""
  echo -e "${CYAN}Releases activas:${RESET}"
  local releases
  releases=$(git branch | grep "${RELEASE_PREFIX}" | sed 's/^[* ]*//' || true)
  if [[ -z "$releases" ]]; then
    echo "  (ninguna)"
  else
    echo "$releases" | while read -r b; do echo "  ${YELLOW}→${RESET} ${b}"; done
  fi

  echo ""
  echo -e "${CYAN}Hotfixes activos:${RESET}"
  local hotfixes
  hotfixes=$(git branch | grep "${HOTFIX_PREFIX}" | sed 's/^[* ]*//' || true)
  if [[ -z "$hotfixes" ]]; then
    echo "  (ninguna)"
  else
    echo "$hotfixes" | while read -r b; do echo "  ${YELLOW}→${RESET} ${b}"; done
  fi

  echo ""
  echo -e "${CYAN}Últimos tags:${RESET}"
  git tag --sort=-version:refname | head -5 | while read -r t; do
    echo "  🏷  ${t}"
  done || echo "  (sin tags)"
}

# ─── HELP ─────────────────────────────────────────────────────────────────────
cmd_help() {
  cat <<EOF

${BOLD}${CYAN}gitflow.sh${RESET} — Automatización de Git Flow

${BOLD}USO:${RESET}
  ./gitflow.sh <comando> [opciones]

${BOLD}COMANDOS:${RESET}
  ${GREEN}init${RESET}
      Inicializa Git Flow: crea ramas 'main' y 'develop', y genera .gitflowrc

  ${GREEN}feature start <nombre>${RESET}
      Crea una rama feature/<nombre> desde develop

  ${GREEN}feature finish <nombre>${RESET}
      Mergea feature/<nombre> en develop (--no-ff) y la elimina

  ${GREEN}release start <version>${RESET}
      Crea una rama release/<version> desde develop

  ${GREEN}release finish <version>${RESET}
      Mergea en main, crea tag v<version>, back-merge en develop

  ${GREEN}hotfix start <version>${RESET}
      Crea una rama hotfix/<version> desde main

  ${GREEN}hotfix finish <version>${RESET}
      Mergea en main, crea tag v<version>, back-merge en develop

  ${GREEN}status${RESET}
      Muestra ramas activas de features, releases y hotfixes

  ${GREEN}help${RESET}
      Muestra esta ayuda

${BOLD}EJEMPLOS:${RESET}
  ./gitflow.sh init
  ./gitflow.sh feature start login-oauth
  ./gitflow.sh feature finish login-oauth
  ./gitflow.sh release start 1.0.0
  ./gitflow.sh release finish 1.0.0
  ./gitflow.sh hotfix start 1.0.1
  ./gitflow.sh hotfix finish 1.0.1
  ./gitflow.sh status

${BOLD}CONFIGURACIÓN:${RESET}
  Edita las variables al inicio del script o el archivo .gitflowrc
  para personalizar los nombres de ramas y prefijos.

EOF
}

# ─── DISPATCHER ───────────────────────────────────────────────────────────────
# Cargar .gitflowrc si existe
if [[ -f ".gitflowrc" ]]; then
  # shellcheck source=/dev/null
  source ".gitflowrc"
fi

COMMAND="${1:-help}"
shift || true

case "$COMMAND" in
  init)    cmd_init "$@" ;;
  feature) cmd_feature "$@" ;;
  release) cmd_release "$@" ;;
  hotfix)  cmd_hotfix "$@" ;;
  status)  cmd_status "$@" ;;
  help|--help|-h) cmd_help ;;
  *)
    log_error "Comando desconocido: '${COMMAND}'"
    cmd_help
    exit 1
    ;;
esac
