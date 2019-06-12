# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Cliente(models.Model):
    Nombre = models.CharField(max_length=200)
    RFC = models.CharField(max_length=20, default='X0X0X0X0X0X0')
    Direccion = models.CharField(max_length=200, default='Conosido.')
    Email = models.CharField(max_length=50, default='NA')
    Telefono = models.CharField(max_length=10)
    Representante = models.CharField(max_length=100)
    Descripcion = models.CharField(max_length=100, default="NA")
    estatus = models.CharField(max_length=1, default='V')
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()


# Tiquet de venta
class Asignacion_caja(models.Model):
    id_usuario = models.IntegerField()
    fondo_caja = models.FloatField()
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()
    estatus = models.CharField(max_length=1)
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)


class Ticket(models.Model):
    folio_asignacion = models.IntegerField()
    productos = models.IntegerField()
    total = models.FloatField()
    descuento = models.FloatField()
    folio_cliente = models.IntegerField()
    estatus = models.CharField(max_length=1)
    fecha = models.DateField(auto_now_add=True)
    hora = models.DateTimeField(auto_now_add=True)
    tipo_pago = models.CharField(max_length=2)
    disenioTicket = models.CharField(max_length=20000,default="<h1>Sin Datos</h1>")


class Producto_ticket(models.Model):
    folio_ticket = models.IntegerField()
    folio_producto = models.IntegerField()
    camtidad = models.IntegerField()
    total = models.FloatField()
    descuento = models.FloatField()


class Asignacion_caja_corte(models.Model):
    folio_asignacion = models.IntegerField()
    efectivo = models.FloatField()
    cheques = models.FloatField()
    vouchers = models.FloatField()
    total = models.FloatField()
    total_corte = models.FloatField()
    diferencia = models.FloatField()
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()
    estatus = models.CharField(max_length=1)
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)

# pedidos de Producos


class Pedido(models.Model):
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()
    estatus = models.CharField(max_length=1)
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)


class Producto_pedido(models.Model):
    id_pedido = models.IntegerField()
    id_producto = models.IntegerField()
    cantidad = models.FloatField()
