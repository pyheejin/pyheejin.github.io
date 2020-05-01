---
title: mysql에 csv 파일 넣기
date: "2020-04-29"
template: "post"
draft: false
slug: "mysql-insert-from-csv-file"
category: "database"
tags:
  - "csv"
  - "mysql"
description: "mysql에 csv 파일 넣기"
socialImage: ""
---

### product model

```python
from django.db import models
from user.models import User

class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'categories'

class Collection(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'collections'

class Product(models.Model):
    category          = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    collection        = models.ForeignKey('Collection', on_delete=models.SET_NULL, null=True)
    middle_image      = models.ForeignKey('MiddleImage', on_delete=models.SET_NULL, null=True)
    detail            = models.ForeignKey('Detail', on_delete=models.SET_NULL, null=True)
    header_watch      = models.URLField(max_length=1000)
    header_background = models.URLField(max_length=1000)
    description       = models.CharField(max_length=500)
    sub_description   = models.CharField(max_length=500)

    class Meta:
        db_table = 'products'

class MiddleImage(models.Model):
    thumbnail_url = models.URLField(max_length=1000)
    image_url     = models.URLField(max_length=1000)
    title         = models.CharField(max_length=50)
    sub_title     = models.CharField(max_length=50)
    description   = models.CharField(max_length=1000)

    class Meta:
        db_table = 'middle_images'

class Feature(models.Model):
    product       = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True)
    title         = models.CharField(max_length=50)
    sub_title     = models.CharField(max_length=50)
    description   = models.CharField(max_length=500)
    thumbnail_url = models.URLField(max_length=1000)
    image_url     = models.URLField(max_length=1000)

    class Meta:
        db_table = 'features'

class Detail(models.Model):
    size      = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)
    material  = models.ForeignKey('Material', on_delete=models.SET_NULL, null=True)
    bezel     = models.ForeignKey('Bezel', on_delete=models.SET_NULL, null=True)
    bracelet  = models.ForeignKey('Bracelet', on_delete=models.SET_NULL, null=True)
    dial      = models.ForeignKey('Dial', on_delete=models.SET_NULL, null=True)
    is_oyster = models.BooleanField()
    price     = models.IntegerField()

    class Meta:
        db_table = 'details' 

class ConfigureWatch(models.Model):
    user     = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    size     = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)
    material = models.ForeignKey('Material', on_delete=models.SET_NULL, null=True)
    bezel    = models.ForeignKey('Bezel', on_delete=models.SET_NULL, null=True)
    bracelet = models.ForeignKey('Bracelet', on_delete=models.SET_NULL, null=True)
    dial     = models.ForeignKey('Dial', on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'configure_watches'

class Size(models.Model):
    diameter = models.IntegerField()

    class Meta:
        db_table = 'sizes'

class Material(models.Model):
    name           = models.CharField(max_length=50)
    image_url      = models.URLField(max_length=1000)
    background_url = models.URLField(max_length=1000)

    class Meta:
        db_table = 'materials'

class Bezel(models.Model):
    name = models.CharField(max_length=50)   

    class Meta:
        db_table = 'bezels'      

class Bracelet(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'bracelets'

class Dial(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'dials'

class BezelFind(models.Model):
    size      = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)
    material  = models.ForeignKey('Material', on_delete=models.SET_NULL, null=True)
    bezel     = models.ForeignKey('Bezel', on_delete=models.SET_NULL, null=True)
    image_url = models.URLField(max_length=1000)
    
    class Meta:
        db_table = 'bezels_finds'        

class BraceletFind(models.Model):
    size      = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)
    material  = models.ForeignKey('Material', on_delete=models.SET_NULL, null=True)
    bezel     = models.ForeignKey('Bezel', on_delete=models.SET_NULL, null=True)
    bracelet  = models.ForeignKey('Bracelet', on_delete=models.SET_NULL, null=True)
    image_url = models.URLField(max_length=1000)
    
    class Meta:
        db_table = 'bracelets_finds'          

class DialFind(models.Model):
    size        = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)
    material    = models.ForeignKey('Material', on_delete=models.SET_NULL, null=True)
    dial        = models.ForeignKey('Dial', on_delete=models.SET_NULL, null=True)
    image_url   = models.URLField(max_length=1000)
    
    class Meta:
        db_table = 'dials_finds'  
```

