---
title: Django Static Files Serving
date: "2020-11-03"
template: "post"
draft: false
slug: "django-static"
category: "django"
tags:
  - "django-static"
description: "Django Static Files Serving"
socialImage: ""
---

# Static 파일
css, js, image 등 미리 준비해놓은 정적인 파일이다.

## STATICFILES_DIRS
개발 단계에서 사용하는 정적파일이 위치한 경로들을 지정하는 설정 항목(DEBUG = True 에서 사용)<br>
여러개의 경로들을 사용할 수 있으며, Python의 list나 tuple로 사용해야 한다.

```python
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static1'),
    os.path.join(BASE_DIR, 'static2'),
)
```

## STATIC_URL
웹 페이지에서 사용할 정적 파일의 최상위 URL 경로이다.<br>
(문자열은 반드시 /로 끝나야 함)

```python
STATIC_URL = '/static/'
```
STATIC_URL은 정적 파일이 실제 위치한 경로를 참조하며, 이 실제 경로는 STATICFILES_DIRS 설정 항목에 지정된 경로가 아닌 STATIC_ROOT 설정 항목에 지정된 경로이다.

## STATIC_ROOT

```python
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```
Django 프로젝트에서 사용하는 모든 정적 파일을 한 곳에 모아넣는 경로로, 아래 명령어로 수행한다.

```vim
python manage.py collectstatic
```
명령어를 실행하면 각 Django 앱 디렉터리에 있는 static 디렉터리와 STATICFILES_DIRS에 지정된 경로에 있는 모든 파일을 모아준다.