#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

# CORREÇÃO DEFINITIVA: Adiciona permissão de execução ao binário do esbuild
echo "==> Configurando permissões..."
# Esta linha é útil caso o Render ou o ambiente de CI/CD tenha problemas de permissão com executáveis do node_modules
chmod +x node_modules/@esbuild/linux-x64/bin/esbuild

echo "==> Compilando o frontend com Vite..."
npm run build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

# ==============================================================================
# CORREÇÃO CRÍTICA: O erro 500 no log anterior era causado pela falta desta etapa.
# O Django precisa criar as tabelas (como core_project) no PostgreSQL.
echo "==> Aplicando as migrações do banco de dados (CRÍTICO para o erro 500)..."
python manage.py migrate
# ==============================================================================

echo "==> Coletando ficheiros estáticos do Django..."
python manage.py collectstatic --no-input --clear
echo "==> Build concluído com sucesso!"

# --- PASSO DE DEBUG: Verificar onde o manifest.json foi parar ---
echo "==> VERIFICANDO ESTRUTURA DE FICHEIROS ESTÁTICOS (DEBUG) <=="
ls -R /opt/render/project/src/staticfiles/
echo "=========================================================="

echo "==> DEBUG: verificando onde o manifest.json foi parar..."
find /opt/render/project/src/staticfiles -name manifest.json
echo "==> Build concluído com sucesso!"