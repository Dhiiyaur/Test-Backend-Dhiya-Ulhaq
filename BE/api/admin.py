
from django.contrib import admin
from .models import Artikel, CommentArtikel

# Register your models here.

class ArtikelAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}

admin.site.register(Artikel, ArtikelAdmin)
admin.site.register(CommentArtikel)
