---
title: Flask SQLAlchemy ORM 기본 문법
date: "2020-12-09"
template: "post"
draft: false
slug: "Flask-SQLAlchemy-ORM-basic"
category: "flask"
tags:
  - "Flask"
  - "SQLAlchemy"
  - "ORM"
description: "Flask SQLAlchemy ORM 기본 문법"
socialImage: ""
---

## SELECT

```python
Model.query.all()
```

## WHERE

```python
# get
Model.query.filter(Model.name == 'john').first()
# filter
Model.query.filter(Model.name == 'john').all()

# SELECT * FORM model WHERE name = 'john' AND hobby = music
Model.query.filter(Model.name == 'john', Model.hobby == 'music')

# or
from sqlalchemy import or_, and_
# SELECT * FORM model WHERE name = 'john' OR hobby = music
Model.query.filter(or_(Model.name == 'john', Model.hobby == 'music'))

# SELECT * FORM model WHERE name = 'john' AND hobby = music
Model.query.filter(and_(Model.name == 'john', Model.hobby == 'music'))
```

## INSERT

```python
def post(key=None, set=None, rules=None):
    param = v.get_param('post', key=key)
    # 룰이나 기본값이 정의되어 있지 않다면
    if rules is None:
        # 기본값 매핑
        if param is None or param == '':
            return set
        return param
    return v.valid_(param=param, key=key, set=set, rules=rules)

name = post('name', '')

model = Model()
model.name = name
db.session.add(model)

model = Model(name='john', age=20)
session.add(user)
session.commit()
```

## UPDATE

```python
model = Model.query.filter(Model.name == 'john').first()
model.name = 'Amelia'
session.commit()
```

## DELETE

```python
model = Model.query.filter(Model.name == 'Amelia').first()
session.delete(user)
session.commit()
```

## ORDER BY

```python
order_filter = Model.created_at.asc()
model = Model.query.order_by(*order_filter)

Model.query.filter(Model.name == 'Amelia').order_by(Model.created_at.asc())
```

## GROUP BY

```python
model = Model.query.group_by(Model.id).all()
```

## SEARCH(LIKE)

```python
# jo로 시작하는 사람 검색
Model.query.filter(Model.name.like(f'{jo}%'))
# jo로 끝나는 사람 검색
Model.query.filter(Model.name.like(f'%{jo}'))
# jo가 포함되어있는 사람 검색
Model.query.filter(Model.name.like(f'%{jo}%'))
```

## SUBQUERY

```python
from sqlalchemy import subquery

sub = query.session(Model2).filter(Model2.grade == 'A').subquery() 
# SELECT id, grade FROM model2 WHERE grade = 'A'

session.query(Model1, sub.c.id, sub.c.grade).outerjoin(sub, sub.c.id = Model1.id)
	
# SELECT model1.*, model2.id, model2.grade
# FROM mode1l LEFT JOIN (SELECT id, grade FROM model2 WHERE grade = 'A') model2 
# ON model1.id = model2.id
```

## DATE 계산하기

```python
today = datetime.datetime.now().strftime('%Y-%m-%d')
Model.query.filter(today >= func.ADDDATE(Model.created_at, 30)).all()
# SELECT * FROM model WHERE NOW() >= DATE_ADD(created_at, INTERVAL 30 DAY);
```