
from django.urls import path

from .views import index,ProductosViwe,FotosView,CodigosView

app_name = "productos"

urlpatterns =[  
    path('',index,name='index'), 
    path('api/',ProductosViwe.as_view()), 
    path('api/fotos',FotosView.as_view()), 
    path('api/codigos',CodigosView.as_view()),
]