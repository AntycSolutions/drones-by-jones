# dbj settings

from os import path

# Django settings

BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'accounts',
    'mapping',
    'crispy_forms',
    'utils',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'dbj.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            path.normpath(path.join(BASE_DIR, 'templates')),
        ],
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

WSGI_APPLICATION = 'dbj.wsgi.application'

TIME_ZONE = 'America/Edmonton'
USE_TZ = True
USE_I18N = False
USE_L10N = False

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR + '/static/'
STATICFILES_DIRS = (
    path.join(BASE_DIR, 'assets'),
)

LOGIN_REDIRECT_URL = '/'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
SERVER_EMAIL = 'Drones by Jones <root@localhost>'
DEFAULT_FROM_EMAIL = 'Drones by Jones <no-reply@localhost>'

# third party settings

CRISPY_TEMPLATE_PACK = 'bootstrap3'

# import environment aware settings
if path.isfile(path.join(BASE_DIR, "../prod")):
    from .configs.prod_settings import *
    env = 'prod'
elif path.isfile(path.join(BASE_DIR, "../test")):
    from .configs.test_settings import *
    env = 'test'
elif path.isfile(path.join(BASE_DIR, "../devl")):
    from .configs.devl_settings import *
    env = 'devl'
else:
    raise Exception("Please create a settings decision file.")

if DEBUG:
    INSTALLED_APPS += ('debug_toolbar',)
