#!/usr/bin/env bash
# Este script garante que o build funcione em ambientes CI/CD

# Sai imediatamente se um comando falhar
set -o errexit

# --- Frontend Build ---
echo "==> Instalando dependências do frontend..."
npm install

# CORREÇÃO DEFINITIVA: Adiciona permissão de execução a TODOS os binários do node_modules
echo "==> Configurando permissões..."
chmod -R +x node_modules/.bin/

echo "==> Compilando o frontend com Vite..."
npm run build

# --- Backend Setup ---
echo "==> Instalando dependências do backend..."
pip install -r requirements.txt

echo "==> Coletando ficheiros estáticos do Django..."
python manage.py collectstatic --no-input --clear
```

A única mudança foi trocar `chmod +x node_modules/.bin/vite` por `chmod -R +x node_modules/.bin/`. O `-R` (recursivo) aplica a permissão a toda a pasta de binários, resolvendo o problema para o `esbuild` e qualquer outra ferramenta que o Vite precise de usar.

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