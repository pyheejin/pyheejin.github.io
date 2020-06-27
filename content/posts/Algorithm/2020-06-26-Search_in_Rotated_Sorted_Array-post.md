---
title: Search in Rotated Sorted Array
date: "2020-06-26"
template: "post"
draft: false
slug: "Search-in-Rotated-Sorted-Array"
category: "algorithm"
tags:
  - "Search-in-Rotated-Sorted-Array"
description: "Search in Rotated Sorted Array"
socialImage: ""
---

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand. <br>

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]). <br>

You are given a target value to search. If found in the array return its index, otherwise return -1. <br>

You may assume no duplicate exists in the array. <br>

Your algorithm's runtime complexity must be in the order of O(log n). <br>

Example 1:

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

Example 2:
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### answer

```python
class Solution:
    def search(self, nums, target):
        try:
            return nums.index(target)
        except ValueError:
            return -1
```