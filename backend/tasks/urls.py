from django.urls import path

from . import views

urlpatterns = [
    path('task1/', views.UnappropriateEmotionsView.as_view(), name='task1'),
    path('task2/', views.BadHabitView.as_view(), name='task2'),
]
