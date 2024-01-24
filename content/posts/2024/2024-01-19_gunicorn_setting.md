---
title: Gunicorn 설정
date: "2024-01-19"
template: "post"
draft: false
slug: "/posts/gunicorn-setting"
category: "Deploy"
tags:
  - "gunicorn"
  - "deploy"
description: "Gunicorn Setting"
---

# 설치
```commandline
pip install gunicorn
```

# Run
```commandline
gunicorn --bind 0:8000 main:app --worker-class uvicorn.workers.UvicornWorker
```

# 설정
### gunicorn

- socket
```commandline
sudo vi /etc/systemd/system/gunicorn.socket
```
```
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

- service
> <b>공식 문서에서 권장하는 worker와 thread의 개수 : 2 * $NUM_CPU + 1</b>
```commandline
sudo vi /etc/systemd/system/gunicorn.service
```
```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/[Project file path]
ExecStart=/usr/bin/gunicorn(구니콘 설치 경로) \
					--workers 1 --thread 1 \
					--worker-class uvicorn.workers.UvicornWorker \
					--bind unix:/tmp/myapi.sock \
					main:app \
					--log-config /home/ubuntu/logs/log_format.ini

[Install]
WantedBy=multi-user.target
```

- access_log, error_log
```commandline
sudo vi /home/ubuntu/logs/log_format.ini
```
```
[loggers]
keys=root

[handlers]
keys=access_logfile,error_logfile

[formatters]
keys=logfileformatter

[logger_root]
level=INFO
handlers=access_logfile

[formatter_logfileformatter]
format=[%(asctime)s] %(levelname)s [%(thread)d] - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
suffix=%Y-%m-%d.log
class=logging.Formatter

[handler_access_logfile]
class=handlers.TimedRotatingFileHandler
level=INFO
args=('/home/ubuntu/logs/gunicorn/gunicorn_access.log','midnight')
formatter=logfileformatter

[handler_error_logfile]
class=handlers.TimedRotatingFileHandler
level=WARNING
args=('/home/ubuntu/logs/gunicorn/gunicorn_error.log','midnight')
formatter=logfileformatter
```

# 실행

- 서비스 파일 변경시
```commandline
sudo systemctl daemon-reload
```

- 시스템 재 시작시 Gunicorn 자동 시작
```commandline
sudo systemctl enable gunicorn.service gunicorn.socket
```

- Gunicorn 서비스 시작
```commandline
sudo systemctl restart gunicorn.service gunicorn.socket
```

- Gunicorn 서비스 상태 확인
```commandline
sudo systemctl status gunicorn.service gunicorn.socket
```
