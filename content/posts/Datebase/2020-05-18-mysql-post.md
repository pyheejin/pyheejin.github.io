---
title: MySQL 명령어
date: "2020-05-18"
template: "post"
draft: false
slug: "mysql"
category: "database"
tags:
  - "mysql"
description: "MySQL 명령어 정리"
socialImage: ""
---


1. DDL(Data Define Language)
CREATE / ALTER / DROP

1) 데이터 베이스 생성 구문
CREATE DATABASE [database name] CHARACTER SET [character set];
CREATE DATABASE mysql_test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

2) 테이블 작성/변경/삭제 Syntax
CREATE TABLE [table] (column1, column2 …)
ALTER TABLE [table] ADD [column] [datatype]
DROP TABLE [table];

2. DML(Data Manipulation Language)
INSERT / DELETE / UPDATE

- Syntax
INSERT INTO [table] VALUES (value1, value2, value3…)
SELECT * FROM [table];
DELETE FROM [table] WHERE [condition]
UPDATE [table] SET [column]=[value] WHERE [condition]
