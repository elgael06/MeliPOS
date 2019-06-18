
from django.urls import path

from .views import index, asignacion, AsignacionView, NuevaAsignacion, TicketView

urlpatterns = [
    path('', index, name='index'),
    path('Asignacion', asignacion, name='asignacion'),
    path('Asignacion/api', AsignacionView.as_view()),
    path('NuevaAsignacion/api', NuevaAsignacion.as_view()),
    path('Ticket/api', TicketView.as_view()),
]
