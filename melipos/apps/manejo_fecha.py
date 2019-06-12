import datetime

def  fecha_hoy():
    fecha =  datetime.datetime.now()
    return fecha.strftime("%Y")+ '-'+fecha.strftime("%m")+'-'+fecha.strftime("%d")