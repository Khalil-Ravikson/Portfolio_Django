#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

# Adiciona permissão de execução aos binários do Node, evitando erros de permission denied
echo "==> Configurando permissões..."
chmod +x node_modules/@esbuild/linux-x64/bin/esbuild
chmod +x node_modules/.bin/vite

echo "==> Compilando o frontend com Vite..."
npx vite build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

# Migrações do Django (CRÍTICO)
echo "==> Aplicando as migrações do banco de dados..."
python manage.py migrate

# Coleta de arquivos estáticos
echo "==> Coletando arquivos estáticos do Django..."
python manage.py collectstatic --no-input --clear

# --- DEBUG: Verificar manifest.json ---
echo "==> VERIFICANDO ESTRUTURA DE FICHEIROS ESTÁTICOS (DEBUG) <=="
ls -R /opt/render/project/src/staticfiles/
echo "=========================================================="
echo "==> DEBUG: verificando onde o manifest.json foi parar..."
find /opt/render/project/src/staticfiles -name manifest.json

echo "==> Build concluído com sucesso!"
