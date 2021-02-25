from django.contrib import admin
from django.urls import path, include
from .views import ArtikelDetailAPI, ArtikelAPI ,CommentAPI

urlpatterns = [


    path('artikel', ArtikelAPI.as_view(), name= 'artikel-list'),
    path('artikel-detail/<int:id>', ArtikelDetailAPI.as_view(), name='artikel-detail'),
    path('artikel-detail/<int:id>/comment', CommentAPI.as_view(), name = 'artikel-comment')
    
]
