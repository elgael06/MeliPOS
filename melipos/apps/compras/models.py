# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Proveedor(models.Model):
    Nombre =  models.CharField(max_length=200)
    RFC =  models.CharField(max_length=20,default="X0X0X0X0X0X0")
    Direccion =  models.CharField(max_length=200,default='Conosido.')
    Email =  models.CharField(max_length=50,default='NA')
    Telefono =  models.CharField(max_length=20)
    Representante =  models.CharField(max_length=100)
    Descripcion =  models.CharField(max_length=100,default="NA")
    estatus = models.CharField(max_length=1,default='V')
    fecha = models.DateField(auto_now_add=False)
    fecha_modificacion = models.DateField(auto_now=False)
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField() 


class Orden(models.Model):
    Folio_proveedor = models.IntegerField()
    productos = models.IntegerField()
    Total = models.FloatField()
    Descripcion =  models.CharField(max_length=100,default="NA")
    estatus = models.CharField(max_length=1,default='V')
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField() 
    

class Productos_orden(models.Model):
    folio_orden =  models.IntegerField()
    folio_producto = models.IntegerField()
    costo = models.FloatField()
    venta = models.FloatField()
    iva = models.FloatField()
    margen = models.FloatField()
    Cantidad = models.FloatField()
    Total = models.FloatField()