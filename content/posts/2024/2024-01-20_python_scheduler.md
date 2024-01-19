---
title: 파이썬 스케줄러
date: "2024-01-20"
template: "post"
draft: false
slug: "/posts/python-scheduler"
category: "Python"
tags:
  - "python"
  - "scheduler"
  - "apscheduler"
description: "python scheduler"
---

# 설치
```commandline
pip install apscheduler
```

# 스케줄러 선언
```python
from apscheduler.schedulers.background import BackgroundScheduler


# 스케줄러 선언
schedule = BackgroundScheduler(
    timezone='Asia/Seoul',
    daemon=True,
    job_defaults={
        'max_instances': 8,
        'misfire_grace_time': None
    }
)
```

# 예제 1
데코레이터
```python
# 함수에 적용
@schedule.scheduled_job('cron', second='*/30')  # 30초마다 실행
def scheduler():
    print('scheduler start')
    # do something...

# 스케줄러 시작
schedule.start()
```

# 예제 2
```python
def scheduler():
    print('scheduler start')
    # do something...


# 함수에 적용
scheduler.add_job(scheduler, 'interval', seconds=15, id='scheduler_job')

# 스케줄러 시작
schedule.start()
```

- 시간 지정
    - 매일 오전 7시 : `@schedule.scheduled_job('cron', hour='07', minute='00')`
    - 매월 1일 16시 : `@schedule.scheduled_job('cron', day='1', hour='16')`
- 초 단위
    - 30초 : `@schedule.scheduled_job('interval', second=30)`
    - 30초 : `@schedule.scheduled_job('cron', second='*/30')`
- 분 단위 : `@schedule.scheduled_job('interval',``minutes=30)`
- 인자 넘기기 : 인자가 1개여도 리스트 안에 담아서 넘겨야 함
    - `@schedule.scheduled_job('cron', second='*/30', args=[100])`
- id 지정 : `@schedule.scheduled_job('cron', second='*/30', id='id')`
