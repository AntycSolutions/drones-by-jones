import platform
from urllib import request

from django import http


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


system = platform.system()
port = ''  # optional
server_url = 'http://127.0.0.1{}/'.format(port)
if system == 'Windows':
    extension = '.exe'
elif system == 'Linux':
    extension = ''  # doesn't require extension
else:
    raise Exception('Unknown platform.system')
mapserv_url = '{}cgi-bin/mapserv{}?map='.format(server_url, extension)


def get_mapserv(filename, mapserv_args):
    # TODO: move these into django project?
    map_folder = 'E:/Dropbox/BHIWebAll/'

    file_path = ''.join([map_folder, filename, '.map'])

    extra_mapserv_args = get_extra_mapserv_args(filename, map_folder)

    full_mapserv_url = ''.join(
        [mapserv_url, file_path, mapserv_args, extra_mapserv_args]
    )

    content = None
    with request.urlopen(full_mapserv_url) as f:
        content = f.read()

    return content


def get_extra_mapserv_args(filename, map_folder):
    # TODO: add linux location
    tmp_folder = 'C:/ms4w/tmp/'

    extra_mapserv_args = ''.join(
        [
            '&tmp_folder=', tmp_folder,
            '&map_folder=', map_folder,
            '&server_url=', server_url
        ]
    )

    return extra_mapserv_args
