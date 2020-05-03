---
title: git conflict 해결하기
date: "2020-05-04"
template: "post"
draft: false
slug: "resolve-git-conflict"
category: "git"
tags:
  - "git_conflict"
description: "git conflict 해결하기"
socialImage: ""
---

### 충돌이 일어났을 때
git status 를 하면 충돌이 일어난 파일을 찾을 수 있다.

### 해결과정
1. git checkout master 로 마스터 브랜치로 이동
2. git fetch; git pull origin master 로 최신 정보를 받아온다.
3. git checkout [내가 작업하던 브랜치] 수정을 위해서 원래 적업하던 내 브랜치로 이동
4. git merge master
5. 충돌이 발생한 파일을 수정
6. git add
7. git commit
8. git push -u origin [내가 작업하던 브랜치]
9. Pull Request 후 merge가 되면
10. git fetch; git pull origin master 로 다시 최신 정보를 받아온다.