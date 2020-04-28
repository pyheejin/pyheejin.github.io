---
title: 양수 N을 이진법으로 바꿨을 때, 연속으로 이어지는 0 중에서 가장 큰 값을 return
date: "2020-04-28"
template: "post"
draft: false
slug: "binary-gap"
category: "algorithm"
tags:
  - "binary_gap"
description: "양수 N을 이진법으로 바꿨을 때, 연속으로 이어지는 0 중에서 가장 큰 값을 return하기"
socialImage: ""
---

- 이어지는 0은 1과 1사이에 있는 것을 의미합니다.
- 이런 것을 binary gap 이라고 합니다.

```box
input: 9
output: 2
설명: 9의 이진수는 1001 입니다. 
1과 1사이에 있는 0은 2 이므로, 2를 return
```

```box
input: 529
output: 4
설명: 529의 이진수는 1000010001 입니다. 
1과 1사이에 있는 연속된 0의 수는 4와 3입니다.
이 중 큰 값은 4이므로 4를 return
```

```box
input: 20
output: 1
설명: 20의 이진수는 10100 입니다. 
1과 1사이에 있는 연속된 0의 수는 1 뿐입니다.
(뒤에 있는 0은 1사이에 있는 것이 아니므로)
````

```box
input: 15
output: 0
설명: 15의 이진수는 1111 입니다. 
1과 1사이에 있는 0이 없으므로 0을 return
````

```box
input: 32
output: 0
설명: 32의 이진수는 100000 입니다. 
1과 1사이에 있는 0이 없으므로 0을 return
```

- 이진수로 변환한 binary를 반복하면서 '1'을 만났을 때 conuter를 res에 추가해서 제일 큰 값을 리턴

```python
def solution(n):
    binary = bin(n)[2:]
    print(binary)
    res = []
    counter = 0

    for i in range(0, len(binary)):
        if binary[i] == '1':
            res.append(counter)
            counter = 0
        counter += 1
        if res[-1] == '0':
            return 0
    if max(res) <= 0:
        return 0
    return max(res) - 1

print(solution(32))
```