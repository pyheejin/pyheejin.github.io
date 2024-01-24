---
title: Ubuntu virtualenv 설치&사용법
date: "2024-01-24"
template: "post"
draft: false
slug: "/posts/ubuntu-virtualenv"
category: "Ubuntu"
tags:
  - "ubuntu"
  - "virtualenv"
description: "ubuntu virtualenv"
---


### 설치
```commandline
pip install virtualenv
```

### 가상환경 생성
```commandline
virtualenv -p python3 [env_name]
```

### 가상환경 활성화
```commandline
source [env_name]/bin/activate
```

### 가상환경 비활성화
```commandline
deactivate
```
