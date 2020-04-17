---
title: 장고로 인스타그램 클론 API 만들기
date: "2020-04-17"
template: "post"
draft: false
slug: "django-python-instagram-API"
category: "django"
tags:
  - "django"
description: "장고로 인스타그램 클론 API 만들기"
socialImage: ""
---

### 1. 장고 설치

```vim
pip install django
```

### 2. 프로젝트 생성

```vim
django-admin startproject westagram
```

### 3. 앱 생성
- 유저 정보를 저장하는 account
- 포스팅 및 댓글을 저장하는 post

```vim
python manage.py startapp account
python manage.py startapp post
```

### 4. westagram/settings.py 에 앱 추가하기

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'account', # here
    'post', # here
]
```

### 5. account/models.py 작성
- 유저 이름, 이메일, 비밀번호, 생성시간, 수정시간 저장
- 나중에 만들 팔로우 기능을 위해서 미리 생성

```python
from django.db import models


class User(models.Model):
    name       = models.CharField(max_length=200)
    email      = models.EmailField(max_length=500)
    password   = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # 데이터베이스 이름 지정해주기
        db_table = 'users'


class Follow(models.Model):
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    follower  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')

    class Meta:
        db_table = 'follow'
```

### 6. account/views.py 작성

```python
import json
import bcrypt
import jwt

from django.http        import JsonResponse, HttpResponse
from django.views       import View

from .models            import User
from wetargram.settings import SECRET_KEY


class SignUpView(View):
    # 회원가입 뷰
    def post(self, request):
        data = json.loads(request.body)
        User(
            name=data['name'],
            email=data['email'],
            password=data['password'],
        ).save()
        return HttpResponse(status=200)

    # 어드민용, 가입한 모든 유저를 확인하는 뷰
    def get(self, request):
        user_data = User.objects.values()
        return JsonResponse({'users': list(user_data)}, status=200)


class LoginView(View):
    # 로그인 뷰
    def post(self, request):
        data = json.loads(request.body)
        try:
            # 유저가 입력한 이메일이 유저 객체(User.objects)에 있으면 이메일 get
            if User.objects.filter(email=data['email']).exists():
                user = User.objects.get(email=data['email'])

                # 유저가 입력한 비밀번호와 유저 객체의 비밀번호가 맞으면 로그인 성공
                if user.password == data['password']:
                    return HttpResponse(status=200)
                return HttpResponse(status=401)

        # 이메일 및 비밀번호가 틀리면 에러 발생(user invalid로 처리해주기)
        except KeyError:
            return JsonResponse({'USER':'INVALID'}, status=401)
```

### 7. account/urls.py 생성

```python
from django.urls import path

from .views      import SignUpView, LoginView


urlpatterns = [
    path('/login',   LoginView.as_view()),
    path('/sign-up', SignUpView.as_view()),
]
```

### 8. post/models.py 작성
- 유저가 작성하는 글이기 때문에 ForeignKey로 연결해준다.
- 포스트 모델에는 텍스트, 이미지, 좋아요, 북마크, 생성시간, 수정시간 저장
- 댓글 모델에는 유저, 텍스트, 생성시간, 수정시간 저장

```python
from django.db      import models

from account.models import User


class Post(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE)
    content    = models.TextField()
    image      = models.ImageField(upload_to='post/%Y/%m/%d')
    like       = models.ManyToManyField(User, blank=True, related_name='like_post')
    favorite   = models.ManyToManyField(User, blank=True, related_name='save_post')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'posts'


class Comment(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE)
    comment    = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'comments'
```

### 9. post/views.py 작성

```python
import json

from django.views   import View
from django.http    import HttpResponse, JsonResponse

from .models        import Comment
from account.models import User


class CommentView(View):
    # 댓글 작성 API
    def post(self, request):
        data = json.loads(request.body)

        Comment(
            user = User.objects.get(name=data['name']),
            comment=data['comment'],
        ).save()
        return HttpResponse(status=200)

    # admin용, 모든 댓글을 보는 API
    def get(self, request):
        comment = Comment.objects.values()
        return JsonResponse({'comments':list(comment)}, status=200)

# 특정 유저가 쓴 댓글만 보는 API
class MyCommentView(View):
    def get(self, request, user_id):
        comments = Comment.objects.filter(user_id=user_id).values()
        return JsonResponse({'comments': list(comments)}, status=200)
```

### 10.post/urls.py 생성

```python
from django.urls import path

from .views      import CommentView, MyCommentView


urlpatterns = [
    path('comments',              CommentView.as_view()),
    path('comment/<int:user_id>', MyCommentView.as_view()),
]
```

### 11. westagram/urls.py 수정
```python
from django.urls import path, include

urlpatterns = [
    path('',     include('post.urls')),
    path('user', include('account.urls')),
]
```

<hr>

## 테스트
테스트는 http -v 로 진행

- 회원가입
```vim
(wecode) ➜  westagram git:(master) ✗ http -v http://127.0.0.1:8000/user/sign-up name=user5 email=user5@user5.com password=1234
POST /user/sign-up HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 65
Content-Type: application/json
Host: 127.0.0.1:8000
User-Agent: HTTPie/1.0.2

{
    "email": "user5@user5.com",
    "name": "user5",
    "password": "1234"
}

HTTP/1.1 200 OK
Content-Length: 0
Content-Type: text/html; charset=utf-8
Date: Fri, 17 Apr 2020 02:03:24 GMT
Server: WSGIServer/0.2 CPython/3.7.1
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

- 로그인
```vim
(wecode) ➜  westagram git:(master) ✗ http -v http://127.0.0.1:8000/user/login email=user5@user5.com password=1234
POST /user/login HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 48
Content-Type: application/json
Host: 127.0.0.1:8000
User-Agent: HTTPie/1.0.2

{
    "email": "user5@user5.com",
    "password": "1234"
}

HTTP/1.1 200 OK
Content-Length: 112
Content-Type: application/json
Date: Fri, 17 Apr 2020 02:05:30 GMT
Server: WSGIServer/0.2 CPython/3.7.1
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

- 댓글 입력
```vim
(wecode) ➜  westagram git:(master) ✗ http -v http://127.0.0.1:8000/comments name=user5 comment=hi
POST /comments HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 34
Content-Type: application/json
Host: 127.0.0.1:8000
User-Agent: HTTPie/1.0.2

{
    "comment": "hi",
    "name": "user5"
}

HTTP/1.1 200 OK
Content-Length: 0
Content-Type: text/html; charset=utf-8
Date: Fri, 17 Apr 2020 02:08:03 GMT
Server: WSGIServer/0.2 CPython/3.7.1
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```