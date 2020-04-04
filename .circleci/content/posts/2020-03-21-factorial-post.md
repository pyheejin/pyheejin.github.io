---
title: factorial
date: "2020-03-21"
template: "post"
draft: false
slug: “python-factorial”
category: “python”
tags:
  - "python"
  - "factorial"
description: "factorial"
socialImage: ""
---

# factorial
어떤 수의 계승으로 1부터 어떤 수까지의 곱 (3의 계승은 3x2x1, 3!로 표현하고 3factorial로 읽음)

- 점화식 : factorial(n)=factorial(n-1)*n
- 기저 조건 : if n<=1 then return 1 (n이 1 이하이면 1을 반환하고 빠져나감)

```python
def factorial(n):
    if n<=1:
        return 1
    return factorial(n-1)*n
	

# test code
if __name__=='__main__':
    for n in range(1,6):
        print(factorial(n), end=' ')
```
