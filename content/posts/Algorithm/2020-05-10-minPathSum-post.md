---
title: 양수로 이루어진 m x n 그리드 상단 왼쪽에서 시작하여, 하단 오른쪽까지 가는 길의 요소를 다 더했을 때, 가장 작은 합을 찾아서 return
date: "2020-05-10"
template: "post"
draft: false
slug: "minPathSum"
category: "algorithm"
tags:
  - "minPathSum"
description: "양수로 이루어진 m x n 그리드를 인자로 드립니다.
상단 왼쪽에서 시작하여, 하단 오른쪽까지 가는 길의 요소를 다 더했을 때, 가장 작은 합을 찾아서 return"
socialImage: ""
---

```
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]

Output: 7

설명: 1→3→1→1→1 의 합이 제일 작음
```

```python
def minPathSum(grid):
    m = len(grid)
    n = len(grid[0])

    for i in range(1, n):
        grid[0][i] += grid[0][i-1]

    for i in range(1, m):
        grid[i][0] += grid[i-1][0]

    for i in range(1, m):
        for j in range(1, n):
            grid[i][j] += min(grid[i-1][j], grid[i][j-1])

    return grid[-1][-1]

print(minPathSum([
  [1,3,1],
  [1,5,1],
  [4,2,1]
]))
```