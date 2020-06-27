---
title: Rest API
date: "2020-06-18"
template: "post"
draft: false
slug: "Rest-API"
category: "django"
tags:
  - "Rest-API"
description: "Rest-API"
socialImage: ""
---
# REST란?
Representational State Transfer의 약자로 웹의 장점을 최대한으로 활용할 수 있는 아키텍쳐이다. <br> URI(Uniform Resource Identifier)을 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다 <br>
즉, 자원 기반의 구조설계의 중심에 Resource가 있고 HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍쳐를 말한다. <br>
Hypermedia API의 기본을 충실히 지키면서 범용성을 보장한다.

## REST 구성
- 자원(Resource) : 데이터(문서, 그림, 데이터, 해당 소프트웨어 자체 등)
- 행위(Verb) : HTTP Method
- 표현(Representations)

## REST의 장단점
- 장점
  - HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도 인프라를 구출할 필요가 없다.
  - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
  - REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
  - 서버와 클라이언트의 역할을 명확하게 분리한다
- 단점
  - 사용할 수 있는 메소드가 제한적이다.
  - 모든 브라우저에서 지원되지 않는다.

## REST 특징
1. Uniform Interface(유니폼 인터페이스)<br>
Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일
2. Stateless (무상태성)<br>
작업을 위한 상태정보를 따로 저장하고 관리하지 않는다. 세션 정보나 쿠키정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 들어오는 요청만을 단순히 처리, 때문에 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순해짐
3. Cacheable (캐시 처리 기능)<br>
REST의 가장 큰 특징 중 하나는 HTTP라는 기존 웹표준을 그대로 사용하기 때문에 웹에서 사용하는 기존 인프라를 그대로 활용이 가능, 따라서 HTTP가 가진 캐싱 기능을 적용 가능하다. HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능하다
4. Self-descriptiveness (자체 표현 구조)<br>
REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다
5. Client - Server 구조<br>
REST 서버는 API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로간 의존성이 줄어든다.
6. 계층형 구조<br>
REST 서버는 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있고 PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있게 한다.

## REST API 디자인 가이드
### HTTP Method(CRUD)
다음과 같은 식으로 URI는 자원을 표현하는 데에 집중하고 행위에 대한 정의는 HTTP METHOD를 통해 하는 것이 REST한 API를 설계하는 중심 규칙이다.

|Method|Resource|
|------|--------|
| POST |생성(Create)|
| GET  |조회(Read)|
| PUT  |전체수정(Update)-일부 데이터만 전달할 경우, 다른 필드는 초기화 됨|
|PATCH |부분수정(Update)|
|DELETE|삭제(Delete)|

1. URL은 정보의 자원을 표현해야 한다.

```
DELETE /photo/1
GET /photo/1
POST /photo/2
PUT /photo/1
PATCH /photo/2
```
2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, PATCH, DELETE)로 표현한다.

### URL 설계시 주의할 점
1. 슬래시 구분자(/)는 계층 관계를 나타내는데 사용
2. URL의 마지막에 슬래시(/)를 포함하지 않는다.

```
[x] https://pyheejin.github.io/category/python/
[o] https://pyheejin.github.io/category/python
```
3. 불가피하게 긴 경로를 사용하게 된다면 하이픈(-)을 사용한다.(언더스코어(_)는 사용하지 않는다.)
4. 소문자가 적합하다.
5. 파일 확장자는 URL에 사용하지 않는다.
