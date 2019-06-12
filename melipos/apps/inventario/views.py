# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

from django.shortcuts import render

from .models import Inventario_producto
from ..productos.models import Producto, Costo_producto, Clase_producto, Categoria_producto, Familia_producto,Foto_producto,Codigo_producto

from ..Acceso import acceso
from ..manejo_fecha import fecha_hoy
# Create your views here.
def index(request):
    return acceso(request, 'inventario/index.html', {}) 


#api

##clases
class InventarioViwe(APIView):
    def get(self, request):
        inventarios = Inventario_producto.objects.all()
        data = []
        for inventario in inventarios:
            prod = Producto.objects.filter(id = inventario.folio_producto)
            if prod.exists():
                costo_p = Costo_producto.objects.filter(folio_producto = prod[0].id,estatus = "V")
                data.append({
                    'id':inventario.id,
                    'id_producto':prod[0].id,
                    'descripcion':prod[0].descripcion,
                    'venta':costo_p[0].venta,
                    'margen':costo_p[0].margen,
                    'cantidad':inventario.cantidad,
                    'unidad_medida':inventario.unidad_medida,
                })
        return JsonResponse({"inventario":data})

    def post(self, request):
        id = request.data.get("id")
        prod = Producto.objects.filter(id = id)
        codigo = Codigo_producto.objects.filter(Codigo = id)
        data={
            'id':0,
            'id_producto':0,
            'descripcion':'',
            'venta':0,
            'margen':0,
            'cantidad':0,
            'unidad_medida':"PZ",
        }
        if  prod.exists():
            data['id_producto'] = prod[0].id
            data['descripcion'] = prod[0].descripcion
            costo_p = Costo_producto.objects.filter(folio_producto = prod[0].id, estatus = "V")
            data['venta'] = costo_p[0].venta
            data['margen'] = costo_p[0].margen
            inventario = Inventario_producto.objects.filter(folio_producto = prod[0].id)
            if inventario.exists():
                data['id'] = inventario[0].id
                data['cantidad'] = inventario[0].cantidad
                data['unidad_medida'] = inventario[0].unidad_medida
        elif codigo.exists():
            prod = Producto.objects.filter(id = codigo[0].id_producto)
            data['id_producto'] = prod[0].id
            data['descripcion'] = prod[0].descripcion
            costo_p = Costo_producto.objects.filter(folio_producto = prod[0].id, estatus = "V")
            data['venta'] = costo_p[0].venta
            data['margen'] = costo_p[0].margen
            inventario = Inventario_producto.objects.filter(folio_producto = prod[0].id)
            if inventario.exists():
                data['id'] = inventario[0].id
                data['cantidad'] = inventario[0].cantidad
                data['unidad_medida'] = inventario[0].unidad_medida
        return JsonResponse({"inventario":data})

    def put(self, request):
        data = ""
        id = request.data.get("id_producto")
        cantidad = request.data.get("cantidad")
        unidad_medida = request.data.get("unidad_medida")
        usuario = request.session["id_usuario"]

        inventario = Inventario_producto.objects.filter(folio_producto = id)
        if inventario.exists():
            actualizarProducto(inventario,cantidad,unidad_medida,usuario)
            data = "Actualizado..."
        else:
            insertarProducto(id,cantidad,unidad_medida,usuario)
            data = "Guardado..."
        return JsonResponse({"inventario":data})


def insertarProducto(producto,cantidad,unidad_medida,usuario):
    Inventario_producto(
        folio_producto=producto,
        cantidad = cantidad,
        unidad_medida = unidad_medida,
        usuario_creo = usuario,
        usuario_modifico = usuario).save()

def actualizarProducto(inventario,cantidad,unidad_medida,usuario):
    inventario.update(
        cantidad=cantidad,
        unidad_medida = unidad_medida,
        fecha_modificacion=fecha_hoy(),
        usuario_modifico=usuario)
