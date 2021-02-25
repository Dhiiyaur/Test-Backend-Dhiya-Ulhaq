from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from .serializers import ArtikelSerializers, ArtikelDetailSerializers, CommentSerializers
# models
from .models import Artikel, CommentArtikel
# Create your views here.

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class ArtikelAPI(APIView):

    permission_classes = [IsAuthenticated|ReadOnly]

    def get(self, request):

        artikelList = Artikel.objects.all()
        serializers = ArtikelSerializers(artikelList, many = True)
        respone = Response(serializers.data, status=status.HTTP_200_OK)
        return respone

    def post(self, request):

        
        serializers  = ArtikelSerializers(data = request.data)
        print(request.data)
        print(serializers)
        if serializers.is_valid():
            serializers.save()

            responeData = {
                'message' : "OK",
            }
            
            respone = Response(responeData, status=status.HTTP_201_CREATED)
            return respone

        return JsonResponse(serializers.error_messages, status = status.HTTP_400_BAD_REQUEST)



class ArtikelDetailAPI(APIView):

    permission_classes = [IsAuthenticated|ReadOnly]

    def get(self, request, id):

        try:
            artikel_detail = Artikel.objects.get(id=id)
            serializers = ArtikelDetailSerializers(artikel_detail)
            respone = Response(serializers.data, status=status.HTTP_200_OK)
            return respone 

        except ObjectDoesNotExist:
            return Response({'messages':'Sorry, artikel doest exist'},
                            status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, id):


        artikel_detail = Artikel.objects.get(id=id)
        serializers = ArtikelDetailSerializers(artikel_detail, data = request.data)

        if serializers.is_valid():
            serializers.save()
            
            responeData = {
                'message' : "OK",
            }
            
            respone = Response(responeData, status=status.HTTP_201_CREATED)
            return respone
            
        return JsonResponse(serializers.error_messages, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):


        Artikel_detail = Artikel.objects.get(id=id)
        Artikel_detail.delete()

        responeData = {
            'message' : "OK",
        }
        
        respone = Response(responeData, status=status.HTTP_204_NO_CONTENT)
        return respone


class CommentAPI(APIView):

    permission_classes = [IsAuthenticated|ReadOnly]

    def post(self, request, id):

        serializers  = CommentSerializers(data = request.data)
        if serializers.is_valid():
            serializers.save()

            responeData = {
                'message' : "OK",
            }
            
            respone = Response(responeData, status=status.HTTP_201_CREATED)
            return respone

        return JsonResponse(serializers.error_messages, status = status.HTTP_400_BAD_REQUEST)
        


    def delete(self, request, id):
        
        comment_id = request.data.get('id')
        comment = CommentArtikel.objects.get(id=comment_id)
        comment.delete()

        responeData = {
            'message' : "OK",
        }
        
        respone = Response(responeData, status=status.HTTP_204_NO_CONTENT)
        return respone