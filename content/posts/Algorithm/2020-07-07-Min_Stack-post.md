---
title: Min Stack
date: "2020-07-07"
template: "post"
draft: false
slug: "Min-Stack"
category: "algorithm"
tags:
	- "Min-Stack"
description: "Min Stack"
socialImage: ""
---

- Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
	- push(x) -- Push element x onto stack.(요소 x를 스택에 넣습니다.)
	- pop() -- Removes the element on top of the stack.(스택에서 제일 마지막 데이터를 제거합니다.)
	- top() -- Get the top element.(최상위 요소를 가져옵니다.)
	- getMin() -- Retrieve the minimum element in the stack.(최소값을 반환합니다.)

- Example:

```python
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

- Constraints:
	- Methods pop, top and getMin operations will always be called on non-empty stacks.


### Answer

```python
class MinStack:
	def __init__(self):
		'''
		initialize your data structure here.
		'''
		self.container = list()

	def is_empty(self):
		if not self.container:
			return True
		else:
			return False

	def push(self, x: int) -> None:
		self.container.append(x)

	def pop(self) -> None:
		return self.container.pop()

	def top(self) -> int:
		return self.container[-1]

	def getMin(self) -> int:
		return min(self.container)
```
