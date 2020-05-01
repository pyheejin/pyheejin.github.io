---
title: QuerySet 사용하기
date: "2020-04-29"
template: "post"
draft: false
slug: "queryset"
category: "database"
tags:
  - "queryset"
description: "queryset 다루기"
socialImage: ""
---

QuerySet은 장고에서 데이터베이스를 쉽게 다루기 위해서 사용하는 ORM 기능이다. <br>
원하는 객체를 불러오거나 검색할 수 있다.

### 전체 객체 불러오기

```python
Model.objects.all()
```

### 특정 객체 불러오기
get은 불러오려는 객체가 없으면 오류를 발생시키기 때문에 None 처리를 해줘야 한다.

```python
Model.objects.get(id=1, None)
```

### 객체가 존재하는지 확인(True/False)

```python
Model.objects.filter(id=1).exists()
```

### 조건을 걸어서 여러개의 객체 불러오기

```python
# id가 2인 객체를 전부 불러오기
Model.objects.filter(id=2)

# id가 2이고, title이 'hi'인 객체를 전부 불러오기
Model.objects.filter(id=2, title='hi')
```

### filter에 옵션 주기

- exact : 값 매치
- iexact : 대소문자 구분없이 값 매치
- startswith, istartswith : 해당 값으로 시작하는 결과 찾기
- endswith, iendswith(대소문자를 구분하지 않음) : 해당 값으로 끝나는 결과 찾기
- contains, icontains(대소문자를 구분하지 않음) : 값을 포함하는 결과 찾기
- gt : 컬럼 > 조건, 값보다 큰 경우
- gte : 컬럼 >= 조건, 크거나 같은 경우
- lte : 컬럼 <= 조건, 값보다 작거나 같은 경우(여러번 사용할때는 and 조건으로 연결됨)
- lt : 컬럼 < 조건, 값보다 작은 경우

```python
Model.objects.filter(컬럼__옵션=값)

# ex) id가 3보다 크고, test컬럼에 'hi'를 포함한 결과 찾기
Model.objects.filter(id__gt=3).filter(text__icontains='hi')
Model.objects.filter(id__gt=3, text__icontains='hi')
```

### ForeignKey로 연결된 필드를 참조하는 경우

```python
Model.objects.filter(컬럼__옵션=값)

# 글 작성자의 유저이름에 admin이 포함된 객체 반환
Model.objects.filter(user__name__icontain='admin')
```

### 요소 제외하기

```python
# id가 1인 객체를 제외하고 불러오기
Model.objects.exclude(id=1)
```

### 개수 제한하기
리스트 형태로 불러오기 때문에 리스트 슬라이스를 사용할 수 있다.

```python
# 0부터 9번째 인덱스의 객체 불러오기
Model.objects.all()[:10]
```

### 정렬하기

```python
# 오름차순
Model.objects.all().order_by('created')

# 내림차순
Model.objects.all().order_by('-created')
```

### 조건의 or 연결
and(&), or(|), not(~) QuerySet의 filter에 사용하는 값은 기본적으로 무조건 and 연산이다.
or 조건을 만들기 위에서는 Q 객체를 사용한다.

```python
from django.db.models import Q

# comment가 'hi'나 'hello'로 시작하는 객체 반환
q = Q(comment__startswith='hi') | Q(comment__startswith='hello')
Model.objects.filter(q)

# Q 객체와 컬럼의 조건을 함께 사용할 때는 컬럼 조건이 항상 뒤에 와야 한다.
Model.objects.filter(q, id__gt=3)
```

### 특정 컬럼의 값을 필터 조건에 포함하고 싶을 때

```python
from django.db.models import F

# comment에 title이 포함되어 있는 객체 반환
Model.objects.filter(text__icontains=F('title'))
```