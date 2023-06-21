from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.CustomAuthToken.as_view(), name='login'),
    path('logout/', views.Logout_user.as_view(), name='logout'),
    path('update/', views.Update_password.as_view(), name='update'),
    path('register/', views.Register_user.as_view(), name='register'),
    path('status/', views.UserStatus.as_view(), name='status'),
    path('users/', views.UserListCreateView.as_view())
]
