#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Instala as dependências do frontend
npm install

# 2. Compila os arquivos TypeScript/CSS para produção
npm run build

# 3. Instala as dependências do Python
pip install -r requirements.txt

# 4. Coleta os arquivos estáticos do Django (incluindo os que o Vite gerou)
python manage.py collectstatic --no-input

# 5. Aplica as migrações do banco de dados
python manage.py migrate