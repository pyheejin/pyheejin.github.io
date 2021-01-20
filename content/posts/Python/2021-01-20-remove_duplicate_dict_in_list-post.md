---
title: 리스트 안 딕셔너리 중복 제거
date: "2021-01-20"
template: "post"
draft: false
slug: "python-remove-duplicate-dict-in-list"
category: "python"
tags:
  - "python-remove-duplicate-dict-in-list"
description: "Python 리스트 안 딕셔너리 중복 제거"
socialImage: ""
---

# 1. 순서가 보장되지 않음

```python
data = [ 
    {'id': 1, 'name': 'john', 'age': 30}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 4, 'name': 'sujan', 'age': 30}
]

list(map(dict, set(tuple(sorted(i.items())) for i in data)))
```

# 2. 순서가 보장됨

```python
from collections import OrderedDict


data = [ 
    {'id': 1, 'name': 'john', 'age': 30}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 4, 'name': 'sujan', 'age': 30}
]

list(map(dict, OrderedDict.fromkeys(tuple(sorted(i.items())) for i in data)))
```

# 3. 특정 키를 기준

```python
data = [ 
    {'id': 1, 'name': 'john', 'age': 30}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 2, 'name': 'jane', 'age': 29}, 
    {'id': 4, 'name': 'sujan', 'age': 30}
]

{i['name']:i for i in data}.values()
```