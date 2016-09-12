from django.conf import urls
from django.views import generic
from django.contrib import admin

from accounts import urls as account_urls
from mapping import urls as mapping_urls


urlpatterns = [
    urls.url(r'^admin/', urls.include(admin.site.urls)),

    urls.url(r'^accounts/', urls.include(account_urls, namespace='accounts')),
    urls.url(r'^mapping/', urls.include(mapping_urls, namespace='mapping')),

    urls.url(
        r'^$',
        generic.TemplateView.as_view(template_name='index.html'),
        name='index'
    ),
]
