
from django.urls import path

from .views import index,asignacion, AsignacionView, TicketView

urlpatterns = [
    path('', index, name='index'),
    path('Asignacion', asignacion, name='asignacion'),
    path('Asignacion/api', AsignacionView.as_view()),
    path('Ticket/api', TicketView.as_view()),
]
