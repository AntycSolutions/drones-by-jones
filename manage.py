#!/usr/bin/env python
import sys
from os import path, environ


if __name__ == "__main__":
    BASE_DIR = path.dirname(path.abspath(__file__))

    if path.isfile(path.join(BASE_DIR, '../prod')):
        environ.setdefault(
            "DJANGO_SETTINGS_MODULE", "dbj.configs.prod_settings"
        )
    elif path.isfile(path.join(BASE_DIR, '../devl')):
        environ.setdefault(
            "DJANGO_SETTINGS_MODULE", "dbj.configs.devl_settings"
        )
    else:
        raise Exception('Please create a settings decision file.')

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
