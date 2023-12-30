from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView # NOS PERMITE OBTENER OTRO TOKEN REFRESCANDO TOKEN

urlpatterns = [
    path('register/', views.register),
    path('login/', views.LoginView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('get/users/', views.get_users),
    path('search/', views.search),
    path('get/user/<int:pk>/', views.get_user),
    path('edit/<str:email>/', views.edit_profile),
    path('delete/<int:pk>/', views.delete_user),
]
