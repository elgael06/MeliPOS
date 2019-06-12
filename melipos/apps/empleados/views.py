# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from django.shortcuts import render

from .models import Usuario
from ..Acceso import acceso

# Create your views here.
def index(request):
    return acceso(request, 'empleados/index.html', {}) 

def  login(request):
    request.session['id_usuario'] = 0
    request.session['usuario'] = ''
    request.session['nombre'] = ''
    return render(request, 'empleados/login.html', {}) 

def  about(request):
    return acceso(request, 'empleados/about.html', {}) 

#apis

class UsuariosView(APIView):
    def get(self,request):
        users =  Usuario.objects.all()
        data =  list( users.values( 'id', 'nombre' , 'nombre_completo','password', 'estatus', 'usuario_creo', 'usuario_modifico') )
        return JsonResponse({'usuarios':data}, safe=False)

    def post(self,request):
        nom = request.data.get('nombre')
        nom_c = request.data.get('nombre_completo')
        passw = request.data.get('password')
        creo = request.session["id_usuario"]
        foto = " "
        usr = Usuario(nombre=nom, nombre_completo=nom_c, password=passw, foto=foto,usuario_creo = creo)
        print(usr.nombre)
        usr.save()
        return Response({"Usuario ":usr.id})

    def put(self,request):
        id_usr = request.data.get('id')
        nom = request.data.get('nombre')
        nom_c = request.data.get('nombre_completo')
        passw = request.data.get('password')
        usuario_modifico = request.session["id_usuario"]
        foto = " "
        Usuario.objects.filter(id=id_usr).update(nombre=nom, nombre_completo=nom_c, password=passw, foto=foto,usuario_modifico=usuario_modifico)
        return JsonResponse({'respuesta': 'Usuario Actualizado...', "id": id_usr})

    def patch(self,request):
        id_usr = request.data.get('id')
        print("ID: "+ str(id_usr))
        usr = Usuario.objects.filter(id=id_usr).update(estatus="C")
        #usr.delete()
        return JsonResponse({'respuesta': 'Usuario Eliminado !!!'})
    
class LoginView(APIView):
    def post(self,request):
        usuario = request.data.get('id')
        passw = request.data.get('password')
        user = Usuario.objects.filter(id=usuario, password=passw)
        data = {
            'existe': user.exists()
        }
        if user.exists():
            request.session['id_usuario'] = int(usuario)
            request.session['usuario'] =user[0].nombre
            request.session['nombre'] = user[0].nombre_completo
            print("Usuario = "+user[0].nombre)
        else:
            request.session['id_usuario'] = 0
            request.session['usuario'] =''
            request.session['nombre'] = ''
        return JsonResponse(data)