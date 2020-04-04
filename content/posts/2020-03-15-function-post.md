---
title: function
date: "2020-03-15"
template: "post"
draft: false
slug: “python-function”
category: “python”
tags:
  - "python"
  - "function"
description: "python-function"
socialImage: ""
---

## 함수

```python
# 전역변수 : global variable
a=10
b=20
def func(c,d):

    # 지역변수 : local variable
    e=c+d
    return e

print(func(a,b)) # 30


g_var=20
def func(val):
    global g_var
    g_var+=30
    
func(g_var)
print(g_var) # 50
```
