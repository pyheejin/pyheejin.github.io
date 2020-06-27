---
title: Deploying-with-AWS-EC2
date: "2020-06-27"
template: "post"
draft: false
slug: "Deploying-with-AWS-EC2"
category: "django"
tags:
  - "Deploying-with-AWS-EC2"
description: "AWS EC2로 배포하기"
socialImage: ""
---

## EC2 서버 생성하기
1. 서비스 > EC2
![ec2](../../../static/EC2/ec2_1.png)
<br>

2. 인스턴스 시작
![ec2](../../../static/EC2/ec2_2.png)
<br>

3. Ubuntu Server 18.04 LTS (HVM), SSD Volume Type 64비트 선택
![ec2](../../../static/EC2/ec2_3.png)
<br>

4. t2.micro 선택
![ec2](../../../static/EC2/ec2_4.png)
<br>

5. 서브넷 선택, 종료방식(중지, 종료-완전삭제)
![ec2](../../../static/EC2/ec2_5.png)
<br>

6. 계정명, 프로젝트 이름으로 태그 추가
![ec2](../../../static/EC2/ec2_6.png)
<br>

7. 8000포트 허용
![ec2](../../../static/EC2/ec2_7.png)
<br>

8. 새 키페어 생성(다시 볼 수 없으므로 다운로드해서 저장해둬야 한다.)
![ec2](../../../static/EC2/ec2_8.png)
<br>

    ![ec2](../../../static/EC2/ec2_9.png)
<br>

9. 다운받은 키페어의 권한 변경 후 ssh 로 터미널에서 인스턴스 접속

    ```vim
    // 권한 변경
    chmod 400 wanted.pem

    // 인스턴스 접속(ip는 실행중인 인스턴스에서 'IPv4 퍼블릭 IP 13.124.188.99')
    ssh -i wanted.pem ubuntu@13.124.188.99
    ```
    ![ec2](../../../static/EC2/ec2_10.png)

## RDS 생성

![rds](../../../static/RDS/rds_1.png)
<br>

![rds](../../../static/RDS/rds_2.png)
<br>

![rds](../../../static/RDS/rds_3.png)
<br>

![rds](../../../static/RDS/rds_4.png)
<br>

![rds](../../../static/RDS/rds_5.png)
<br>

![rds](../../../static/RDS/rds_6.png)
<br>

![rds](../../../static/RDS/rds_7.png)
<br>

![rds](../../../static/RDS/rds_8.png)
<br>

![rds](../../../static/RDS/rds_9.png)
<br>

![rds](../../../static/RDS/rds_10.png)
<br>

![rds](../../../static/RDS/rds_11.png)
<br>

![rds](../../../static/RDS/rds_12.png)
<br>

![rds](../../../static/RDS/rds_13.png)
<br>

![rds](../../../static/RDS/rds_14.png)
<br>

![rds](../../../static/RDS/rds_15.png)
<br>

![rds](../../../static/RDS/rds_16.png)
<br>

![rds](../../../static/RDS/rds_17.png)
<br>

![rds](../../../static/RDS/rds_18.png)
<br>

엔드포인트로 접속

```vim
mysql -h [엔드포인트 : wanted.cubp7i1omocs.ap-northeast-2.rds.amazonaws.com] -u [DB 인스턴스 식별자 : root] -p
```
![rds](../../../static/RDS/rds_19.png)
<br>

로컬 DB에서 dump 뜨기

```vim
mysqldump -u root -p [현재 DB명 : insa] > [dump 뜰 파일 이름 : wanted.sql]
```
![rds](../../../static/RDS/rds_20.png)
<br>

RDS로 데이터 넣기

```vim
mysql -h [엔드포인트 : wanted.cubp7i1omocs.ap-northeast-2.rds.amazonaws.com] -u pyheejin -p [RDS에서 만든 DB명 : wanted] < [dump뜰 때 만든 파일 :wanted.sql]
```
![rds](../../../static/RDS/rds_21.png)
<br>

테이블이 잘 만들어졌는지 확인
![rds](../../../static/RDS/rds_22.png)
<br>

데이터가 잘 들어갔는지 확인
![rds](../../../static/RDS/rds_23.png)
<br>