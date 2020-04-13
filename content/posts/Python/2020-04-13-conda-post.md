---
title: conda 로 가상환경 생성, 삭제,
date: "2020-04-13"
template: "post"
draft: false
slug: "conda"
category: "python"
tags:
  - "conda"
description: "conda로 가상환경 생성, 삭제, 리스트"
socialImage: ""
---

## 가상환경 리스트 확인하기
```terminal
conda env list
```

## 가상환경 생성
```terminal
conda create -n [가상환경 이름] python=3.7
```

## 가상환경 활성화
```terminal
conda activate [가상환경 이름]
```

## 가상환경 비활성화
```terminal
conda deactivate [가상환경 이름]
```

## 가상환경 삭제
```terminal
conda env remove -n [가상환경 이름]
```

## 설치되어있는 모듈 보기
```terminal
pip freeze
```