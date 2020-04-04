---
title: 파이썬으로 로또 추첨 프로그램 만들기
date: "2020-03-13"
template: "post"
draft: false
slug: “python-lotto”
category: “python”
tags:
  - "python"
  - "lotto"
description: "python-lotto"
socialImage: ""
---


```python
from random import shuffle
from time import sleep

game_num = input('게임 횟수를 입력하세요 : ')

for i in range(int(game_num)):
    balls = [x+1 for x in range(45)]
    ret = []
    for j in range(6):
        shuffle(balls)
        number = balls.pop()
        ret.append(number)
    ret.sort()
    print('로또번호 [%d] : ' %(i+1), end='')
    print(ret)
    sleep(1)
```