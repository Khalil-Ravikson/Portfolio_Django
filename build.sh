#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# Adiciona a pasta de binários do node_modules ao PATH do sistema
# Esta é a correção crucial para o erro 'Permission denied'
export PATH=$PWD/node_modules/.bin:$PATH

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

echo "==> Compilando o frontend com Vite..."
npm run build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

echo "==> Coletando ficheiros estáticos do Django..."
python manage.py collectstatic --no-input --clear
```

### O que Fazer Agora (Última Vez!)

1.  **Substitua** o conteúdo do seu ficheiro `build.sh` local pelo código robusto que forneci acima.
2.  **Envie a alteração para o GitHub.** No seu terminal, execute os seguintes comandos:
    ```bash
    # Adicione a alteração ao build.sh
    git add build.sh

    # Crie um commit com uma mensagem clara
    git commit -m "Fix: Torna o build.sh mais robusto para o ambiente do Render"

    # Envie para o GitHub
    git push origin main
    

