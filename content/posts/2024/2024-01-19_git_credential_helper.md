---
title: git 로그인 정보 기억하기
date: "2024-01-19"
template: "post"
draft: false
slug: "/posts/git-credential-helper"
category: "Git"
tags:
  - "git"
  - "credential"
description: "git credential helper"
socialImage: ""
---


## Credential
반영구적으로 해당 폴더에 저장함
```commandline
git config credential.helper store
```

## Cache
지정한 시간 동안 저장
```commandline
git config credential.helper 'cache --timeout=3600'
```

## Global
폴더 상관없이 모든 프로젝트에 적용
```commandline
git config credential.helper store --global
```
