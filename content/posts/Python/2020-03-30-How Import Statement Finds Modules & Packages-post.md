---
title: Modules & Packages
date: "2020-03-30"
template: "post"
draft: false
slug: "python-Modules-Packages"
category: "python"
tags:
  - "python"
  - "Modules_Packages"
description: "python Modules & Packages"
socialImage: ""
---

# Modules & Packages


## sys.modules와 sys.path의 차이점

### 1. sys.modules
- 파이썬이 모듈이나 package를 찾기위해 가장 먼저 확인하는 곳
- sys.modules는 단순한 dictionary 구조로 되어있다.
- 이미 import된 모듈과 package들을 저장하고 있다.
- 한번 import된 모듈과 package들은 파이썬이 또 다시 찾지 않아도 되도록 하는 기능을 가지고 있습니다.
- 새로 import 하는 모듈은 sys.modules 에서 찾을 수 없습니다.
- sys는 파이썬에 포함되어 있는 모듈이라서 sys 모듈을 import 해서 sys.modules와 sys.path 출력 및 수정도 가능하다.

```python
{
    'copy_reg': <module 'copy_reg' from '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/copy_reg.pyc'>, 
    'sre_compile': <module 'sre_compile' from '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/sre_compile.pyc'>, 
    '_sre': <module '_sre' (built-in)>, 
    'encodings': <module 'encodings' from '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/encodings/__init__.pyc'>, 
}
```

### 2. built-in modules
- 파이썬에서 제공하는 파이썬 공식 라이브러리들
- Built-in 모듈들은 이미 파이썬에 포함되어 나오므로 파이썬이 쉽게 찾을 수 있습니다.

### 3. sys.path
- sys.path는 기본적으로 list이며 string 요소들을 가지고 있는 리스트
- 각 string 요소들은 다음 처럼 경로를 나타냅니다
```python
[
    '/Users/heejin/Desktop/study', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python27.zip', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old', 
    '/usr/local/Cellar/python@2/2.7.16/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload', 
    '/Users/heejin/Library/Python/2.7/lib/python/site-packages', 
    '/usr/local/lib/python2.7/site-packages'
]
```

## sys도 import 해야하는 모듈입니다. <br> 파이썬은 sys 모듈의 위치를 어떻게 찾을 수 있을까요?

```python
import sys

print(sys.path)
print(sys.modules)

# 'sys': <module 'sys' (built-in)> 키:밸류 형식으로 되어있음
```
- sys는 파이썬에 포함되어 있는 모듈이라서 import해서 sys.modules와 sys.path를 출력하거나 수정도 가능하다.
- 파이썬이 설치될때 내장 모듈도 같이 설치되므로 path의 정보가 기본값으로 정해져 있다
- sys도 이미 built-in 되어있기 때문에 Built-in 모듈에서 찾을 수 있다.
<h5> 파이썬은 Modules & Packages를 찾을 떄 다음 3가지 장소를 순서대로 보면서 검색한다.</h5>
<h5> 파이썬은 import하고자 하는 모듈과 package를 찾을때에 먼저 sys.modules를 보고, 없으면 파이썬 built-in 모듈들을 확인 하고 마지막으로 sys.path에 지정되어 있는 경로들을 확인해서 찾는다.</h5>
<h5> sys.path 에서도 못찾으면 ModuleNotFoundError 에러를 리턴</h5>

## Absolute path와 Relative path의 차이점
Built-in 모듈, pip 으로 설치한 외무 모듈도 자동으로 site-packages 라는 디렉토리에 설치가 되는데 이 site-packages는 sys.path에 이미 포함되어 있기때문에 찾는데 문제가 없다.

문제는 직접 개발한 local package, 직접 개발한 local package를 import 할때는 해당 package의 위치에 맞게 import 경로를 잘 선언해야 한다.  Local package를 import 하는 경로에는 absolute path와 relative path가 있습니다

Relative path는 선언해야 하는 경로의 길이를 줄여준다는 장점은 있지만 헷갈리기 쉽고 파일 위치가 변경되면 경로 위치도 변경되어야 하는 단점이 있다. 그러므로 웬만한 경우 absolute path 사용하는걸 권장한다.

아래 프로젝트를 예시로 가정하고 설명한다

```
└── westagram
    ├── main.py
    ├── login
    │   ├── login.py
    │   └── logout.py
    └── profile
        ├── __init__.py
        ├── my_profile.py
        ├── follow.py
        └── story
            └── story_module.py
```

### Absolute path

```python
# main.py
from login import logout
from profile.follow import follower
from profile.story.story_module import my_story
```
- main.py가 이미 westagram 프로젝트 안에 있으므로 westagram 은 생략 가능
- 경로들의 시작점이 전부 "westagram" 프로젝트의 가장 최상위 디렉토리에서 시작하기 떄문에 westagram 프로젝트 내에서는 main.py가 아니더라도 동일한 표기법으로 사용할 수 있다.
- current directory 라고 하는 현재의 프로젝트 디렉토리는 default로 sys.path 에 포함되므로 absolute path는 current directory로 부터 경로를 시작하게 된다.


### Relative path
absolute path와 다르게 프로젝트의 최상단 디렉토리를 기준으로 경로를 잡는게 아니라 import 하는 위치를 기준으로 경로를 정의

```python
# profile/my_profile.py

from . import class2
from story.story_module import follower_story
```
- dot(.)은 import가 선언되는 파일의 현재 위치를 표시, 현재위치는 profile/my_profile.py 이므로 현재 위치에서부터 원하는 모듈의 경로만 선언해주면 된다.

```python
# story/story_module.py
from ..follow import follow_class
```
- dot 2개를 사용할 수도 있다. dot 2개(..)는 현재위치에서 상위 디렉토리로 가는 경로이다.