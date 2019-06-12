# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    nombre_completo = models.CharField(max_length=150)
    password = models.CharField(max_length=150)
    foto = models.CharField(max_length=150000) 
    estatus = models.CharField(max_length=1,default='V')
    usuario_creo = models.IntegerField( default=0)
    usuario_modifico = models.IntegerField(default=0)
