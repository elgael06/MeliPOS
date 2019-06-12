from django.shortcuts import redirect, render

#comprobar acceso
def acceso(request,url,objeto):
    ip_accceso = get_client_ip(request)
    if 'id_usuario' in request.session:
        if request.session['id_usuario'] > 0:
            print('\t=>Usuario: '+ str( request.session['id_usuario']) +'\n\t Accedio Desde IP:' +ip_accceso )
            return render(request, url, objeto) 
    print('\t=>Acceso IP:'+ip_accceso+'\n\t Vista:'+ url +' Negado...')
    return redirect("/usuarios/login")

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip