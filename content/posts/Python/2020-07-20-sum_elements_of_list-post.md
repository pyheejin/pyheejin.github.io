---
title: 리스트의 모든 요소 더하기
date: "2020-07-20"
template: "post"
draft: false
slug: "sum-the-elements-of-list"
category: "python"
tags:
  - "sum-the-elements-of-list"
description: "리스트의 모든 요소 더하기"
socialImage: ""
---

## 1. Sum

```python
num_list = [1, 2, 3]
result = sum(num_list)
```

## 2. reduce

```python
from functools import reduce

num_list = [1, 2, 3]
result = reduce(lambda  x, y: x+y, num_list)
```