# Generated by Django 3.1.6 on 2021-02-25 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210224_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentartikel',
            name='comment_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
