---
title: 인증(Authentication) & 인가(Authorization)
date: "2020-04-18"
template: "post"
draft: false
slug: "Authentication-Authorization"
category: "django"
tags:
  - "django"
  - "Authentication"
  - "Authorization"
  - "hash"
description: "인증(Authentication) & 인가(Authorization)"
socialImage: ""
---

# 인증(Authentication)
- Authentication은 유저의 identification을 확인하는 절차
- 유저의 아이디와 비번을 확인하는 절차
- 인증을 하기 위해선 먼저 유저의 아이디와 비번을 생성할 수 있는 기능도 필요하다.

### 로그인 절차
1. 유저 아이디와 비번 생성
2. 유저 비번 암호화 해서 DB에 저장
3. 유저 로그인 -> 아이디와 비밀번호 입력
4. 유저가 입력한 비밀번호 암호화 한후 암호화되서 DB에 저정된 유저 비밀번호와 비교
5. 일치하면 로그인 성공
6. 로그인 성공하면 access token을 클라이언트에게 전송.
7. 유저는 로그인 성공후 다음부터는 access token을 첨부해서 request를 서버에 전송함으로서 매번 로그인 하지 않도록 한다.

### 비밀번호 암호화
- 유저의 비밀번호는 노출방지를 위해서 그대로 저장하지 않고 암호화해서 DB에 저장한다.
- 암호화는 단방향 해쉬 함수(one-way hash function)가 일반적으로 쓰인다.
    - 단방향 해시 함수는 원본 메시지를 변환하여 암호화된 메시지인 다이제스트(digest)를 생성한다. 원본 메시지를 알면 암호화된 메시지를 구하기는 쉽지만 암호화된 메시지로는 원본 메시지를 구할 수 없어서 단방향성(one-way) 이라고 한다.
    - 예를 들어, "test password"를 hash256이라는 해쉬 함수를 사용하면 0b47c69b1033498d5f33f5f7d97bb6a3126134751629f4d0185c115db44c094e 값이 나온다.
    - 만일 "test password2"를 hash256 해쉬 함수를 사용하면 d34b32af5c7bc7f54153e2fdddf251550e7011e846b465e64207e8ccda4c1aeb 값이 나온다. 실제 비밀번호는 비슷하지만 해쉬 함수 값은 완전히 틀린것을 볼 수 있다. 이러한 효과를 avalance라고 하는데 비밀번호 해쉬 값을 해킹을 어렵게 만드는 하나의 요소이다.

    ```python
    >>> import hashlib
    >>> pw = hashlib.sha256()
    >>> pw.update(b'test password')
    >>> pw.hexdigest()
    '0b47c69b1033498d5f33f5f7d97bb6a3126134751629f4d0185c115db44c094e'
    >>> pw = hashlib.sha256()
    >>> pw.update(b'test password2')
    >>> pw.hexdigest()
    'd34b32af5c7bc7f54153e2fdddf251550e7011e846b465e64207e8ccda4c1aeb'
    ```

# Bcrypt
단방향 해쉬 함수의 취약점들을 보안하기 위해 2가지 보완점들이 사용된다.
alting과 Key Stretching을 구현한 해쉬 함수중 가장 널리 사용되는 것이 bcrypt이다.
bcrypt는 처음부터 비밀번호를 단방향 암호화 하기 위해 만들이전 해쉬함수 이다.

1. Salting
    - 실제 비밀번호 이외에 추가적으로 랜덤 데이터를 더해서 해시값을 계산하는 방법
2. Key Stretching
    - 단방향 해쉬값을 계산 한 후 그 해쉬값을 또 또 해쉬 하고, 또 이를 반복하는 것을 말한다.

```vim
pip install bcrypt
```

