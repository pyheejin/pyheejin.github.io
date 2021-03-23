---
title: Flask SQLAlchemy ORM Join Issue
date: "2021-03-22"
template: "post"
draft: false
slug: "Flask-SQLAlchemy-ORM-join-issue"
category: "flask"
tags:
  - "Flask"
  - "SQLAlchemy"
  - "ORM"
  - "Join"
  - "Issue"
description: "join시 row가 많아져서 페이지네이션이 이상하게 되는 이슈"
socialImage: ""
---

## Table
 - User

|id|name|
|----|---|
|1|Jane|
|2|Eric|
|3|Andy|

 - UserImage

|id|user_id|image_url|
|----|---|---|
|1|1|image_url|
|2|1|image_url|
|3|2|image_url|
|4|3|image_url|
|5|3|image_url|
|6|3|image_url|

## query

```python
page = int(params.get('page', 1))
page_length = params.get('page_length', 3)

# 한 페이지에 3명씩 보여주기
users = User.query.outerjoin(UserImage, UserImage.user_id == User.id
                ).offset(page_length * (page - 1)).limit(page_length).all()
```
- 위처럼 하면 이미지별로 로우가 쌓여서 1페이지에 3명이 다 안나오고 2명만 나오게 된다.

```python
page = int(params.get('page', 1))
page_length = params.get('page_length', 3)

user_ids = []
# join 하지 않은 쿼리에서 페이지네이션을 한 후 아이디를 뽑는다.
users_query = User.query.offset(page_length * (page - 1)).limit(page_length).all()
for i in users_query:
    user_ids.append(i.id)
    
users = User.query.outerjoin(UserImage, UserImage.user_id == User.id
                # 뽑은 아이디로 join
                ).filter(User.id.in_(user_ids)).all()
```
- join 하지 않은 쿼리에서 페이지네이션을 한 후 아이디를 뽑아서 join 시키면 된다.