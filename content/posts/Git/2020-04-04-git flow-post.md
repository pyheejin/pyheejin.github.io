---
title: git flow
date: "2020-04-04"
template: "post"
draft: false
slug: "git-flow"
category: "git"
tags:
  - "git-flow"
description: "git flow"
socialImage: ""
---

### branch
1. master : 기준이 되는 브랜치로 제품을 배포하는 브랜치
2. develop : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 병합(Merge)
3. feature : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 병합(Merge)
4. release : 배포를 위해 master 브랜치로 보내기 전에 먼저 QA(품질검사)를 하기 위한 브랜치
5. hotfix : master 브랜치로 배포를 했는데 버그가 생겼을 때 긴급 수정하는 브랜치 입니다.

### git flow
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