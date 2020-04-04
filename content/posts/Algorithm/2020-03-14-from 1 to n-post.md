---
title: 1부터 n까지 연속한 숫자의 합
date: "2020-03-14"
template: "post"
draft: false
slug: "from-1-to-n"
category: "algorithm"
tags:
  - "from-1-to-n"
description: "from 1 to n"
socialImage: ""
---

# 1부터 n까지 연속한 숫자의 합

- n만큼 덧셈 반복
1. 합을 기록할 변수 s를 만들고 0으로 초기화
2. for 루프로 i를 1씩 증가하면서 반복
3. s에 i를 더한 값을 다시 s에 저장
4. return s

```python
def sum_n(n):
    s=0
    for i in range(1,n+1):
        s+=i
    return s
    
print(sum_n(10)) # 55
```

- nx(n+1) // 2

```python
def sum_n(n):
    num=n*(n+1)//2
    return num
    
print(sum_n(10)) # 55
```
