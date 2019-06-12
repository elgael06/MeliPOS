# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from ..Acceso import acceso
# Create your views here.
def index(request):
    return acceso(request, 'tienda/index.html', {}) 