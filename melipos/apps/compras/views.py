# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date,timedelta
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
import json

from django.shortcuts import render

from ..Acceso import acceso
from ..manejo_fecha import fecha_hoy
from ..productos.models import Producto ,Codigo_producto,Costo_producto
from ..empleados.models import Usuario
from ..inventario.models import Inventario_producto

# Create your views here.
from .models import Proveedor,Orden,Productos_orden

def index(request):
    return acceso(request, 'compras/index.html', {}) 

def proveedores(request):
    return acceso(request, 'compras/proveedores.html', {}) 

def monitor(request):
    return acceso(request, 'compras/monitor.html', {}) 

# Api
class ProveedorView(APIView):
    def get(self, request):
        id = request.GET.get("id")
        data = None
        if id :
            data = self.Obtener_proveedor(id)
        else:
          data = self.Obtener_proveedores()
        return JsonResponse(data)

    def post(self, request):
        id = request.data.get("Id")
        Nombre = request.data.get("Nombre")
        RFC = request.data.get("RFC")
        Direccion = request.data.get("Direccion")
        Email = request.data.get("Email")
        Telefono = request.data.get("Telefono")
        Representante = request.data.get("Representante")
        Descripcion = request.data.get("Descripcion")
        estatus = request.data.get("estatus")
        usuario = request.session["id_usuario"]
        data = ""
        if id == 0:
            self.guardar_proveedor(Nombre,RFC,Direccion,Email,Telefono,Representante,Descripcion,estatus,usuario)
            data = "Guardado..."
        else:
            self.actualizar_proveedor(id,Nombre,RFC,Direccion,Email,Telefono,Representante,Descripcion,estatus,usuario)
            data = "Actualizado..."
        return JsonResponse({"respuesta":data})

    def put(self, request):
        id = request.data.get("id")
        data = "Eliminado..."
        Proveedor.filter(id=id).update(
            estatus='C'
        )
        return JsonResponse({"proveedor":data})
    ###Proveedores
    def Obtener_proveedor(self,id):
        data = {'Id':0,
                'Nombre':'',
                'RFC':'',
                'Direccion':'',
                'Email':'',
                'Telefono':'',
                'Representante':'',
                'Descripcion':'',
                'estatus':'',
                }
        prov = Proveedor.objects.filter(id=id)
        if prov.exists():
            data = {
                'Id':prov[0].id,
                'Nombre':prov[0].Nombre,
                'RFC':prov[0].RFC,
                'Direccion':prov[0].Direccion,
                'Email':prov[0].Email,
                'Telefono':prov[0].Telefono,
                'Representante':prov[0].Representante,
                'Descripcion':prov[0].Descripcion,
                'estatus':prov[0].estatus,
            }
        return data

    def Obtener_proveedores(self):
        data =[]
        proveedores = Proveedor.objects.all()
        for prov in proveedores:
                data.append({
                    'Id':prov.id,
                    'Nombre':prov.Nombre,
                    'RFC':prov.RFC,
                    'Direccion':prov.Direccion,
                    'Email':prov.Email,
                    'Telefono':prov.Telefono,
                    'Representante':prov.Representante,
                    'Descripcion':prov.Descripcion,
                    'estatus':prov.estatus,
                })
        return {'Lista':data}

    def guardar_proveedor(self,Nombre,RFC,Direccion,Email,Telefono,Representante,Descripcion,estatus,usuario):
        Proveedor(
            Nombre=Nombre,
            RFC=RFC,
            Direccion=Direccion,
            Email=Email,
            Telefono=Telefono,
            Representante=Representante,
            Descripcion=Descripcion,
            estatus=estatus,
            usuario_creo=usuario,
            usuario_modifico=usuario,
        ).save()

    def actualizar_proveedor(self,id,Nombre,RFC,Direccion,Email,Telefono,Representante,Descripcion,estatus,usuario):
        Proveedor.objects.filter(id=id).update(
            Nombre=Nombre,
            RFC=RFC,
            Direccion=Direccion,
            Email=Email,
            Telefono=Telefono,
            Representante=Representante,
            Descripcion=Descripcion,
            estatus=estatus,
            fecha_modificacion=fecha_hoy(),
            usuario_modifico=usuario,
        )

