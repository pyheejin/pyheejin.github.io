---
title: Ubuntu 일정한 시간마다 로그 삭제하기
date: "2024-03-26"
template: "post"
draft: false
slug: "/posts/ubuntu-delete-log"
category: "Ubuntu"
tags:
  - "ubuntu"
  - "crontab"
  - "delete-log"
description: "ubuntu delete log"
---


### 스크립트 생성
```commandline
/usr/bin/find [log 파일 경로] -type f -ctime +60 -exec rm {} \;

# 생성된 날짜 기준으로 60일 경과된 로그 삭제 스크립트
/usr/bin/find /home/ubuntu/log_file/ -type f -ctime +60 -exec rm {} \;
```
> options
>>   - -mtime : 수정된 날짜/시간 기록
>>   - -ctime : 생성된 날짜/시간 기록
>>   - -atime : 조회됐거나 실행됐을 때의 기록
>>   - -type f : 파일
>> - \+ : 생성되거나 수정된 날짜 기준
>> - \- : 현재 날짜 기준

## crontab에 로그 등록
- crontab vi로 열기
  ```commandline
  export VISUAL=vi
  ```

- crontab 등록
  ```text
     *　　　　   *　　　　    *　　　　  *　　　    *
  분(0-59)  시간(0-23)　일(1-31)　월(1-12)  요일(0-7)
  ```

  ```commandline
  crontab -e
  ```

  ```commandline
  # 매일 정각에 실행됨
  00 00 * * * /home/ubuntu/delete_log.sh
  ```

- crontab 내용 보기
  ```commandline
  crontab -l
  ```
