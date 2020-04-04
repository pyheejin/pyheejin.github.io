---
title: selection sort (선택 정렬)
date: "2020-03-14"
template: "post"
draft: false
slug: "selection-sort"
category: "algorithm"
tags:
  - "selection_sort"
description: "selection sort (선택 정렬)"
socialImage: ""
---

# selection sort
시간복잡도 : O(n^2)

```python
import random

def selection_sort(li):
    n=len(li)

    for i in range(n-1):
        min_index=i # i부터 끝까지의 값 중 최소값의 위치를 찾음
        for j in range(i+1, n):
            if li[j] < li[min_index]:
                min_index=j
        li[i], li[min_index] = li[min_index], li[i] # 최소값을 i의 위치로 교환


# test code
if __name__=="__main__":
    while True:
        num_data=int(input('데이터 개수(종료:0):'))
        if not num_data:
            break
        data=[random.randint(1, 100) for _ in range(num_data)]
        print(data)
        selection_sort(data)
        print(data)
```
