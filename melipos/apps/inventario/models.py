# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Inventario_producto(models.Model):
    folio_producto = models.IntegerField()
    cantidad = models.IntegerField()
    unidad_medida = models.CharField(max_length=2)
    estatus = models.CharField(max_length=1,default='V')
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()


class Censo(models.Model):
    fecha = models.DateField(auto_now_add=True)
    fecha_modificacion = models.DateField(auto_now=True)
    usuario_creo = models.IntegerField()
    usuario_modifico = models.IntegerField()
    estatus = models.CharField(max_length=1)


class Existencia_censo(models.Model):
    folio_censo = models.IntegerField()
    folio_producto = models.IntegerField()
    cantidad_fisica = models.FloatField()
    cantidad_teorica = models.FloatField()
    diferencia = models.FloatField()