---
title: Maximum Subarray
date: "2020-06-30"
template: "post"
draft: false
slug: "Maximum-Subarray"
category: "algorithm"
tags:
  - "Maximum-Subarray"
description: "Maximum Subarray"
socialImage: ""
---

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

Follow up: <br>
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

### answer
1. max, min 이용

```python
class Solution:
  def maxSubArray(self, nums):
    max_number = min_number = result = nums[0]
    for number in nums[1:]:
        max_number, min_number = max(number, number + max_number, number + min_number), min(number, number + max_number, number + min_number)
        result = max(result, max_number)
    return result
```

2. 중첩 for문 이용(but, time limit..)

```python
class Solution:
  def maxSubArray(self, nums):
    result = nums[0]
    for i in range(len(nums)):
        for j in range(i, len(nums)):
            result = max(result, reduce(lambda x, y:x+y, nums[i:j+1]))
    return result
```