---
title: JWT 토큰
date: "2024-02-05"
template: "post"
draft: false
slug: "/posts/python-jwt"
category: "Python"
tags:
  - "python"
  - "jwt"
  - "token"
description: "JWT Token"
---


## 모듈 설치
```commandline
pip install pyjwt
```

## 자동 로그인 시나리오
1. 로그인 시 Access token과 Refresh token 발급
2. DB에 Refresh token 저장
3. 클라이언트에서 Access token과 Refresh token 둘 다 보냄
4. Access token의 기간 확인
    1. Access token의 기간이 만료된 경우
       - 클라이언트에서 받은 Refresh token 과 DB의 Refresh token 이 일치하면 Access token 재발급
    2. Access token의 기간은 유효한데 Refresh token이 만료된 경우
       - Access token이 유효하면 Refresh token 재발급
5. 로그아웃시 Access token과 Refresh token 만료시키기


## handler
- 랜덤 키 생성
```commandline
openssl rand -hex 64
```
```python
import jwt

from datetime import datetime, timedelta


class JWT:
    def __init__(self):
        self.ACCESS_EXPIRED_TIME = 10
        self.REFRESH_EXPIRED_TIME = 1
        self.ALGORITHM = 'HS256'
        self.SECRET_KEY = 'random key'

    def create_access_token(self, payload: dict):
        expired_at = datetime.utcnow() + timedelta(minutes=self.ACCESS_EXPIRED_TIME)
        kr_expired_at = (expired_at + timedelta(hours=9)).strftime('%Y-%m-%d %H:%M:%S')
        payload.update({'exp': expired_at,
                         'expired_at': kr_expired_at})
        result = jwt.encode(payload, key=self.SECRET_KEY, algorithm=self.ALGORITHM)
        return result

    def create_refresh_token(self, payload: dict):
        expired_at = datetime.utcnow() + timedelta(days=self.REFRESH_EXPIRED_TIME)
        kr_expired_at = (expired_at + timedelta(hours=9)).strftime('%Y-%m-%d %H:%M:%S')
        payload.update({'exp': expired_at,
                         'expired_at': kr_expired_at})
        result = jwt.encode(payload, key=self.SECRET_KEY, algorithm=self.ALGORITHM)
        return result

    def verify_token(self, token):
        try:
            response = jwt.decode(token, key=self.SECRET_KEY, algorithms=self.ALGORITHM)
        except jwt.ExpiredSignatureError:
            # 토큰 인증 시간 만료
            raise TypeError(404, '토큰 기간이 만료되었습니다.')
        except jwt.InvalidTokenError:
            # 토큰 검증 실패
            raise TypeError(401, '로그인이 필요합니다')
        return response
```
