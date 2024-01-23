---
title: .pyc 파일 삭제
date: "2024-01-23"
template: "post"
draft: false
slug: "/posts/delete-pyc-file"
category: "Python"
tags:
  - "python"
  - "delete"
  - "pyc"
description: "delete .pyc file"
---


```commandline
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf
```
