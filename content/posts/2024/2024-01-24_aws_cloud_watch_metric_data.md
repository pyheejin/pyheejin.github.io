---
title: Boto3로 CloudWatch에서 메트릭 데이터 가져오기
date: "2024-01-24"
template: "post"
draft: false
slug: "/posts/aws-cloud-watch-metric-data"
category: "AWS"
tags:
  - "aws"
  - "cloudwatch"
  - "metric"
  - "boto3"
description: "aws get metric data with boto3"
---


- get_metric_data() : AWS CloudWatch Metrics API를 사용하여 하나 이상의 메트릭 데이터 포인트 집합을 검색하는 함수
- MetricDataQueries : CloudWatch 메트릭 데이터를 조회하기 위한 필수 매개변수
- Id                : 이 요청을 식별하기 위한 문자열 ID
- MetricStat        : 조회할 메트릭에 대한 정보를 담은 객체
- Metric            : 조회할 메트릭에 대한 정보를 담은 객체
- Namespace         : 조회할 메트릭의 네임스페이스
- MetricName        : 조회할 메트릭의 이름
- Dimensions        : 조회할 메트릭의 디멘션 정보(옵션)
- Period            : 메트릭 데이터의 간격을 초 단위로 지정
- Stat              : 조회할 메트릭의 통계 종류를 지정(옵션 : Sum, Average, Maximum, Minimum 등)
- Unit              : 조회할 메트릭의 단위를 지정(옵션 : igabits/Second, Gigabits, Percent, Terabits, Bits, Kilobits, Megabytes/Second, Kilobytes, Megabits/Second, Terabytes, Bytes, Count, Gigabytes, Milliseconds, Count/Second, Gigabytes/Second, None, Terabytes/Second, Bytes/Second, Megabits, Kilobytes/Second, Megabytes, Microseconds, Kilobits/Second, Terabits/Second, Bits/Second, Seconds)
- ReturnData        : 조회 결과를 반환할 지 여부를 지정
- StartTime         : 메트릭 데이터를 가져올 시작 시간 지정
- EndTime           : 메트릭 데이터를 가져올 끝 시간 지정


```python
import boto3

from datetime import datetime, timedelta


def cloud_watch():
    result = []

    instance_list = [
        {
            'namespace': 'AWS/EC2',
            'dimension': 'InstanceId',
            'name': 'instance name',
            'id': 'instance id'
        },
        {
            'namespace': 'AWS/RDS',
            'dimension': 'DBInstanceIdentifier',
            'name': 'rds name',
            'id': 'rds name'
        }
    ]

    REGION_NAME = 'ap-northeast-2'

    # CloudWatch 클라이언트 생성
    session = boto3.Session(
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        region_name=REGION_NAME
    )

    cloudwatch = session.client('cloudwatch')

    now = datetime.now()
    start_time = (now - timedelta(hours=1)).isoformat() + '+09:00'
    end_time = now.isoformat()

    for instance in instance_list:
        # 메트릭 데이터 조회
        metric_data = cloudwatch.get_metric_data(
            MetricDataQueries=[
                {
                    'Id': 'm1',
                    'MetricStat': {
                        'Metric': {
                            'Namespace': instance['namespace'],
                            'MetricName': 'CPUUtilization',
                            'Dimensions': [
                                {
                                    'Name': instance['dimension'],
                                    'Value': instance['id']
                                }
                            ]
                        },
                        'Period': 300,
                        'Stat': 'Average',
                        'Unit': 'Percent'
                    },
                    'ReturnData': True
                },
            ],
            StartTime=start_time,
            EndTime=end_time
        )
        if metric_data['MetricDataResults'][0].get('Values', None) is not None:
            value = round(metric_data['MetricDataResults'][0]['Values'][0], 2)
            data = {
                'instance_id': instance['id'],
                'instance_name': instance['name'],
                'value': value
            }
            result.append(data)
    return result
```
