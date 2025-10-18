import json
from pathlib import Path
from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()

# Pega o caminho do manifest.json se existir, ou None
VITE_MANIFEST_PATH = getattr(settings, "DJANGO_VITE_ASSETS_PATH", None)
if VITE_MANIFEST_PATH:
    VITE_MANIFEST_PATH = Path(VITE_MANIFEST_PATH)

@register.simple_tag
def vite_asset(path: str, asset_type: str = "script"):
    """
    Gera as tags <script> ou <link> para os assets do Vite.
    - DEBUG=True: usa o servidor dev Vite
    - DEBUG=False: usa o manifest.json compilado
    """
    if settings.DEBUG:
        # Servidor Vite em dev
        dev_server_url = "http://localhost:5173"
        if asset_type == "script":
            return mark_safe(f"""
                <script type="module" src="{dev_server_url}/@vite/client"></script>
                <script type="module" src="{dev_server_url}/{path}"></script>
            """)
        elif asset_type == "style":
            return mark_safe(f'<link rel="stylesheet" href="{dev_server_url}/{path}">')
        else:
            return ""

    else:
        # Produção: lê o manifest.json
        if not VITE_MANIFEST_PATH or not VITE_MANIFEST_PATH.exists():
            print(f"ERRO VITE: manifest.json não encontrado em {VITE_MANIFEST_PATH}")
            return ""

        try:
            with open(VITE_MANIFEST_PATH, encoding="utf-8") as f:
                manifest = json.load(f)

            asset_info = manifest.get(path) or manifest.get(f"static/{path}")
            if not asset_info:
                print(f"AVISO VITE: Asset '{path}' não encontrado no manifest.json")
                return ""

            # URL do JS principal
            script_url = f"{settings.STATIC_URL}{asset_info['file']}"

            # Tags CSS associadas
            css_tags = ""
            for css_file in asset_info.get("css", []):
                css_tags += f'<link rel="stylesheet" href="{settings.STATIC_URL}{css_file}">'

            script_tag = f'<script type="module" src="{script_url}"></script>'
            return mark_safe(f"{css_tags}{script_tag}")

        except Exception as e:
            print(f"ERRO VITE inesperado: {e}")
            return ""
