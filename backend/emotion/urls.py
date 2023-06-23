from django.urls import path

from . import views

urlpatterns = [
    path('positive/', views.PositiveEmotionsView.as_view(), name='positive'),
    path('', views.EmotionsView.as_view(), name='all'),
]
