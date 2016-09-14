"""
WSGI config for dbj project.
"""

from os import path, environ

from django.core.wsgi import get_wsgi_application


BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))

if path.isfile(path.join(BASE_DIR, '../prod')):
    environ.setdefault("DJANGO_SETTINGS_MODULE", "dbj.configs.prod_settings")
elif path.isfile(path.join(BASE_DIR, '../devl')):
    environ.setdefault("DJANGO_SETTINGS_MODULE", "dbj.configs.devl_settings")
else:
    raise Exception('Please create a settings decision file.')

application = get_wsgi_application()
