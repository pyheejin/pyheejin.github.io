---
title: git add 취소하기
date: "2020-04-24"
template: "post"
draft: false
slug: "git-add-unstage"
category: "git"
tags:
  - "add_unstage"
description: "git add 취소하기"
socialImage: ""
---

### git add 취소하기

- git reset HEAD [파일명]

```terminal
(wecode) ➜  rolex git:(master) ✗ git reset HEAD .
Unstaged changes after reset:
M	.gitignore
M	crawling/.collection.py.swp
M	crawling/collection.py
M	rolex/settings.py
M	rolex/urls.py
```