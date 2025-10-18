import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do ficheiro .env (apenas em desenvolvimento)
load_dotenv()

# Define o diretório base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# --- CONFIGURAÇÃO DE SEGURANÇA ---
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'False').lower() in ['true', '1', 't']

# LÓGICA FINAL E ROBUSTA PARA ALLOWED_HOSTS
ALLOWED_HOSTS = [
    # Adicionamos o seu domínio do Render diretamente para garantir que funciona.
    'portfolio-django-owv9.onrender.com',
]

# Em ambiente de desenvolvimento, permite aceder via localhost
if DEBUG:
    ALLOWED_HOSTS.extend(['127.0.0.1', 'localhost'])

# Em produção, adiciona os domínios a partir das variáveis de ambiente (boa prática)
render_hostname = os.getenv('RENDER_EXTERNAL_HOSTNAME')
if render_hostname:
    ALLOWED_HOSTS.append(render_hostname)

allowed_hosts_env = os.getenv('DJANGO_ALLOWED_HOSTS')
if allowed_hosts_env:
    # Separa os domínios por vírgula, caso queira adicionar mais no futuro
    ALLOWED_HOSTS.extend(host.strip() for host in allowed_hosts_env.split(','))

# --- APLICAÇÕES INSTALADAS ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic', # Para servir ficheiros estáticos em dev
    'django.contrib.staticfiles',
    'core',
    'django_vite',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Para servir ficheiros estáticos em produção
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# --- BANCO DE DADOS ---
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600
    )
}

# --- SENHAS E INTERNACIONALIZAÇÃO ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# --- ARQUIVOS ESTÁTICOS E VITE (CORRIGIDOS) ---



STATIC_URL = '/static/'
# Define o diretório de saída REAL do Vite
VITE_OUTPUT_DIR = BASE_DIR / 'static' / 'dist' / '.vite'


STATICFILES_DIRS = [
    BASE_DIR / 'static',
    VITE_OUTPUT_DIR, # <--- CORREÇÃO: Adiciona a pasta de saída real do Vite
]
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# --- CONFIGURAÇÃO DO DJANGO-VITE ---
# DJANGO_VITE_ASSETS_PATH deve apontar para onde o manifest.json foi copiado.
# Como o conteúdo de VITE_OUTPUT_DIR é copiado para STATIC_ROOT, o manifest estará lá.
DJANGO_VITE_ASSETS_PATH = STATIC_ROOT 
DJANGO_VITE_DEV_MODE = DEBUG

# --- CONFIGURAÇÕES DE SEGURANÇA ADICIONAIS PARA PRODUÇÃO ---
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000 # 1 ano
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
