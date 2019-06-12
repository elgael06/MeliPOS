# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

from django.shortcuts import render

from .models import Producto, Costo_producto, Clase_producto, Categoria_producto, Familia_producto,Foto_producto,Codigo_producto
from ..Acceso import acceso
from ..manejo_fecha import fecha_hoy

# Create your views here.
def index(request):
    return acceso(request, 'productos/index.html', {}) 

#api

##clases
class ProductosViwe(APIView):
    def get(self, request):

        productos = Producto.objects.all()
        data = []
        for producto in  productos:

            costo = Costo_producto.objects.filter(folio_producto=producto.id,estatus = "V")
            data.append({
                'id':producto.id,
                'descripcion':producto.descripcion,
                'estatus':producto.estatus,
                'folio_familia':producto.folio_familia,
                'fecha':producto.fecha,
                'fecha_modificacion':producto.fecha_modificacion,
                'usuario_creo':producto.usuario_creo,
                'usuario_modifico':producto.usuario_modifico,
                'costo' : costo[0].costo,
                'venta' : costo[0].venta,
                'margen' : costo[0].margen,
                'iva' : costo[0].iva,
            })

        #data = list( productos.values('id','descripcion','estatus', 'folio_familia','fecha','fecha_modificacion','usuario_creo','usuario_modifico' ))
        
        return JsonResponse({"productos":data})

    def post(self,request):
        descripcion = request.data.get('descripcion')
        folio_familia = request.data.get('folio_familia')
        costo = request.data.get('costo')
        venta = request.data.get('venta')
        margen = request.data.get('margen')
        iva = request.data.get('iva')

        prod = Producto(
            descripcion = descripcion,
            folio_familia = folio_familia,
            fecha = fecha_hoy(),
            fecha_modificacion = fecha_hoy(),
            usuario_creo = request.session["id_usuario"],
            usuario_modifico = request.session["id_usuario"],
        )
        prod.save()
        
        agregar_costo(prod.id,costo,venta,margen,iva,request.session["id_usuario"])

        return JsonResponse({"producto":'Guardado...','id':prod.id})

    def put(self,request):
        id = request.data.get('id')
        descripcion = request.data.get('descripcion')
        folio_familia = request.data.get('folio_familia')
        costo = request.data.get('costo')
        venta = request.data.get('venta')
        margen = request.data.get('margen')
        iva = request.data.get('iva')

        Producto.objects.filter(id = id).update(
            descripcion = descripcion,
            folio_familia = folio_familia,
            fecha_modificacion = fecha_hoy(),
            usuario_modifico = request.session["id_usuario"],
            )
        costo_p = Costo_producto.objects.filter(folio_producto = id,estatus="V",costo = costo,venta = venta,margen = margen, iva = iva).exists()
        if not costo_p:
            agregar_costo(id,costo,venta,margen,iva,request.session["id_usuario"])

        return JsonResponse({"producto":'Actualizado...'})
    
    def patch(self,request):
        id = request.data.get('id')
        Producto.filter(id = id).update(
            estatus = "C",
            fecha_modificacion = fecha_hoy(),
            usuario_modifico = request.session["id_usuario"],
            )
        return JsonResponse({"producto":'Eliminado...'})
     

class ClasesView(APIView):
    def get(self,request):
        Clase = Clase_producto.objects.all()
        data = list( Clase.values('id','Descripcion','estatus', 'fecha','fecha_modificacion','usuario_creo','usuario_modifico'))
        return JsonResponse({"productos":data})

    def post(self,request):
        return JsonResponse({"Clases":'Guardado...'})

    def put(self,request):
        return JsonResponse({"Clases":'Actualizado...'})

    def patch(self,request):
        return JsonResponse({"Clases":'Borrado...'})


class CategoriasView(APIView):
    def get(self,request):
        Clase = Clase_producto.objects.all()
        data = list( Clase.values('id','Descripcion','estatus', 'fecha','fecha_modificacion','usuario_creo','usuario_modifico'))
        return JsonResponse({"productos":data})

    def post(self,request):
        return JsonResponse({"Categorias":'Guardado...'})

    def put(self,request):
        return JsonResponse({"Categorias":'Actualizado...'})

    def patch(self,request):
        return JsonResponse({"Categorias":'Borrado...'})


class FamiliasView(APIView):
    def get(self,request):
        Clase = Clase_producto.objects.all()
        data = list( Clase.values('id','Descripcion','estatus', 'fecha','fecha_modificacion','usuario_creo','usuario_modifico'))
        return JsonResponse({"productos":data})

    def post(self,request):
        return JsonResponse({"Familias":'Guardado...'})

    def put(self,request):
        return JsonResponse({"Familias":'Actualizado...'})

    def patch(self,request):
        return JsonResponse({"Familias":'Borrado...'})

class FotosView(APIView):
    def get(self,request):
        id = request.GET.get('id')
        fotos = Foto_producto.objects.filter(id_producto = id)
        data = list( fotos.values('id','id_producto','foto'))
        return JsonResponse({"fotos":data})

    def post(self,request):
        id = request.data.get('id')
        foto = request.data.get('foto')

        f = Foto_producto(id_producto=id,foto=foto)
        f.save()    
        
        return JsonResponse({"foto":'Guardada...'})

    def put(self,request):
        id = request.GET.get('id')
        foto = request.data.get('foto')
        Foto_producto.objects.filter(id = id).update(foto= foto)
        return JsonResponse({"foto":'Actualizada...'})

    def patch(self,request):
        Foto_producto.objects.filter(id=request.data.get("id")).delete()
        return JsonResponse({"foto":'Borrada...'})    

class CodigosView(APIView):
    def get(self,request):
        id = request.GET.get('id')
        codigo = Codigo_producto.objects.filter(id_producto = id)
        data = list( codigo.values('id','id_producto','Codigo'))
        return JsonResponse({"Codigos":data})

    def post(self,request):
        id = request.data.get('id')
        codigo = request.data.get('codigo')
        respuesta = ""
        estado = False
        print("Codigo=>"+ str(codigo))
        prod = Codigo_producto.objects.filter(Codigo = codigo) 
        print( prod.exists())
        if not prod.exists():
            f = Codigo_producto(id_producto=id,Codigo=codigo)
            f.save()    
            respuesta = 'Guardada...'
            estado = True
        else :
            respuesta = 'Codigo ya Existe...\n Codigo : '+str( prod[0].id )
        return JsonResponse({"Codigo": respuesta, 'estado':estado})  

    def patch(self,request):
        Codigo_producto.objects.filter(id=request.data.get("id")).delete()
        return JsonResponse({"codigo":'Borrada...'})
        

##Metodos
def agregar_costo(id,costo,venta,margen,iva,id_usuario):
    Costo_producto.objects.filter(folio_producto = id).update(estatus = "C")

    costo_prod = Costo_producto(
        folio_producto = id,
        costo = costo,
        venta = venta,
        margen = margen,
        iva = iva,
        fecha = fecha_hoy(),
        fecha_modificacion = fecha_hoy(),
        usuario_creo = id_usuario,
        usuario_modifico = id_usuario,
        estatus = "V"
    )
    costo_prod.save()