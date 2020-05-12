---
title: git rebase
date: "2020-05-12"
template: "post"
draft: false
slug: "git-rebase"
category: "git"
tags:
  - "git-rebase"
description: "git rebase"
socialImage: ""
---

1. git checkout master
2. git pull origin master
3. git rebase -i master [rebase 할 브랜치 명] 
4. 처음 커밋을 pick으로 남겨두고, 나머지 커밋을 s로 변경 후 저장

```
pick first commit
pick second commit
pick third commit
```

```
pick first commit
s second commit
s third commit
```

5. 커밋 메시지 정리
- CONFLICT 있을 경우
  1. CONFLICT 해결
  2. git add .
  3. git rebase —continue (rebase를 중단하고 싶으면 —abort옵션)
  4. git push origin [내 브랜치 명]
- CONFLICT 없을 경우
  1. git push origin [내 브랜치 명]
(만약 git pull과 rebase 사이에 merge가 발생했다면 강제 푸쉬 git push -f origin [내 브랜치 명]