```vim
>>> import bcrypt
>>> a = '1234'
>>> a
'1234'
>>>
>>> bcrypt.hashpw(a,bcrypt.gensalt())
# utf-8로 인코딩 해야한다.
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/heejin/miniconda3/envs/wecode/lib/python3.7/site-packages/bcrypt/__init__.py", line 61, in hashpw
    raise TypeError("Unicode-objects must be encoded before hashing")
TypeError: Unicode-objects must be encoded before hashing
>>> a.encode('utf-8') # 인코딩
b'1234'
>>> b = a.encode('utf-8') # 인코딩 후 변수에 담기
>>> bcrypt.hashpw(a.encode('utf-8'),bcrypt.gensalt())
b'$2b$12$EYtTmqRXQUCuYBzb1ei20..1oXpLILNhXoVwJdlm23EGhBrwqeJHy'
>>> hashed_pw = bcrypt.hashpw(a.encode('utf-8'),bcrypt.gensalt())
>>> hashed_pw
b'$2b$12$DTH/GNM8NRwT.zo3HYsTtei4vMLo3Ga8Jk7NEomHHZKF1s8/7Mw.u'
>>> hashed_pw.decode('utf-8')
'$2b$12$DTH/GNM8NRwT.zo3HYsTtei4vMLo3Ga8Jk7NEomHHZKF1s8/7Mw.u'
>>> b = '1234'
>>> bcrypt.checkpw(b.encode('utf-8'), hashed_pw) # 해시한 비밀번호가 맞는지 비교
True
```

# jwt

```vim
pip install PyJWT
```

유저가 로그인에 성공한 후에는 access token이라고 하는 암호화된 유저 정보를 첨부해서 request를 보내게 된다.

- 로그인

```vim
POST /user/login HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 48
Content-Type: application/json
Host: 127.0.0.1:8000
User-Agent: HTTPie/1.0.2

{
    "email": "user5@user5.com",
    "password": "1234"
}

HTTP/1.1 200 OK
Content-Length: 112
Content-Type: application/json
Date: Fri, 17 Apr 2020 02:05:30 GMT
Server: WSGIServer/0.2 CPython/3.7.1
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

- access_token

```vim
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NX0.izem9-_-gTJxFaRtz02SGfsv47B1TR3oAWyUVqVGj2U"
}
```

access_token을 복호화하면 유저 아이디를 확인할 수 있다. 아이디를 통해 유저 정보를 확인할 수 있다.

```vim
>>> import jwt
>>> payload = {'user_id' : 1}
>>> jwt.encode(payload, 'secret')
b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.J_RIIkoOLNXtd5IZcEwaBDGKGA3VnnYmuXnmhsmDEOs'
>>> a = jwt.encode(payload, 'secret')
>>> a.decode('utf-8')
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.J_RIIkoOLNXtd5IZcEwaBDGKGA3VnnYmuXnmhsmDEOs'
>>> a = jwt.encode(payload, 'secret', algorithm='HS512')
>>> a.decode('utf-8')
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxfQ.Ut_TonHBOesY0AEsk_iY3MUxjploFjxgsjAX3HCvI23tdYgzCdOlkSljQXjsVzqn01lyz-jtWDXh6k__lyftUw'
>>> b = jwt.decode(a, 'secret', algorithm='HS512')
>>> b
{'user_id': 1}
```

# 인가(Authorization)
- Authorization은 유저가 요청하는 request를 실행할 수 있는 권한이 있는 유저인지 확인하는 절차이다.(해당 유저는 고객 정보를 볼 수는 있지만 수정할 수는 없다 등.)
- Authroization도 JWT를 통해서 구현될 수 있다.
    - access token을 통해 해당 유저 정보를 얻을 수 있음으로 해당 유저가 가지고 있는 권한(permission)도 확인 할 수 있다.

## Authorization 절차
1. Authentication 절차를 통해 access token을 생성한다. access token에는 유저 정보를 확인할 수 있는 정보가 들어가 있어야 한다 (예를 들어 user id).
2. 유저가 request를 보낼때 access token을 첨부해서 보낸다.
3. 서버에서는 유저가 보낸 access token을 복호화 한다.
4. 복호화된 데이터를 통해 user id를 얻는다.
5. user id를 사용해서 database에서 해당 유저의 권한(permission)을 확인하다.
6. 유저가 충분한 권한을 가지고 있으면 해당 요청을 처리한다.
7. 유저가 권한을 가지고 있지 않으면 Unauthorized Response(401) 혹은 다른 에러 코드를 보낸다.


<hr>

# hash 실습

```python
import hashlib

