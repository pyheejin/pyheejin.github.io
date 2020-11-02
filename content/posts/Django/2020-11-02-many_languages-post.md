---
title: Django 다국어 적용하기
date: "2020-11-02"
template: "post"
draft: false
slug: "languages"
category: "django"
tags:
  - "django-languages"
description: "django locations 다국어 적용하기"
socialImage: ""
---


## 용어 정리
- 국제화(i18n, internationalization): 개발자가 지역화 지원을 위해 소프트웨어적으로 준비하는 것
- 지역화(l8n, localization): 번역가가 번역하고 지역 형식에 맞게 변환하는 것
- 로케일 이름: ko_KR은 대한민국 한국어이고 ko_KP는 북한 한국어 의미로 "언어_국가" 형식이다.
- 언어 코드: 브라우저가 HTTP 헤더 Accept-Language로 보내는 값으로 "언어-국가" 형식이며 ko-kr 같이 쓰는데 모두 소문자로 되어 있다. Django 설정 파일에서 쓰이는 값이다.
- .po 파일: 번역가가 직접 번역하는 메시지 파일이다.
- .mo 파일: Django가 인식할 수 있도록 개발자가.po 번역 메시지 파일을 컴파일해 만든 파일이다.


# Set up

### Django 전역 설정
  1. SessionMiddleware와 CommonMiddleware 사이에 LocaleMiddleware를 추가한다.

      ```python
      MIDDLEWARE = [
          'django.middleware.security.SecurityMiddleware',
          'django.contrib.sessions.middleware.SessionMiddleware',
          'django.middleware.locale.LocaleMiddleware', # here
          'django.middleware.common.CommonMiddleware',
          'django.middleware.csrf.CsrfViewMiddleware',
          'django.contrib.auth.middleware.AuthenticationMiddleware',
          'django.contrib.messages.middleware.MessageMiddleware',
          'django.middleware.clickjacking.XFrameOptionsMiddleware',
      ]
      ```

  2. settings.py 파일에서 다음 내용을 수정한다.

      ```python
      LANGUAGE_CODE = 'ko-KR'
      ```

  3. settings.py 파일에서 상단에 다음과 같이 import문을 추가하고, 프로젝트에서 지원할 다국어 언어값을 설정한다.

      ```python
      from django.utils.translation import ugettext_lazy as _

      LANGUAGES = [  # Available languages
          ('ko', _('Korean')),
          ('en', _('English')),
          ('ch', _('Chinese')),
          ('ja', _('Japanese')),
      ]
      ```

  3. settings.py 파일에서 번역 파일이 들어있는 locale 디렉토리를 지정하고 실제로 디렉토리를 생성한다.

      ```python
      LOCALE_PATHS = (
          os.path.join(BASE_DIR, 'locale'),
      )
      ```

# 번역 파일 만들기

### models.py 예시

```python
from django.utils.translation import ugettext_lazy as _

class Post(models.Model):
    STATUS_CHOICES = (
        ('draft', _('Draft')),
        ('published', _('Published')),
    )

    title = models.CharField(_('Title'), max_length=250)
```

### template.html 예시

```html
<li>
    <a href="{% url 'blog:post_index' %}">{{ _('Blog') }}</a>
</li>
```

### 번역 메시지 파일 생성

- 아래 명령어로 전체 메시지 파일을 만들 수 있다.
```vim
python manage.py makemessage -a
```

- 잘 되지 않으면 언어별로 생성한다.
```vim
python manage.py makemessages -l ko
python manage.py makemessages -l en
python manage.py makemessages -l ch
python manage.py makemessages -l ja
```

### 메시지 파일 컴파일
(컴파일 후에는 Django 서버를 재기동해야 메시지 번역 결과가 반영된다.)

```vim
python manage.py compilemessages
```

# fuzzy 플래그
.po 메시지 파일에 주석으로 #, fuzzy 표시가 있으면 해당 문자열은 번역되지 않는다. 따라서 번역 문자열 상단에 주석으로 #, fuzzy 표시가 있으면 해당 부분의 주석을 삭제한다.


# MacOS에서 gettext 설치
아래와 같이 gettext 프로그램이 설치되어 있지 않을 경우 이를 설치해야 한다.

```vim
python manage.py makemessages
CommandError: Can't find xgettext. Make sure you have GNU gettext tools 0.15 or newer installed.
```

아래와 같이 brew로 gettext를 설치한다.

```vim
brew install gettext
brew link gettext --force
```

단순히 설치만 하고 링크하지 않으면 명령행에서 실행할 수가 없다.