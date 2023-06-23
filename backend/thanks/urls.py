from django.urls import path

from . import views

urlpatterns = [
    path('', views.ThanksView.as_view(), name='thanks'),
]