def sha1_hash(input_str):
    
    hash_obj = hashlib.sha1(input_str.encode())
    hash_value = hash_obj.hexdigest()
    return hash_value


wecode_hash_value = sha1_hash('wecode')
print(wecode_hash_value) # 283463014a3f8ab829fcf9087ff85d50da1d1bb6
print(len(wecode_hash_value)) # 40

hash_value_1234 = sha1_hash('1234')
print(hash_value_1234) # 7110eda4d09e062aa5e4a390b0a572ac0d2c0220
print(len(hash_value_1234)) # 40
```

# 과제
[Set, Hash]
set 는 동일한 값을 여러번 삽입 불가능하고 해쉬값을 기반으로 저장하기 때문에 look up 이 굉장히 빠른 자료구조라고 배웠습니다.
내부적으로 해시 값을 사용해서 빠르게 데이터를 저장하고 가져올 수 있기 때문 인데요. 해시 값을  구해주는 함수를 해시 함수라고 하는데 다른 키에 대해서 같은 해시값이 나오는 경우를 충돌 이라고 합니다.
우리는 이런 충돌을 해결하여 중복된 값을 저장하지 않도록 해시 테이블을 사용하여 주어진 MySet 클래스의 add 메소드를 간단하게 구현해 보겠습니다.
여기서는 가장 간단한 방법인 선형 탐사기법을 사용하여 충돌을 방지하고 중복된 데이터를 저장하지 않도록 구현해 보겠습니다.
선형탐사(Linear Probing) 특정 버킷에서 충돌이 발생하면 인덱스를 1씩 증가시켜 비어있는 버킷을 찾는 방법입니다.


### Assignment
MySet클래스는 내부에 15개의 bucket을 가지는 클래스 입니다. 

1. hash_value 함수
SHA1 알고리즘으로 해시값을 구한후,
16진수중 0~9까지만 골라내서 나눗셈법으로 버킷의 인덱스를 구합니다.
(hint) hash_value 를 print 해서 값을 확인해보고 숫자만 골라내서 이어붙여서 새로운 숫자를 만들어 내고 버킷의 사이즈로 나눈 나머지를 버킷의 인덱스로 하는 함수입니다.

2. add 함수
hash_value 함수를 사용하여 해시값을 구한 후 중복되는 키에 대해서는 충돌을 해결하여 중복된 값을 저장하지 않도록 bucket에 저장하는 함수 입니다.


```python
import hashlib
import re

class MySet:
    def __init__(self, size):
        self.size = size
        self.bucket = [ None for x in range(size) ]

    def values(self):
        set_data =""
        for i in range(self.size):
            if self.bucket[i] != None:
                set_data += self.bucket[i]
                set_data += ", "
        if set_data[-1] == " ":
            data_set = set_data[:-2]
        return data_set

    # 1. hash_value 함수
    def hash_value(self,key):
        hash_value = hashlib.sha1(key.encode())
        # 여기서 부터 구현
        hash_obj = hash_value.hexdigest()
        res = re.sub('\D','',hash_obj)
        return int(res) % self.size
  
    # 2. add 함수
    def add(self, key):
        hash_value = self.hash_value(key)
        # 여기서 부터 구현
        while self.bucket[hash_value] != None:
            if key in self.bucket:
                return
            hash_value += 1
        self.bucket[hash_value] = key
            

if __name__ == "__main__":
    myset = MySet(15)
    myset.add('wecode') # 인덱스 6
    myset.add('wework') # 인덱스 7
    myset.add('weplay') # 인덱스 6
    print(myset.values()) # wecode, wework, weplay
    print(myset.bucket) # [None, None, None, None, None, None, 'wecode', 'wework', 'weplay', None, None, None, None, None, None]
```