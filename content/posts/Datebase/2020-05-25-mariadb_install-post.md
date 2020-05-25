---
title: mysql 삭제 후 mariaDB 설치하기
date: "2020-05-25"
template: "post"
draft: false
slug: "mariaDB"
category: "database"
tags:
  - "mariaDB"
description: "mac에서 mysql 삭제 후 mariaDB 설치하기"
socialImage: ""
---

mysql 삭제하기

```vim
sudo rm -rf /usr/local/var/mysql
sudo rm -rf /usr/local/bin/mysql*
sudo rm -rf /usr/local/Cellar/mysql
```
mariaDB 설치하기

```vim
brew install mariadb
```

mariaDB 서버 키기

```vim
mysql.server start
```

mariaDB에 접속하기

```vim
mysql -u root
````

만약 Access denied 에러가 발생한다면

```vim
ERROR 1698 (28000): Access denied for user ‘root’@‘localhost’
````

아래 방법대로 하기!!

```vim
sudo mysql -u root //컴퓨터 비밀번호 입력해서 접속한 다음
use mysql;
select password(‘설정할 비밀번호‘);
alter user’root’@‘localhost’ identified by ‘비밀번호’;
```

### django 에서 runserver시 "Did you install mysqlclient?" 라고 나올 때
1. settings.py 에 아래 내용 추가

```python
import pymysql
pymysql.version_info = (1, 3, 13, "final", 0)
pymysql.install_as_MySQLdb()
```

2. pip install pymysql 설치
3. mariaDB 접속해서 database 생성<br>
create database insa character set utf8mb4 collate utf8mb4_general_ci;
4. python manage.py migrate