---
title: 파이썬 로그 남기기
date: "2024-01-23"
template: "post"
draft: false
slug: "/posts/python-logger"
category: "Python"
tags:
  - "python"
  - "logger"
description: "python logger"
---


```python
import os
import logging.handlers


def custom_log(dir):
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        UPLOAD_DIR = f'{BASE_DIR}/log/{dir}/'

        if not os.path.exists(UPLOAD_DIR):
            os.makedirs(UPLOAD_DIR, exist_ok=True)

        filename = f'{UPLOAD_DIR}/{dir}_'

        # logger 설정
        logger = logging.getLogger(filename)
        logger.setLevel(logging.INFO)

        # 포맷 설정
        formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(message)s')
        # 2023-05-22 13:25:47 [INFO] message
        formatter.datefmt = '%Y-%m-%d %H:%M:%S'

        # 핸들러 설정(오전 12시에 저장됨)
        handler = logging.handlers.TimedRotatingFileHandler(filename=filename,
                                                            when='midnight',
                                                            interval=1,
                                                            encoding='utf-8')
        handler.setFormatter(formatter)
        handler.suffix = '%Y-%m-%d.log'

        # logger instance에 handler 설정
        logger.addHandler(handler)
        return logger
    except Exception as e:
        print(f'Exception : {e}')
```
