from django.urls import path

from . import views

urlpatterns = [
    path('task1', views.UnappropriateEmotionsView.as_view(), name='thanks'),
]
