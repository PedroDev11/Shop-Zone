from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_orders),
    path('search/', views.search),
    path('create/', views.create_order),
    path('my/orders/', views.my_orders),
    path('delivery/<int:pk>/', views.delivered),
    path('get/order/<int:pk>/', views.solo_order),
]