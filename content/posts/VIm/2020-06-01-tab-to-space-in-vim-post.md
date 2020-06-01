---
title: vim 에서 tab 을 space 4개로 설정하기
date: "2020-06-01"
template: "post"
draft: false
slug: "tab-to-space-in-vim"
category: "vim"
tags:
  - "tab-to-space-in-vim"
description: "vim 에서 tab 을 space 4개로 설정하기"
socialImage: ""
---

1. vim 을 열어서 루트 접속
2. vi .vimrc

```vim
set smartindent
set tabstop=4
set expandtab
set shiftwidth=4
```