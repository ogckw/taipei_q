#blog.urls

from django.conf.urls import url
from . import views


urlpatterns = [
	url(r'^$', views.post_list,name = 'post_list'),
	url(r'^\leaflet', views.leaflet,name = 'leaflet'),
	url(r'^\homePage', views.homePage,name = 'homePage'),
	url(r'^\mainPage', views.mainPage,name = 'mainPage'),
	url(r'^\unite', views.unite,name = 'unite'),
	url(r'^\hotNews', views.hotNews,name = 'hotNews'),
	url(r'^\hotMap', views.hotMap,name = 'hotMap'),
	url(r'^\getTaipei',views.ajax,name='ajax'),
	url(r'^\edge',views.Taipeiedge,name='edge'),
	url(r'^\locPoint/(?P<id>\d+)',views.locPoint,name='locPoint'),
	url(r'^\changeScore/',views.changeScore,name='changeScore'),
	url(r'^\getnews',views.getnews,name='getnews'),
	
]