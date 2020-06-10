---
title: git branch 여러개 한번에 삭제
date: "2020-06-11"
template: "post"
draft: false
slug: "git-branch-all-delete"
category: "git"
tags:
  - "git-branch-all-delete"
description: "git branch 여러개 한번에 삭제"
socialImage: ""
---

### feature로 시작하는 브랜치 모두 삭제하기
git branch | grep 'feature' | xargs git branch -D

```vim
(base) ➜  ~ git:(master) git branch | grep 'feature' | xargs git branch -D
Deleted branch feature/matchup_dead (was 7f8c9a5).
Deleted branch feature/matchup_to_resume (was e32c1c3).
Deleted branch feature/model (was 9fc95dd).
Deleted branch feature/position (was 5a40dd3).
Deleted branch feature/profile (was de93c1c).
Deleted branch feature/proposal (was c7bfc9b).
Deleted branch feature/reading (was 182168e).
Deleted branch feature/reading_matchup (was 7e21e5d).
Deleted branch feature/register (was 6df7941).
Deleted branch feature/register2 (was 5dfd69f).
Deleted branch feature/request_resume (was 6f2148c).
```

### master, develop 제외하고 merge된 모든 브랜치 삭제하기

```vim
git branch --merged | grep -v "\*" | grep -v master | grep -v develop | xargs -n 1 git branch -d
```