### 업로드용 파일은 manage.py가 있는 경로에 생성해야 한다.

```python
import os
import django
import csv
import sys

# python manage.py shell 실행 효과
os.chdir(".")
print("Current dir=", end=""), print(os.getcwd())

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print("BASE_DIR=", end=""), print(BASE_DIR)

sys.path.append(BASE_DIR)

# 프로젝트.settings 입력
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rolex.settings")
django.setup()


# 모델 전부 불러오기
from product.models import *


# Foreign Key를 가지는 데이터는 원본 데이터가 먼저 데이터베이스에 등록되어야 한다.
CSV_PATH = './rolex_csv/size.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Size.objects.create(
            diameter = row['size']
        )


CSV_PATH = './rolex_csv/material.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Material.objects.create(
            name           = row['name'],
            image_url      = row['image_url'],
            background_url = row['background_url']
        )

CSV_PATH = './rolex_csv/bezel.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Bezel.objects.create(
            name = row['name']
        )

CSV_PATH = './rolex_csv/dial.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Dial.objects.create(
            name = row['name']
        )

CSV_PATH = './rolex_csv/bezel_find.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        BezelFind.objects.create(
            size      = Size.objects.get(id = row['size_id']),
            material  = Material.objects.get(id = row['material_id']),
            bezel     = Bezel.objects.get(id = row['bezel_id']),
            image_url = row['image_url']
        )

CSV_PATH = './rolex_csv/bracelet_find.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        BraceletFind.objects.create(
            size      = Size.objects.get(id = row['size_id']),
            material  = Material.objects.get(id = row['material_id']),
            bezel     = Bezel.objects.get(id = row['bezel_id']),
            bracelet  = Bracelet.objects.get(id = row['bracelet_id']),
            image_url = row['image_url']
        )

CSV_PATH = './rolex_csv/dial_find.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        DialFind.objects.create(
            size      = Size.objects.get(id = row['size']),
            material  = Material.objects.get(id = row['material']),
            dial      = Dial.objects.get(id = row['dial_id']),
            image_url = row['image_url']
        )

CSV_PATH = './rolex_csv/detail.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Detail.objects.create(
            size      = Size.objects.get(id = row['size']),
            material  = Material.objects.get(name = row['material']),
            bezel     = Bezel.objects.get(name = row['bezel']),
            bracelet  = Bracelet.objects.get(name = row['bracelet']),
            dial      = Dial.objects.get(name = row['dial']),
            is_oyster = row['is_oyster'],
            price     = row['price']
        )

CSV_PATH = './rolex_csv/middle.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        MiddleImage.objects.create(
            thumbnail_url = row['thumbnail'],
            image_url     = row['image'],
            title         = row['title'],
            sub_title     = row['sub_title'],
            description   = row['description']
        )

CSV_PATH = './rolex_csv/product.csv'

with open(CSV_PATH, newline='') as csvfile:
     data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Product.objects.create(
            category           = Category.objects.get(id = row['category']),
            collection         = Collection.objects.get(id = row['collection']),
            middle_image       = MiddleImage.objects.get(id = row['middle_image']),
            detail             = Detail.objects.get(id = row['detail_id']),
            header_watch       = row['img_watch'],
            header_background = row['img_back'],
            description        = row['description'],
            sub_description    = row['description_sub']
        )

CSV_PATH = './rolex_csv/feature.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        Feature.objects.create(
            product       = Product.objects.get(id = row['product_id']),
            title         = row['detail1'],
            sub_title     = row['detail1_sub'],
            description   = row['detail1_description'],
            thumbnail_url = row['d_thum_pic'],
            image_url     = row['dpic']
        )

```