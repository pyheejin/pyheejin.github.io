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