class MoniorOrden(APIView):
    def get(self, request):
        inicio = request.GET.get("inicio")
        fin = request.GET.get("fin")
        total =0
        data = self.Obtener_orden(f1=inicio,f2=fin)
        for t in data:
            total = total+t["Total"]

        return JsonResponse({"ordenes":data,"Total":total})

    def Obtener_orden(self,f1,f2):
        data =[]
        ord = Orden.objects.filter(fecha__range=[f1, f2])
        for dato in ord:
            prov = Proveedor.objects.filter(id= dato.Folio_proveedor)
            prod_in = Productos_orden.objects.filter(folio_orden = dato.id)

            productos =[]
            for prod in prod_in:
                p = Producto.objects.filter(id=prod.folio_producto)
                productos.append({
                    'id':p[0].id,
                    'descripcion':p[0].descripcion,
                    'costo':prod.costo,
                    'venta':prod.venta,
                    'iva':prod.iva,
                    'margen':prod.margen,
                    'cantidad':prod.Cantidad,
                    'total':prod.Total,
                })
            data.append({
                'id':dato.id,
                'Folio_proveedor':dato.Folio_proveedor,
                'proveedor':prov[0].Nombre,
                'productos':dato.productos,
                'Total':dato.Total,
                'Descripcion':dato.Descripcion,
                'estatus':dato.estatus,
                'fecha':dato.fecha,
                'fecha_modificacion':dato.fecha_modificacion,
                'usuario_creo':dato.usuario_creo,
                'usuario_modifico':dato.usuario_modifico,
                'Productos_lista':productos
            })
        return data

class OrdenView(APIView):
    def get(self, request):
        data = None
        id = request.GET.get("id")
        if id :
            data  = self.Obtener_orden(id)
        else :
              data = self.Obtener_ordenes()
        return JsonResponse({"orden":data})

    def post(self, request):
        id = request.data.get("id")
        Folio_proveedor = request.data.get("Folio_proveedor")
        Total = request.data.get("Total")
        estatus = request.data.get("estatus")
        Descripcion = request.data.get("Descripcion")
        productos = request.data.get("productos")
        proveedor = request.data.get("proveedor")
        usuario = request.session["id_usuario"]
        
        data = {
            'folio':0,
            'estatus':'',
        }
        print(id)
        if id>0 :
            data['folio'] = self.actualizar_ordenes(id,Folio_proveedor,Total,Descripcion,estatus,productos,usuario)
            data[ 'estatus'] = 'Actualizado...'
        else :
            data['folio']  = self.guardar_ordenes(Folio_proveedor,Total,Descripcion,estatus,productos,proveedor,usuario)
            data[ 'estatus'] = 'Guardado...'
        print("Listo...")

        return JsonResponse({"orden":data})
            
    def put(self, request):
        id = request.data.get("id")
        ord = Orden.objects.filter(id=id).delete()
        return JsonResponse({"ordenes":id})
    ###Ordenes
    def Obtener_orden(self,id):
        data ={}
        ord = Orden.objects.filter(id=id)
        if ord.exists():
            prov = Proveedor.objects.filter(id= ord[0].Folio_proveedor)
            prod_in = Productos_orden.objects.filter(folio_orden = id)
            productos =[]
            for prod in prod_in:
                p = Producto.objects.filter(id=prod.folio_producto)
                productos.append({
                    'id':p[0].id,
                    'descripcion':p[0].descripcion,
                    'costo':prod.costo,
                    'venta':prod.venta,
                    'iva':prod.iva,
                    'margen':prod.margen,
                    'cantidad':prod.Cantidad,
                    'total':prod.Total,
                })
            data={
                'id':ord[0].id,
                'Folio_proveedor':ord[0].Folio_proveedor,
                'proveedor':prov[0].Nombre,
                'productos':ord[0].productos,
                'Total':ord[0].Total,
                'Descripcion':ord[0].Descripcion,
                'estatus':ord[0].estatus,
                'fecha':ord[0].fecha,
                'fecha_modificacion':ord[0].fecha_modificacion,
                'usuario_creo':ord[0].usuario_creo,
                'usuario_modifico':ord[0].usuario_modifico,
                'Productos_lista':productos
            }
        return data

    def Obtener_ordenes(self):
        data =[]
        orden = Orden.objects.all()
        for ord in orden:
            #'proveedor':ord.proveedor,
            prov = Proveedor.objects.filter(id = ord.Folio_proveedor)
            usr_c = Usuario.objects.filter(id = ord.usuario_creo)
            usr_m = Usuario.objects.filter(id = ord.usuario_modifico)
            #usuarios
            data.append({
                'id':ord.id,
                'Folio_proveedor':ord.Folio_proveedor,
                'proveedor':prov[0].Nombre,
                'productos':ord.productos,
                'Total':ord.Total,
                'Descripcion':ord.Descripcion,
                'estatus':ord.estatus,
                'fecha':ord.fecha,
                'fecha_modificacion':ord.fecha_modificacion,
                'usuario_creo':usr_c[0].nombre_completo,
                'usuario_modifico':usr_m[0].nombre_completo,
            })
        return {'lista':data}

    def guardar_ordenes(self,Folio_proveedor,Total,Descripcion,estatus,productos,proveedor,usuario):
        print('Guardar...')
        ord =  Orden(
            Folio_proveedor = Folio_proveedor,
            productos =productos,
            Total = Total,
            Descripcion = Descripcion,
            estatus = estatus,
            fecha = fecha_hoy(),
            fecha_modificacion =fecha_hoy(),
            usuario_creo =usuario,
            usuario_modifico =usuario,
        )
        ord.save()
        return ord.id

    def actualizar_ordenes(self,id,Folio_proveedor,Total,Descripcion,estatus,productos,usuario):
        print('Actualizar...')
        ord = Orden.objects.filter(id = id)
        print(ord.exists())
        print(Folio_proveedor)
        print(Total)
        print(Descripcion)
        print(estatus)
        print(productos)
        print(usuario)
        ord.update(
                Folio_proveedor = Folio_proveedor,
                productos =productos,
                Total = Total,
                Descripcion = Descripcion,
                estatus = estatus,
                fecha_modificacion =fecha_hoy(),
                usuario_modifico = usuario,
        )
        return ord[0].id


