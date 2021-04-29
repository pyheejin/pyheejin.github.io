---
title: Python 정규표현식
date: "2021-04-29"
template: "post"
draft: false
slug: "python-reqular-expressions"
category: "python"
tags:
  - "python-reqular-expressions"
description: "Python 정규표현식"
socialImage: ""
---

### 정규 표현식으로 특수문자 추출하기

- 해시태그를 특수문자 이전까지만 인식되도록 하고 싶어서 처음에 막 짠 코드

```python
keyword = '야호~재밌다'

search_keyword = ''
for i in keyword:
    search_keyword+=i
    if i in '!@#$%^&*()+=-/?~.':
        keyword = search_keyword[:-1]
        break
```

- 나중에 다시 짠 정규 표현식으로 특수문자 확인하는 코드

```python
import re

keyword = '야호~재밌다'

p = re.compile('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]')
# keyword에 특수문자가 있으면 특수문자의 인덱스를 반환함
if p.search(keyword) is not None:
    # start() 는 첫번째 문자열부터 검색해서 나온 특수문자의 인덱스를 반환
    keyword = keyword[:p.search(keyword).start()]
else:
    keyword = keyword
```