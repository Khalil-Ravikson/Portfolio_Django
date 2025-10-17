#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

# CORREÇÃO: Adiciona permissão de execução ao binário do Vite
echo "==> Configurando permissões..."
chmod +x node_modules/.bin/vite

echo "==> Compilando o frontend com Vite..."
npm run build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

echo "==> Coletando ficheiros estáticos do Django..."
python manage.py collectstatic --no-input --clear
```

### O que Fazer Agora:

1.  **Substitua** o conteúdo do seu ficheiro `build.sh` local pelo código final que está no Canvas.
2.  **Envie a alteração para o GitHub.** No seu terminal, execute os seguintes comandos:
    ```bash
    # Adicione a alteração ao build.sh
    git add build.sh

    # Crie um commit com uma mensagem clara
    git commit -m "Fix: Adiciona permissão de execução explícita ao Vite"

    # Envie para o GitHub
    git push origin main
    

3.  **Verifique** se o pipeline CI/CD no GitHub Actions está a passar corretamente.