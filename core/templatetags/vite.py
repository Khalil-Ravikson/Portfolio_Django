import json
from pathlib import Path
from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()

# CORREÇÃO: Removemos o "/dist" extra. O manifest.json é copiado diretamente
# para STATIC_ROOT pelo collectstatic, pois 'dist' está em STATICFILES_DIRS.
VITE_MANIFEST_PATH = settings.STATIC_ROOT / "manifest.json"

@register.simple_tag
def vite_asset(path: str, asset_type: str = "script"):
    """
    Gera as tags <script> ou <link> para os assets do Vite.
    - Em modo de desenvolvimento (DEBUG=True), aponta para o servidor do Vite.
    - Em modo de produção (DEBUG=False), usa os ficheiros compilados do manifest.json.
    """
    if settings.DEBUG:
        dev_server_url = "http://localhost:5173"
        if asset_type == "script":
            # CORREÇÃO: Passamos o caminho completo a partir da pasta 'static'
            return mark_safe(f'<script type="module" src="{dev_server_url}/{path}"></script>')
        elif asset_type == "style":
            # Em modo dev, o Vite injeta estilos automaticamente, não precisamos de link tags
            return ""
    else:
        try:
            with open(VITE_MANIFEST_PATH) as f:
                manifest = json.load(f)
            
            # Buscamos a chave do manifest
            manifest_key = path
            asset_info = manifest.get(manifest_key)
            if not asset_info:
                # Tenta o caminho completo caso o path comece com 'static/'
                manifest_key = f"static/{path}"
                asset_info = manifest.get(manifest_key)
            if not asset_info:
                print(f"AVISO VITE: Asset '{path}' não encontrado no manifest.json")
                return ""

            # Agora, o STATIC_URL deve apontar para a subpasta 'dist' dentro de staticfiles
            # O collectstatic copia o CONTEÚDO de 'dist' para 'staticfiles'.
            # Mas o VITE renomeia os arquivos, então o asset_info['file'] já contém o caminho com hash.
            
            # Usamos STATIC_URL + asset_info['file'] (o nome do arquivo com hash)
            # O nome do arquivo no manifest já inclui a subpasta se houver.
            script_url = f"{settings.STATIC_URL}{asset_info['file']}"
            css_urls = asset_info.get("css", [])
            
            css_tags = ""
            for css_file in css_urls:
                css_url = f"{settings.STATIC_URL}{css_file}"
                css_tags += f'<link rel="stylesheet" href="{css_url}">'

            script_tag = f'<script type="module" src="{script_url}"></script>'
            
            return mark_safe(f"{css_tags}{script_tag}")

        except FileNotFoundError:
             # O erro agora aponta para o caminho CORRETO se falhar (sem o /dist extra)
             print(f"ERRO VITE: Ficheiro manifest.json não encontrado em {VITE_MANIFEST_PATH}")
             return ""
        except KeyError:
            print(f"ERRO VITE: Chave '{manifest_key}' não encontrada no manifest.json. Verifique o caminho passado no template.")
            return ""
        except Exception as e:
            print(f"ERRO VITE inesperado: {e}")
            return ""
