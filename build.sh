#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD
# Configurado para usar APENAS Python/Django e Static Files (SEM VITE)

# Sai imediatamente se um comando falhar
set -o errexit

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

# ==============================================================================
# Migrações do Django (CRÍTICO para garantir que o banco de dados esteja pronto)
echo "==> Aplicando as migrações do banco de dados..."
python manage.py migrate
# ==============================================================================

# Coleta de arquivos estáticos
echo "==> Coletando arquivos estáticos do Django (JS/CSS Puro)..."
# O Django agora copiará apenas o que estiver em STATICFILES_DIRS (provavelmente BASE_DIR / 'static')
python manage.py collectstatic --no-input --clear

echo "==> Build concluído com sucesso! (Frontend simplificado para JS puro)"
