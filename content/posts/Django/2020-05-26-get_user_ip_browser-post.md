---
title: 장고에서 유저 ip, 브라우저 타입 저장하기
date: "2020-05-26"
template: "post"
draft: false
slug: "get-user-ip-browser-in-django"
category: "django"
tags:
  - "get-user-ip-browser-in-django"
description: "장고에서 유저 ip, 브라우저 타입 저장하기"
socialImage: ""
---

### user ip
request.META.get('HTTP_X_FORWARDED_FOR')

### user browser type
request.META['HTTP_USER_AGENT']

### views.py

```python
class LogInView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(email=data['email']).exists():
            user = User.objects.get(email=data['email'])

            if bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
                token = jwt.encode({'id': user.id}, SECRET_KEY, algorithm='HS256')
                Security.objects.create(
                    user_id = user.id,
                    user_ip = request.META['REMOTE_ADDR'],
                    browser = request.META['HTTP_USER_AGENT'],
                    date = datetime.today().strftime("%Y/%m/%d %H:%M:%S")
                )
                return JsonResponse({'token': token.decode('utf-8')}, status=200)
            return HttpResponse(status=401)
        except KeyError:
            return JsonResponse({'MESSAGE':'USER INVALID'}, status=401)
```