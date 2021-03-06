---
title: RDBMS
date: "2020-04-09"
template: "post"
draft: false
slug: "RDBMS"
category: "database"
tags:
  - "RDBMS"
description: "RDBMS, 트랜잭션, ACID"
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

### One To One
테이블 A의 로우와 테이블 B의 로우가 정확히 일대일 매칭이 되는 관계

### One To Many
테이블 A의 로우가 테이블 B의 여러 로우와 연결이 되는 관계
(각 고객은 여러 제품을 구매할 수 있지만 구매된 제품의 주인은 오직 한 고객 뿐)

### Many To Many
테이블 A의 여러 로우가 테이블 B의 여러 로우와 연결이 되는 관계
(책은 여러 작가에 의해 쓰일 수 있고 작가들은 여러 책을 쓸 수 있다)

# 왜 관계형 테이블을 쓰는가?
- 하나의 테이블에 모든 정보를 다 넣으면 동일한 정보들이 불필요하게 중복되어 저장된다.
- 더 많은 공간을 사용하게 되고, 잘못된 데이터가 저장될 가능성이 높아진다.
- 여러 테이블에 나눠서 저장한 후 필요한 테이블끼리 연결시키면 중복된 데이터를 저장하지 않음으로 공간을 더 효율적으로 사용할 수 있다.(Mormalization)

# 트랜잭션이란? ACID는 무엇인가?
## 트랜잭션
일련의 작업들이 하나의 작업처럼 취급되어서 모두 다 성공하거나 아니면 모두 다 실패하는 걸 말한다.(Commit & Rollback)
## ACID(Atomicity Consistency Isolation Durability)
원자성, 일관성, 고립성, 지속성
- 원자성(Atomicity)은 트랜잭션과 관련된 작업들이 부분적으로 실행되다가 중단되지 않는 것을 보장하는 능력이다. 예를 들어, 자금 이체는 성공할 수도 실패할 수도 있지만 보내는 쪽에서 돈을 빼 오는 작업만 성공하고 받는 쪽에 돈을 넣는 작업을 실패해서는 안된다. 원자성은 이와 같이 중간 단계까지 실행되고 실패하는 일이 없도록 하는 것이다.(all or nothing)
- 일관성(Consistency)은 트랜잭션이 실행을 성공적으로 완료하면 언제나 일관성 있는 데이터베이스 상태로 유지하는 것을 의미한다. 무결성 제약이 모든 계좌는 잔고가 있어야 한다면 이를 위반하는 트랜잭션은 중단된다.
- 고립성(Isolation)은 트랜잭션을 수행 시 다른 트랜잭션의 연산 작업이 끼어들지 못하도록 보장하는 것을 의미한다. 이것은 트랜잭션 밖에 있는 어떤 연산도 중간 단계의 데이터를 볼 수 없음을 의미한다. 은행 관리자는 이체 작업을 하는 도중에 쿼리를 실행하더라도 특정 계좌간 이체하는 양 쪽을 볼 수 없다. 공식적으로 고립성은 트랜잭션 실행내역은 연속적이어야 함을 의미한다. 성능관련 이유로 인해 이 특성은 가장 유연성 있는 제약 조건이다. 자세한 내용은 관련 문서를 참조해야 한다.
- 지속성(Durability)은 성공적으로 수행된 트랜잭션은 영원히 반영되어야 함을 의미한다. 시스템 문제, DB 일관성 체크 등을 하더라도 유지되어야 함을 의미한다. 전형적으로 모든 트랜잭션은 로그로 남고 시스템 장애 발생 전 상태로 되돌릴 수 있다. 트랜잭션은 로그에 모든 것이 저장된 후에만 commit 상태로 간주될 수 있다.

# 관계형 데이터베이스 와 비관계형 데이터베이스의 차이는?
### 관계형 데이터베이스(SQL(RDBMS))
정형화된 데이터들, 데이터의 완전성이 중요한 데이터들을 저장하는데 유리(전자상거래 정보, 은행 계좌 정보 등)
- 장점
  - 데이터를 더 효율적, 체계적으로 저장 및 관리할 수 있다.
  - 미리 저장하는 데이터들의 구조를 정의함으로 데이터의 완전성이 보장된다.
  - 트랜잭션 가능
- 단점
  - 테이블을 미리 정의해야 해서 테이블 구조 변화에 덜 유연하다.
  - 확장이 어렵다.

### 비 관계형 데이터 베이스(NoSQL)
비 정형화된 데이터들, 완전성이 상대적으로 덜 유리한 데이터를 저장하는데 유리(로그 데이타)
- 장점
  - 테이블을 미리 정의하지 않아도 되어서 데이터의 구조 변화에 유연하다.
  - 확장이 쉽다.(서버의 수를 늘리면 됨-scale out)
  - 방대한 양의 데이터를 저장하는데 유리
- 단점
  - 데이터의 완전성이 덜 보장된다.
  - 트랜잭션이 안되거나 불안정하다.