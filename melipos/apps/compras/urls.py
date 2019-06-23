
from django.urls import path

from .views import index,monitor,proveedores,ProveedorView,Producto_orden,OrdenView,MoniorOrden

urlpatterns =[
    path('',index,name='compras'),
    path('monitor',monitor,name='monitor'),
    path('proveedores',proveedores,name='proveedores'),
    path('proveedores/api',ProveedorView.as_view()),
    path('productos/api',Producto_orden.as_view()),    
    path('ordenes/api',OrdenView.as_view()),
    path('monitor/api',MoniorOrden.as_view()),
]