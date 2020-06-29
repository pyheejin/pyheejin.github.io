---
title: git flow
date: "2020-04-04"
template: "post"
draft: false
slug: "git-flow"
category: "git"
tags:
  - "git"
description: "git flow"
socialImage: ""
---

1. git clone 주소
2. 해당 레포 디렉토리로 접속
3. git flow init
4. git flow feature start [브랜치 이름]
5. 작업 시작 ~ 작업 끝
6. git add .
7. git commit -m '커밋 내용'
8. git push -u origin feature/[브랜치 이름]
9. git flow feature finish [브랜치 이름] (하면 자동으로 develop로 브랜치가 바뀜)
10. git flow release start v0.1
11. git flow release finish v0.1 (하면 자동으로 develop로 브랜치가 바뀜)
12. git push -u origin develop
13. git checkout master
14. git push -u origin master