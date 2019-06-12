from django.urls import path

from .views import index,InventarioViwe

app_name = "productos"

urlpatterns =[  
    path('',index,name='index'), 
    path('api/',InventarioViwe.as_view()),
]