# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
import json

from django.shortcuts import render

from ..Acceso import acceso
from ..manejo_fecha import fecha_hoy
from ..inventario.models import Inventario_producto
from .models import Asignacion_caja, Ticket, Cliente, Producto_ticket, Asignacion_caja_corte
from ..empleados.models import Usuario

# Create your views here.


def index(request):
    return acceso(request, 'ventas/index.html', {})


def asignacion(request):
    return acceso(request, 'ventas/asignacion.html', {})

# api Asignacion


class NuevaAsignacion(APIView):

    def post(self, request):
        data = {'id': 0, 'fondo': 0}
        creo = request.session["id_usuario"]
        cajero = Usuario.objects.filter(id=request.data.get("id_usuario"))
        if cajero.exists():
            asig = self.verificarAsignacion(
                id_usuario=request.data.get("id_usuario"),
                id_creo=creo,
                fondo=request.data.get("fondo"),
            )
            data = {'id': asig.id, 'fondo': asig.fondo_caja}

        return JsonResponse(data)

    def verificarAsignacion(self, id_usuario, id_creo, fondo):
        asignacion = Asignacion_caja.objects.filter(
            id_usuario=id_usuario, estatus="V")
        if(asignacion.exists()):
            asignacion.update(fecha=fecha_hoy(),
                              usuario_modifico=id_creo, fondo_caja=fondo)
            return asignacion[0]
        else:
            asignacion = Asignacion_caja(
                id_usuario=id_usuario,
                fondo_caja=fondo,
                usuario_creo=id_creo,
                usuario_modifico=id_creo,
                estatus="V",
                fecha=fecha_hoy(),
                fecha_modificacion=fecha_hoy())
            asignacion.save()
            return asignacion


class AsignacionView(APIView):
    def get(self, request):
        data = []
        asignacion = Asignacion_caja.objects.filter(
            fecha=request.GET.get('fecha'),
            estatus=request.GET.get('estatus'),)
        if asignacion.exists():
            for item in asignacion:
                emp = Usuario.objects.filter(id=item.id_usuario)
                creo = Usuario.objects.filter(id=item.usuario_creo)
                mod = Usuario.objects.filter(id=item.usuario_modifico)
                data.append({
                    'id': item.id,
                    'id_usuario':  item.id_usuario,
                    'usuario':  emp[0].nombre_completo,
                    'fondo_caja': item.fondo_caja,
                    'usuario_creo': creo[0].nombre_completo,
                    'usuario_modifico': mod[0].nombre_completo,
                    'estatus': item.estatus,
                    'fecha': item.fecha,
                    'fecha_modificacion': item.fecha_modificacion,
                    'tickets': self.consultarTickets(folio=item.id)
                })

        return JsonResponse({'lista': data})

    def post(self, request):
        data = 0
        folio = request.data.get('folio')
        print("Folio=>" + str(folio))
        usuario = request.session["id_usuario"]
        asig = Asignacion_caja.objects.filter(
            id=folio, estatus="V",)
        if asig.exists():
            print("Asignacion Vigente...")
            self.actualizarAsignacion(asignacion=asig, usr=usuario)
            data = self.insertarCorte(
                folio=request.data.get('folio'),
                fondo=request.data.get('fondo'),
                efectivo=request.data.get('efectivo'),
                retiros=request.data.get('retiros'),
                total=request.data.get('total'),
                total_corte=request.data.get('total_corte'),
                vouchers=request.data.get('vouchers'),
                diferencia=request.data.get('diferencia'),
                usuario=usuario
            )

        return JsonResponse({"estatus": data})

    def put(self, request):
        data = {
                'folio': 0,
                'fecha': "",
                'asignacion': 0,
                'fecha_asignacion': "",
                'cajero': "",
                'fecha_corte': "",
                'efectivo': 0,
                'vouchers': 0,
                'total_asignacion': 0,
                'retiros': 0,
                'diferencia': 0,
                'total_corte': 0,
                'creo': ""
            }

        corte = Asignacion_caja_corte.objects.filter(
            folio_asignacion=request.GET.get("folio")
        )
        print("Consultar")
        if corte.exists():
            asig = Asignacion_caja.objects.filter(id=request.GET.get("folio"))
            cajero = Usuario.objects.filter(id=asig[0].id_usuario)
            creo = Usuario.objects.filter(id=corte[0].usuario_modifico)
            data = {
                'folio': corte[0].folio_asignacion,
                'fecha':  fecha_hoy(),
                'asignacion': corte[0].folio_asignacion,
                'fecha_asignacion': asig[0].fecha,
                'cajero': cajero[0].nombre_completo,
                'fecha_corte': corte[0].fecha,
                'efectivo': corte[0].efectivo,
                'vouchers': corte[0].vouchers,
                'total_asignacion': corte[0].total,
                'retiros': corte[0].retiros,
                'diferencia': corte[0].diferencia,
                'total_corte': corte[0].total_corte,
                'creo': creo[0].nombre_completo,
            }
        return JsonResponse(data)

    def consultarTickets(self, folio):
        t = Ticket.objects.filter(folio_asignacion=folio)
        total = 0
        vouchers = 0
        data = []
        if (t.exists()):
            for tiket in t:
                data.append({
                    'ticket': tiket.id,
                    'id_cliente': tiket.folio_cliente,
                    'cantidad': tiket.productos,
                    'total': tiket.total,
                    'tipoPago': TiposDePagos(t=tiket.tipo_pago),
                    'descuento': tiket.descuento,
                    'fecha': tiket.fecha,
                    'hora': tiket.hora,
                    'estatus': estatusTicket(tiket.estatus),
                    'formato': tiket.disenioTicket
                })
                if (tiket.tipo_pago == "TA"):
                    vouchers += tiket.total
                total += tiket.total
        return {
            'lista': data,
            'total': total,
            'vouchers': vouchers
        }

    def actualizarAsignacion(self, asignacion, usr):
        asignacion.update(
            estatus="F",
            usuario_modifico=usr
        )

    def insertarCorte(self, efectivo, folio, fondo, retiros, total, total_corte, vouchers, diferencia, usuario):
        corte = Asignacion_caja_corte(
            folio_asignacion=folio,
            efectivo=efectivo,
            retiros=retiros,
            vouchers=vouchers,
            total=total,
            total_corte=total_corte,
            diferencia=diferencia,
            usuario_creo=usuario,
            usuario_modifico=usuario,
            estatus="V"
        )
        corte.save()
        return corte.id


