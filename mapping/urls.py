from django.conf import urls
from django.views import generic
from django.contrib.auth import decorators

from mapping import views


bhi_urlpatterns = [
    urls.url(
        r'^$',
        decorators.login_required(
            generic.TemplateView.as_view(
                template_name='mapping/bhi/index.html'
            )
        ),
        name='index'
    ),
    urls.url(
        r'^(?P<filename>\w+)/$',
        decorators.login_required(views.map_file),
        name='map_file'
    ),
]


urlpatterns = [
    urls.url(r'^bhi/', urls.include(bhi_urlpatterns, namespace='bhi')),
]
