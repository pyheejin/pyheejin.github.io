---
title: 숫자로 이루어진 배열에서 과반수(majority, more than a half)가 넘은 숫자를 반환
date: "2020-05-10"
template: "post"
draft: false
slug: "more_than_half"
category: "algorithm"
tags:
  - "more_than_half"
description: "숫자로 이루어진 배열에서 과반수(majority, more than a half)가 넘은 숫자를 반환"
socialImage: ""
---

숫자로 이루어진 배열인 nums를 인자로 전달합니다. <br>
숫자중에서 과반수(majority, more than a half)가 넘은 숫자를 반환해주세요. <br>
(nums 배열의 길이는 무조건 2개 이상)

```python
nums = [3,2,3]
return 3
````

```python
nums = [2,2,1,1,1,2,2]
return 2
```

```python
def more_than_half(nums):
    res = {}
    for i in nums:
        res[i]=nums.count(i)
    res = sorted(res.items(), key=lambda x: x[1], reverse=True)
    return res[0][0]


print(more_than_half([2,2,1,1,1,2,2]))
```