class TicketView(APIView):
    def get(self, request):
        tiket = self.verificarTicket(id_usuario=request.session["id_usuario"])
        client = Cliente.objects.filter(id=tiket.folio_cliente)
        data = {
            'ticket': tiket.id,
            'id_cliente': tiket.folio_cliente,
            'cliente': client[0].Nombre,
            'cantidad': 0,
            'total': 0,
            'tipoPago': TiposDePagos(t=tiket.tipo_pago),
            'totalPaga': 0,
            'descuento': 0,
            'fecha': tiket.fecha
        }
        return JsonResponse(data)

    def post(self, request):
        data = {"respuesta": False}
        ticket = Ticket.objects.filter(
            id=request.data.get('ticket')
        ).update(
            productos=request.data.get('cantidad'),
            total=request.data.get('totalPaga'),
            descuento=request.data.get('descuento'),
            estatus="P",
            fecha=fecha_hoy(),
            tipo_pago=AbreviaturaPago(request.data.get('tipoPago')),
            disenioTicket=request.data.get('disenioTicket')
        )
        productos = json.loads(json.dumps(request.data.get("productos")))
        for prod in productos:
            Producto_ticket(
                folio_ticket=request.data.get('ticket'),
                folio_producto=prod["folio"],
                camtidad=prod["cantidad"],
                total=prod["total"],
                descuento=prod["descuento"]
            ).save()
            inv = Inventario_producto.objects.filter(
                folio_producto=prod["folio"]
            )
            inv.update(
                cantidad=(inv[0].cantidad - prod["cantidad"]),
                fecha_modificacion=fecha_hoy(),
            )
        data["respuesta"] = True
        return JsonResponse(data)

    def put(self, request):
        return JsonResponse({})

    def verificarTicket(self, id_usuario):
        asignacion = self.verificarAsignacion(id_usuario=id_usuario)

        t = Ticket.objects.filter(
            folio_asignacion=asignacion.id, estatus="V")
        if (t.exists()):
            t.update(fecha=fecha_hoy())
            return t[0]
        else:
            t = Ticket(
                folio_asignacion=asignacion.id,
                productos=0,
                total=0,
                descuento=0,
                folio_cliente=1,
                estatus="V",
                fecha=fecha_hoy(),
                tipo_pago="EF"
            )
            t.save()
            return t

    def verificarAsignacion(self, id_usuario):
        asignacion = Asignacion_caja.objects.filter(
            id_usuario=id_usuario,estatus="V")
        if(asignacion.exists()):
            asignacion.update(fecha=fecha_hoy())
            return asignacion[0]
        else:
            asignacion = Asignacion_caja(
                id_usuario=id_usuario,
                fondo_caja=0,
                usuario_creo=id_usuario,
                usuario_modifico=id_usuario,
                estatus="V",
                fecha=fecha_hoy(),
                fecha_modificacion=fecha_hoy())
            asignacion.save()
            return asignacion


def TiposDePagos(t):
    if(t == "EF"):
        return "Efectivo"
    elif(t == "TA"):
        return "Tarjeta"
    else:
        return "Credito"


def AbreviaturaPago(t):
    if(t == "Efectivo"):
        return "EF"
    elif(t == "Tarjeta"):
        return "TA"
    else:
        return "CR"


def estatusTicket(est):
    if est == "V":
        return "Vigente"
    elif est == "P":
        return "Pagado"
    else:
        return "Cancelado"
