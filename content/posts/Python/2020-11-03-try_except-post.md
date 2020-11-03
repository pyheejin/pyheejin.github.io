---
title: Try ~ Except
date: "2020-11-03"
template: "post"
draft: false
slug: "python-try-except"
category: "python"
tags:
  - "python-try-except"
description: "Python Try ~ Except"
socialImage: ""
---

# 오류 예외 처리 기법
## try, except
```
try:
    ...
except [발생 오류[as 오류 메시지 변수]]:
    ...
```
- try 블록 수행 중 오류가 발생하면 except 블록이 수행된다. 
- try 블록에서 오류가 발생하지 않는다면 except 블록은 수행되지 않는다.
- except [발생 오류[as 오류 메시지 변수]]: 에서 [ ] 기호를 사용하는데, 이 기호는 괄호 안의 내용을 생략할 수 있다는 관례 표기법이다.

### 1. try, except만 사용
오류 종류에 상관없이 오류가 발생하면 except 블록을 수행한다.

```python
try:
    ...
except:
    ...
```

### 2. 발생 오류만 포함한 except문
오류가 발생했을 때 except문에 미리 정해 놓은 오류 이름과 일치할 때만 except 블록을 수행한다.

```python
try:
    ...
except 발생 오류:
    ...
```

### 3. 발생 오류와 오류 메시지 변수까지 포함한 except문
오류 메시지의 내용까지 알고 싶을 때 사용하는 방법이다.

```python
try:
    ...
except 발생 오류 as 오류 메시지 변수:
    ...

try:
    4 / 0
except ZeroDivisionError as e:
    print(e) # division by zero
```

### 4. 여러개의 오류처리

```python
try:
    ...
except 발생 오류1:
   ... 
except 발생 오류2:
   ...

try:
    a = [1,2]
    print(a[5])
    2/0
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다.")
except IndexError:
    print("인덱싱 할 수 없습니다.")

try:
    a = [1,2]
    print(a[5])
    2/0
except ZeroDivisionError as e:
    print(e)
except IndexError as e:
    print(e)
# 결과 : list index out of range (인덱싱 오류가 먼저 발생했으므로 4/0으로 발생되는 ZeroDivisionError 오류는 발생하지 않았다.)

try:
    a = [1,2]
    print(a[3])
    4/0
except (ZeroDivisionError, IndexError) as e:
    print(e)
# 2개 이상의 오류를 동일하게 처리하기 위해서는 위와 같이 괄호를 사용하여 함께 묶어 처리하면 된다.
```

## try .. finally
test.txt 파일을 쓰기 모드로 연 후에 try문을 수행한 후 예외 발생 여부와 상관없이 finally절에서 f.close()로 열린 파일을 닫을 수 있다.

```python
try:
    ...
finally:
    ...

f = open('test.txt', 'w')
try:
    # 무언가를 수행한다.
finally:
    f.close()
```

## 오류 회피

```python
try:
    ...
except 발생 오류:
    ...

try:
    4 / 0
except ZeroDivisionError:
    pass
```