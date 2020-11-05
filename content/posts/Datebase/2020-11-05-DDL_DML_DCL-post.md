---
title: SQL의 종류 DDL, DML, DCL
date: "2020-11-05"
template: "post"
draft: false
slug: "DDL-DML-DCL"
category: "database"
tags:
  - "DDL-DML-DCL"
description: "SQL의 종류 DDL, DML, DCL"
socialImage: ""
---

# SQL(Structured Query Language)
- SQL은 DBMS에서 사용 하는 표준언어이다. 
- C언어나 파이썬 언어와 같은 프로그래밍 언어는 절차적 언어이지만 SQL은 데이터를 다루는 집합적 언어이다. 
- SQL를 익히면 DBMS마다 약간의 기능 제공차이가 있지만 DBMS 상관 없이 db를 사용할 수 있다.
- 개발자들이 제일 많이 사용하는 것은 DML이다. 
- 개발 담당자는 DDL을 많이 사용하지 않는다. 
- 흔히 회사에서는 개발팀과 운영팀으로 나뉘어지는데 개발자들은 DML을 많이 사용하게 되고 DBMS를 운영하는 운영팀에서는 DDL을 많이 사용한다.
<p>SQL은 크게 DDL, DML, DCL로 나눠진다.</p>

## DDL(Data Definition Language)
- DDL은 데이터 정의 언어이다.
- 데이터를 정의하기 위해서 객체들을 생성, 삭제, 변경을 할 수 있다.

|   |   |   |
|---|---|---|
|CREATE|객체를 생성|`CREATE DATABASE [database name] CHARACTER SET [character set];`<br>`CREATE DATABASE test CHARACTER SET utf8mb4 COLLATE utf8mb4generalci;`|
|DROP|데이터 베이스 삭제|`DROP [database name]`|
|ALTER|테이블 수정(컬럼 추가나 속성 변경)|`ALTER TABLE [table name] ADD COLUMN [column name] [datatype]`<br>`ALTER TABLE [table name] DROP COLUMN [column name]`|
|TRUNCATE|테이블의 데이터를 삭제|`TRUNCATE TABLE [table name]`|

## DML(Data Manipulation Language)
- 데이터 조작 언어이다. 
- 데이터베이스 내의 데이터를 조작(데이터 추출, 생성, 수정, 삭제) 할 수 있다.

|   |   |   |
|---|---|---|
|SELECT|데이터 조회|`SELECT * FROM [table name]`|
|INSERT|데이터 생성|`INSERT INTO [table name] (column1, column2, column3) VALUES (value1, value2, value3)`|
|UPDATE|데이터 수정(WHERE 절을 사용하지 않을 경우는 테이블에 있는 모든 행이 수정되니 주의)|`UPDATE [table name] SET column1=1 WHERE column2=2`<br>(column2가 2인 데이터의 column1을 1로 변경하는 쿼리문|
|DELETE|데이터 삭제|`DELETE FROM [table name] WHERE column1 = value1`|
|COMMIT|트랜잭션 처리, 모든 작업을 정상적으로 처리하겠다고 확정하는 명령어|`COMMIT`|
|ROLLBACK|트랜잭션 복구|`ROLLBACK`|

## DCL(Data Control Lanaguage)
- 사용자에게 권한을 주거나 회수한다

|   |   |   |
|---|---|---|
|GRANT|권한 부여|`GRANT [권한] TO [USER];`|
|REVOKE|권한 회수|`REVOKE [권한] ON [table name] FROM [USER]`|