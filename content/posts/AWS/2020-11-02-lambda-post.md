---
title: AWS Lambda Python
date: "2020-11-02"
template: "post"
draft: false
slug: "aws-lambda-python"
category: "django"
tags:
  - "aws-lambda-python"
description: ""
socialImage: ""
---

## lambda 함수로 만들 코드 작성하기
- 유저 상태 변경하는 코드

```python
import json
import sys
import os
import logging
import rds_config
import pymysql
from botocore.vendored import requests
from datetime import datetime, timedelta, date


rds_host  = ""
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name


logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, port=8000, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

def lambda_handler(event, context):
    uid= ""
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" %event["uid"])
        
        for e in cur:
            uid = e[0]
            withdraw = e[1]
            exchange = e[2]
            mining_withdraw = e[3]
        
        # 내/외부 거래 변경
        if event["type"] == "is_withdraw":
            if withdraw == "Y":
                cur.execute("UPDATE db.table as u SET is_withdraw='%s' WHERE u.user_id='%s'" % ("N", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
            else:
                cur.execute("UPDATE db.table as u SET is_withdraw='%s' WHERE u.user_id='%s'" % ("Y", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
                
                
        # 교환가능 변경
        elif event["type"] == "is_exchange":
            if exchange == "Y":
                cur.execute("UPDATE db.table as u SET is_exchange='%s' WHERE u.user_id='%s'" % ("N", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
            else:
                cur.execute("UPDATE db.table as u SET is_exchange='%s' WHERE u.user_id='%s'" % ("Y", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
                
        # 채굴이자 지급 변경
        elif event["type"] == "is_mining_withdraw":
            if mining_withdraw == "Y":
                cur.execute("UPDATE db.table as u SET is_mining_withdraw='%s' WHERE u.user_id='%s'" % ("N", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
            else:
                cur.execute("UPDATE db.table as u SET is_mining_withdraw='%s' WHERE u.user_id='%s'" % ("Y", event["uid"]))
                # 재호출
                cur.execute("SELECT * FROM db.table as u WHERE u.user_id='%s'" % event["uid"])
                for e in cur:
                    is_withdraw = e[1]
                    is_exchange = e[2]
                    is_mining_withdraw = e[3]
                
        # 메모작성
        cur.execute("SELECT f.memo FROM db.table as f WHERE f.user_id='%s'" % uid)
        for ei in cur:
            print(type(ei[0]))
            # 메모 있음
            if ei[0]  or str(ei[0]) != "None": 
                m = ei[0] + " | " + date.today().strftime("%Y.%m.%d") + "-"
                
            # 메모 없음
            else:
                m = date.today().strftime("%Y.%m.%d") + "-"
        
        if event["type"] == "is_withdraw":
            if withdraw == "Y":
                m += "내/외부 거래 가능 여부 : " + withdraw + " > N "
            elif withdraw == "N":
                m += "내/외부 거래 가능 여부 : " + withdraw + " > Y "
            
        elif event["type"] == "is_exchange":
            if exchange == "Y":
                m += "교환 가능 여부 : " + exchange + " > N "
            elif exchange == "N":
                m += "교환 가능 여부 : " + exchange + " > Y "
            
        elif event["type"] == "is_mining_withdraw":
            if mining_withdraw == "Y":
                m += "채굴이자 지급 가능 여부 : " + mining_withdraw + " > N "
            elif mining_withdraw == "N":
                m += "채굴이자 지급 가능 여부 : " + mining_withdraw + " > Y "
        
        # 메모 추가
        cur.execute("UPDATE kok_platform_db.users_flag as f SET memo='%s' WHERE f.user_id='%s'" % (m, uid))
        
    try:
        conn.commit()
        logger.info("SUCCESS: Commit MySQL")
    except Exception as e:
        logger.error("ERROR: " + str(e))

    return {'statusCode': 200, 'body': json.dumps({"msg": "ok"})}
```

## 트리거 추가 -> API 게이트웨이
- 메서드 or 리소스생성 및 요청 헤더나 쿼리 문자열 파라미터 설정
- 작업 -> API 배포 -> 배포 스테이지 선택 -> 배포