class Producto_orden(APIView):

    def get(self, request):
        id = request.GET.get("id")
        print(id)
        data = self.producto(id)
        return JsonResponse({"producto":data})

    def post(self,request):
        id_orden = request.data.get("id_orden")
        
        return JsonResponse({"productos":self.obtener_por_orden(id_orden)})

    def put(self, request):
        id_orden = request.data.get("id_orden")
        productos = json.loads(json.dumps( request.data.get("productos")))

        Productos_orden.objects.filter(folio_orden=id_orden).delete()

        for prod in productos:
            self.guardar(id_orden=id_orden,producto=prod)
        return JsonResponse({"Productos":"Guargado..."})
    

    ###Productos
    def existe(self,id):
        print("Existe...")
        prod = Producto.objects.filter(id=id,estatus="V")
        if not prod.exists():
            id_alterno = Codigo_producto.objects.filter(Codigo=id)
            if id_alterno.exists():
                 prod = Producto.objects.filter(id=id_alterno[0].id_producto,estatus="V")
            else:
                prod =[None]
        return prod[0]

    def producto(self,id):
        producto = self.existe(id)
        data = {
            'id':'',
            'descripcion':'',
            'costo':'',
            'venta':'',
            'margen':'',
            'iva':'',
            'cantidad':'',
            'total':'',
        }
        if producto:
            costo_p = self.costo(producto.id)
            if costo_p:
                data = {
                    'id':producto.id,
                    'descripcion':producto.descripcion,
                    'costo':costo_p.costo,
                    'venta':costo_p.venta,
                    'margen':costo_p.margen,
                    'iva':costo_p.iva,
                    'cantidad':1,
                    'total':costo_p.costo,
                }
        return data

    def costo(self,id):
        costo = Costo_producto.objects.filter(folio_producto=id, estatus="V")
        if costo.exists():
            return costo[0]
        return None

    def obtener_por_orden(self,id):
        prod = Productos_orden.objects.filter(folio_orden = id)
        data = []
        for p in prod:
            prod = self.producto(p.folio_producto)

            prod['cantidad'] = p.Cantidad
            prod['costo'] = p.costo
            prod['iva'] = p.iva
            prod['venta'] = p.venta
            prod['margen'] = p.margen
            prod['total'] = p.Total

            data.append(prod)
        return data
            

    def guardar(self,id_orden,producto):
        print(producto)
        self.comprovar_orden_finalizada(id_orden,producto['id'],producto['cantidad'])
        Productos_orden(
            folio_orden = id_orden,
            folio_producto = producto['id'],
            costo = producto['costo'],
            venta = producto['venta'],
            iva = producto['iva'],
            margen = producto['margen'],
            Cantidad = producto['cantidad'],
            Total = producto['total'],
        ).save()

    def comprovar_orden_finalizada(self,id_orden,id_producto,cantidad):
         ord = Orden.objects.filter(id=id_orden,estatus="F")
         if ord.exists():
            inventario = Inventario_producto.objects.filter(folio_producto = id_producto)
            cantdad_N =  inventario[0].cantidad + cantidad
            inventario.update(cantidad = cantdad_N)
