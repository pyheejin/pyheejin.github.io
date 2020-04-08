---
title: RDBMS
date: "2020-04-09"
template: "post"
draft: false
slug: "RDBMS"
category: ""
tags:
  - "RDBMS"
description: "RDBMS"
socialImage: ""
---

# RDBMS(Relational DataBase Management System)
관계형 데이터베이스로 데이터를 서로 상호관련성을 가진 형태로 표현한 데이터를 말한다.
- 모든 데이터들은 2차원 테이블들로 표현된다.
- 각각의 테이블은 컬럼(column)과 로우(row)로 구성된다.
    - 컬럼은 행으로 테이블의 각 항목을 말한다.
    - 로우는 열로 각 항목들의 실제 값이다.
    - 각 로우는 저만의 고유 키(Primary Key)가 있다. 주로 이 primary key를 통해서 해당 로우를 찾거나 인용(reference)하게 된다.
- 각각의 테이블들은 상호관련성을 가지고 서로 연결될 수 있다.