#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

# CORREÇÃO DEFINITIVA: Adiciona permissão de execução ao binário do esbuild
echo "==> Configurando permissões..."
chmod +x node_modules/@esbuild/linux-x64/bin/esbuild

echo "==> Compilando o frontend com Vite..."
npm run build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

echo "==> Coletando ficheiros estáticos do Django..."
python manage.py collectstatic --no-input --clear
### O que Fazer Agora:

#1.  **Copie** o conteúdo do Canvas para o seu ficheiro `build.sh` local.
#2.  **Envie a alteração para o GitHub.** No seu terminal, execute os seguintes comandos:
   # ```bash
    #git add build.sh
    #git commit -m "Fix: Aplica permissão de execução recursiva a todos os binários"
    #git push origin main
    

#3.  **Teste o Script:** Execute o script localmente para garantir que tudo funciona como esperado:
    #```bash
    #./build.sh
    #``` 