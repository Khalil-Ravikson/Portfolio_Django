import json
from pathlib import Path
from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()

# 1. O CAMINHO DE PROCURA: Definimos o caminho onde o manifest.json deve estar após o collectstatic.
# Deve ser na raiz da pasta estática de produção.
VITE_MANIFEST_PATH = settings.STATIC_ROOT / "manifest.json" 

@register.simple_tag
def vite_asset(path: str, asset_type: str = "script"):
    """
    Gera as tags <script> ou <link> para os assets do Vite.
    - Em modo de desenvolvimento (DEBUG=True), aponta para o servidor do Vite.
    - Em modo de produção (DEBUG=False), usa os ficheiros compilados do manifest.json.
    """
    if settings.DEBUG:
        # Modo de Desenvolvimento: Aponta diretamente para o servidor Vite
        dev_server_url = "http://localhost:5173"
        if asset_type == "script":
            # NOTE: O '/@vite/client' é necessário para o HMR do Vite em dev
            return mark_safe(f"""
                <script type="module" src="{dev_server_url}/@vite/client"></script>
                <script type="module" src="{dev_server_url}/{path}"></script>
            """)
        elif asset_type == "style":
            # Em modo dev, o CSS é injetado pelo JS, mas incluímos a tag de fallback
            return mark_safe(f'<link rel="stylesheet" href="{dev_server_url}/{path}">')

    else:
        # Modo de Produção: Lê o manifest.json
        try:
            with open(VITE_MANIFEST_PATH, encoding='utf-8') as f:
                manifest = json.load(f)
            
            # 2. PROCURA DA CHAVE NO MANIFEST: Tenta encontrar a chave original
            manifest_key = path
            asset_info = manifest.get(manifest_key)
            
            # 3. VERIFICAÇÃO DE CHAVE: Se a chave principal falhar, tenta o caminho completo (se necessário)
            if not asset_info:
                manifest_key = f"static/{path}" # Tenta o caminho relativo, se o Vite usou
                asset_info = manifest.get(manifest_key)
            
            if not asset_info:
                print(f"AVISO VITE: Asset '{path}' não encontrado no manifest.json (Chave '{manifest_key}' ausente).")
                return ""

            # 4. CONSTRUÇÃO DA URL DO ASSET: O asset compilado está em STATIC_URL + 'nome do arquivo'
            # NOTA: Usamos STATIC_URL aqui, que é '/static/'
            
            # Arquivo JS/TS principal
            script_url = f"{settings.STATIC_URL}{asset_info['file']}"
            
            # Arquivos CSS associados
            css_tags = ""
            for css_file in asset_info.get("css", []):
                css_url = f"{settings.STATIC_URL}{css_file}"
                css_tags += f'<link rel="stylesheet" href="{css_url}">'

            script_tag = f'<script type="module" src="{script_url}"></script>'
            
            return mark_safe(f"{css_tags}{script_tag}")

        except FileNotFoundError:
             print(f"ERRO VITE: Ficheiro manifest.json não encontrado em {VITE_MANIFEST_PATH}. Confirme que 'npm run build' foi executado ANTES do 'collectstatic'.")
             return ""
        except KeyError:
            print(f"ERRO VITE: A chave de arquivo compilado ('file') está ausente para '{manifest_key}' no manifest.json.")
            return ""
        except Exception as e:
            print(f"ERRO VITE inesperado durante a leitura do manifest: {e}")
            return ""
