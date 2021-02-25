
from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Artikel(models.Model):

    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete= models.CASCADE)
    text = models.TextField()
    post_date = models.DateField(auto_now_add=True)
    slug = models.SlugField()

    def __str__(self):
        return str(self.title)


class CommentArtikel(models.Model):

    title = models.ForeignKey(Artikel, related_name='comments', on_delete= models.CASCADE)
    name = models.ForeignKey(User, on_delete= models.CASCADE)
    text = models.TextField()
    comment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return '{0} - {1}'.format(self.title.title , self.name)


