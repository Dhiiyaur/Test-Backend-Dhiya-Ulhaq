from rest_framework import serializers
from .models import Artikel, CommentArtikel


class CommentSerializers(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source = 'name.username')

    class Meta:

        model = CommentArtikel
        fields = ['title', 'name','text','comment_date','username']


class ArtikelSerializers(serializers.ModelSerializer):

    author_name = serializers.ReadOnlyField(source = 'author.username')

    class Meta:

        model = Artikel
        fields = ['id', 'title', 'text', 'post_date', 'slug', 'author_name', 'author']

class ArtikelDetailSerializers(serializers.ModelSerializer):

    author_name = serializers.ReadOnlyField(source = 'author.username')
    comments = CommentSerializers(many = True, read_only=True)

    class Meta:

        model = Artikel
        fields = ['id','title', 'author', 'author_name','text', 'post_date', 'slug', 'comments']
