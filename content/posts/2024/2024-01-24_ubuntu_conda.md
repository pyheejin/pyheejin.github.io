---
title: Ubuntu Conda 설치&사용법
date: "2024-01-24"
template: "post"
draft: false
slug: "/posts/ubuntu-conda"
category: "Ubuntu"
tags:
  - "ubuntu"
  - "conda"
description: "ubuntu conda"
---


### 설치
> https://repo.anaconda.com/archive
> 원하는 버전 선택해서 설치하기
```commandline
sudo wget https://repo.anaconda.com/archive/[파일명]
sudo wget https://repo.anaconda.com/archive/Anaconda3-2023.03-Linux-x86_64.sh
```
```commandline
bash [파일명]
bash Anaconda3-2023.03-Linux-x86_64.sh
```

### 변경 내용 적용하기
```commandline
source ~/.bashrc
```

### 가상환경 생성
```commandline
conda create -n [가상환경 이름] python=[파이썬 버전]
conda create -n basic python=3.7
```

### 가상환경 활성화
```commandline
conda activate [가상환경 이름]
conda activate basic
```
