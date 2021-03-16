---
title: Flask SQLAlchemy 콤마(,)로 구분된 데이터 검색하기
date: "2021-03-16"
template: "post"
draft: false
slug: "Search-value-in-comma-separated-SQLAlchemy"
category: "flask"
tags:
  - "Flask"
  - "SQLAlchemy"
  - "ORM"
  - "find_in_set"
description: "Flask SQLAlchemy 콤마(,)로 구분된 데이터 검색하기"
socialImage: ""
---

## MySQL

```mysql
SELECT * from [테이블명] WHERE FIND_IN_SET([검색할 데이터], [column]);
```

## SQLAlchemy

```python
Model.query.filter(func.find_in_set([검색할 데이터], Model.column))
```