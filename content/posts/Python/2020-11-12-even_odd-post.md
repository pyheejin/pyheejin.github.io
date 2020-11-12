---
title: 짝수, 홀수를 구분하는 방법
date: "2020-11-03"
template: "post"
draft: false
slug: "python-even-odd"
category: "python"
tags:
  - "python-even-odd"
description: "Python으로 짝수, 홀수를 구분하는 방법"
socialImage: ""
---

# 1. 곱셈과 나눗셈 이용하기

```python
x = 1

if (x/2) * 2 == x:  
  print 'Even'  # 짝수 
else: 
  print 'Odd'   # 홀수
```

# 2. 나머지 연산자 이용하기

```python
x = 1

if (x%2) == 0:  
  print 'Even'  # 짝수 
else: 
  print 'Odd'   # 홀수
```

# 3. 비트 연산자 이용하기

```python
x = 1

if (x&1) == 0:  
  print 'Even'  # 짝수 
else: 
  print 'Odd'   # 홀수
```