---
title: django select_related
date: "2020-05-15"
template: "post"
draft: false
slug: "select_related"
category: "django"
tags:
  - "select_related"
description: "django select_related"
socialImage: ""
---

## select_related
single object(one-to-one or many-to-one)이거나, 또는 정참조 일 때 사용
1:N 에서 N의 모델에서 사용한다.

- models.py
product 하나에 여러개의 image가 있는 1:N의 관계이다.

```python
class Product(models.Model):
  name = models.CharField(max_length=45)
  price = models.CharField(max_length=45)

  class Meta:
    db_table = 'products'

class Image(models.Model):
  product = models.ForeignKey('PointProduct', on_delete=models.SET_NULL, null=True)
  image = models.URLField(max_length=2000)

  class Meta:
    db_table = 'images'
```

- 상품과 이미지를 전부 가져오는데 select_related를 사용하지 않으면 총 3번의 쿼리가 발생한다.

```shell
# 쿼리문 발생 1
>>> image = Image.objects.get(id=1)
>>> image
<Image: Image object (1)>
>>> Product.objects.filter(id=image.product_id)
<QuerySet [<Product: Product object (1)>]>
# 쿼리문 발생 2
>>> Product.objects.filter(id=image.product_id)[0]
<Product: Product object (1)>
# 쿼리문 발생 3
>>> Product.objects.filter(id=image.product_id)[0].name
'오삭 핸드겔'
```

- select_related를 사용하면 1번의 쿼리만으로도 전부 불러올 수 있다!

```shell
# 쿼리문 발생 1
>>> product = Image.objects.select_related('product').get(id=1)
>>> product
<Image: Image object (1)>
>>> product.image_url
'https://img.pilly.kr/gift/pilly/osakgel/detail01.jpg'
>>> product.product.name
'오삭 핸드겔'
```