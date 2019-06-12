
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('',include('apps.tienda.urls')),
    path('Compras/',include('apps.compras.urls')),
    path('usuarios/',include('apps.empleados.urls')),
    path('Productos/',include('apps.productos.urls')),
    path('Ventas/',include('apps.ventas.urls')),
    path('Inventario/',include('apps.inventario.urls')),
#    path('admin/', admin.site.urls),
]
