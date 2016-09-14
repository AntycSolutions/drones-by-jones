import platform
from os import path
from urllib import request, error as urllib_error

from django import http
from django.conf import settings


def map_file(request, filename=None):
    mapserv_args = ''.join(['&', request.GET.urlencode()])

    content = get_mapserv(filename, mapserv_args)

    request_var = request.GET.get('REQUEST', None).lower()
    if request_var == "getcapabilities" or request_var == "getfeatureinfo":
        # TODO: read xml
        print("IT'S XML LOL!")
        content_type = "application/xml"
        raise Exception("Not implemented")
    else:
        content_type = request.GET.get('FORMAT', None)

    response = http.HttpResponse(content, content_type=content_type)

    return response


# init environment specific vars
system = platform.system()
port = ''  # optional
server_url = 'http://127.0.0.1{}/'.format(port)
dev_folder = path.dirname(settings.BASE_DIR)
map_folder = '/BHIWebAll/'
tmp_folder = '/tmp/'
if system == 'Windows':
    extension = '.exe'
    map_folder = 'E:/Dropbox' + map_folder
    tmp_folder = 'C:/ms4w' + tmp_folder
elif system == 'Linux':
    extension = ''  # doesn't require extension
    map_folder = dev_folder + map_folder
    tmp_folder = dev_folder + tmp_folder
else:
    raise Exception('Unknown platform.system')
mapserv_url = '{}cgi-bin/mapserv{}?map='.format(server_url, extension)


def get_mapserv(filename, mapserv_args):
    file_path = ''.join([map_folder, filename, '.map'])

    extra_mapserv_args = get_extra_mapserv_args(filename, map_folder)

    full_mapserv_url = ''.join(
        [mapserv_url, file_path, mapserv_args, extra_mapserv_args]
    )

    content = None
    try:
        with request.urlopen(full_mapserv_url) as f:
            content = f.read()
    except urllib_error.HTTPError:
        print("Could not connect to MapServer")

    return content


def get_extra_mapserv_args(filename, map_folder):
    extra_mapserv_args = ''.join(
        [
            '&tmp_folder=', tmp_folder,
            '&map_folder=', map_folder,
            '&server_url=', server_url
        ]
    )

    return extra_mapserv_args
