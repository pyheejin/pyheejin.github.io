---
title: 장고로 인스타그램 클론 API 만들기 - 인증/인가 로직 추가
date: "2020-04-19"
template: "post"
draft: false
slug: "django-python-instagram-API-Authentication-Authorization"
category: "django"
tags:
  - "django"
  - "Authentication"
  - "Authorization"
description: "장고로 인스타그램 클론 API 만들기 - 인증/인가 로직 추가"
socialImage: ""
---

### 유저 비밀번호 암호화
- account/views.py 변경

```python
import json
import bcrypt
import jwt

from django.http        import JsonResponse, HttpResponse
from django.views       import View

from .models            import User
from wetargram.settings import SECRET_KEY


class SignUpView(View):
    def post(self, request):
        data = json.loads(request.body)
        User(
            name=data['name'],
            email=data['email'],
            # password=data['password'],
            password=bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode(),
        ).save()
        return HttpResponse(status=200)

    def get(self, request):
        user_data = User.objects.values()
        return JsonResponse({'users': list(user_data)}, status=200)


class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(email=data['email']).exists():
                user = User.objects.get(email=data['email'])

                # if user.password == data['password']:
                #     return HttpResponse(status=200)
                if bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
                    token = jwt.encode({'id': user.id}, SECRET_KEY, algorithm='HS256')
                    return JsonResponse({'access_token': token.decode('utf-8')}, status=200)
                return HttpResponse(status=401)
        except KeyError:
            return JsonResponse({'users':'invalid'}, status=401)
```


### utils.py 생성
인증 로직은 노출되면 안되기 때문에 새로운 파일을 생성하고 그 파일은 깃허브에 올리지 않는다.

```python
import jwt

from django.http        import JsonResponse

from .models            import User
from wetargram.settings import SECRET_KEY # 장고의 SECRET_KEY를 이용


def login_decorator(func):
    def wrapper(self, request, *args, **kwargs):
        # 헤더에 있는 Authorization 정보를 가져온다.
        token = request.headers.get('Authorization', None)

        # 만약 Authorization 정보가 없으면 에러코드 발생
        if token == None:
            return JsonResponse({"error_code": "INVALID_LOGIN"}, status=401)
        
        # jwt로 토큰 생성
        d_token = jwt.decode(token, SECRET_KEY, algorithms='HS256')
        # 가져온 토큰에서 id 추출
        user = User.objects.get(id=d_token['id'])
        request.user = user
        return func(self, request, *args, **kwargs)
    return wrapper
```

### post/views.py 변경

```python
import json

from django.views   import View
from django.http    import HttpResponse, JsonResponse

from .models        import Comment
from .utils         import login_decorator


class CommentView(View):
    @login_decorator
    def post(self, request):
        data = json.loads(request.body)

        Comment(
            # user=User.objects.get(name=data['name'])
            user = request.user,
            comment=data['comment'],
        ).save()
        return HttpResponse(status=200)

    def get(self, request):
        comment = Comment.objects.values()
        return JsonResponse({'comments':list(comment)}, status=200)


class MyCommentView(View):
    def get(self, request, user_id):
        comments = Comment.objects.filter(user_id=user_id).values()
        return JsonResponse({'comments': list(comments)}, status=200)
```