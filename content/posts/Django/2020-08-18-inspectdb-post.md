---
title: 여러개의 DB를 Django 장고에 연동시키기
date: "2020-08-18"
template: "post"
draft: false
slug: "Multiple-DB-in-Django-for-inspectdb"
category: "django"
tags:
  - "Multiple-DB-in-Django-for-inspectdb"
description: "inspectdb로 여러개의 DB를 Django 장고에 연동시키기"
socialImage: ""
---

```python
DATABASES = {
    'default': {         
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),         
        'ENGINE': 'django.db.backends.sqlite3',         
    },     
    'second': {         
        'NAME': 'NAME',         
        'ENGINE': 'django.db.backends.mysql',         
        'USER': 'USER',         
        'PASSWORD': 'PASSWORD',     
    }
}
```

```python
python manage.py inspectdb --database=[db이름] > [생성할 파일 경로]
```

```python
python manage.py inspectdb --database=wallet_db > api/models.py
```

- 멀티플 DB일 경우에는 DB이름을 명시하지 않으면 'default'환경으로 접속하니 꼭 이름을 명시해야 한다.
- 기존에 있는 models.py에 덮어씌워지게 되니 조심해야 한다.