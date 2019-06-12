
from django.urls import path

from .views import index,proveedores,ProveedorView,Producto_orden,OrdenView

urlpatterns =[
    path('',index,name='compras'),
    path('proveedores',proveedores,name='proveedores'),
    path('proveedores/api',ProveedorView.as_view()),
    path('productos/api',Producto_orden.as_view()),    
    path('ordenes/api',OrdenView.as_view()),
]