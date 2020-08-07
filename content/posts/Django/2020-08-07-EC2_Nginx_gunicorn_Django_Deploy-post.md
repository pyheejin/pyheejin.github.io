---
title: Deploying with EC2, Nginx, Gunicorn, Django
date: "2020-08-07"
template: "post"
draft: false
slug: "Deploying-with-EC2-Nginx-Gunicorn-Django"
category: "django"
tags:
  - "Deploying-with-EC2-Nginx-Gunicorn-Django"
description: "EC2, Nginx, Gunicorn, Django로 배포하기"
socialImage: ""
---

# Installing the Packages from the Ubuntu Repositories(우분투 셋팅)

```vim
sudo apt update
sudo apt install python3-pip python3-dev libpq-dev nginx libmysqlclient-dev
```

# Creating a Python Virtual Environment for your Project(가상환경 생성)

```vim
sudo -H pip3 install --upgrade pip
sudo -H pip3 install virtualenv
virtualenv [가상환경 이름]             # 생성
source [가상환경 이름]/bin/activate    # 활성화
pip install django gunicorn        # gunicorn 설치
```

# Creating and Configuring a New Django Project(Django 프로젝트 생성 및 구성)

```vim
git clone [github 주소]
```

### ALLOWED_HOSTS 설정

```vim
ALLOWED_HOSTS = ['your_server_domain_or_IP', 'second_domain_or_IP', 'localhost']
```

### migrate

```vim
python manage.py migrate
```

### 8000 port 허용

```vim
sudo ufw allow 8000
```

### 앱이 나오는지 확인
- http://server_domain_or_IP:8000

# Gunicorn

```vim
gunicorn --bind 0.0.0.0:8000 myproject.wsgi
```

# 가상환경 비활성화

```vim
deactivate
```

# Creating systemd Socket and Service Files for Gunicorn(Gunicorn 용 systemd 소켓 및 서비스 파일 만들기)

### gunicorn.socket
- 내부 [Unit]에서 소켓을 설명하는 [Socket]섹션, 소켓 위치를 정의하는 [Install]섹션, 소켓이 적시에 생성되었는지 확인 하는 섹션을 생성
- sudo 권한이 있는 Gunicorn용 시스템 소켓 파일을 만들고 여는 것으로 시작

```vim
sudo vi /etc/systemd/system/gunicorn.socket
```

```vim
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

### gunicorn.service
- sudo 텍스트 편집기에서 권한이 있는 Gunicorn에 대한 systemd 서비스 파일 생성 
- 서비스 파일 이름은 확장자를 제외하고 소켓 파일 이름과 일치해야 함
- 서비스는 소켓 파일의 소켓에 의존하기 때문에 Requires해당 관계를 나타내는 지시문을 포함해야 함

```vim
sudo vi /etc/systemd/system/gunicorn.service
```

```vim
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/myprojectdir
ExecStart=/home/ubuntu/myprojectdir/myprojectenv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          myproject.wsgi:application

[Install]
WantedBy=multi-user.target
```
### socket 시작 및 활성화, 상태 확인(Active: active (running))

```vim
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
```

```terminal
$ sudo systemctl status gunicorn.socket
Failed to dump process list, ignoring: No such file or directory
● gunicorn.socket - gunicorn socket
   Loaded: loaded (/etc/systemd/system/gunicorn.socket; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-08-07 08:00:53 UTC; 1h 23min ago
   Listen: /run/gunicorn.sock (Stream)
   CGroup: /system.slice/gunicorn.socket

Aug 07 08:00:53 ip-172-31-36-173 systemd[1]: Closed gunicorn socket.
Aug 07 08:00:53 ip-172-31-36-173 systemd[1]: Stopping gunicorn socket.
Aug 07 08:00:53 ip-172-31-36-173 systemd[1]: Listening on gunicorn socket.
```

### gunicorn, gunicorn.socket 로그 보기

```vim
sudo journalctl -u gunicorn
sudo journalctl -u gunicorn.socket
```

### Gunicorn 프로세스 재시작

```vim
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

# Configure Nginx to Proxy Pass to Gunicorn(Gunicorn에 프록시 패스로 Nginx 구성)

### sites-available

```vim
sudo vi /etc/nginx/sites-available/myproject
```

```vim
server {
    listen 80;
    server_name server_domain_or_IP;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/ubuntu/myprojectdir;
    }
    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

```vim
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled
```

### sites-enabled 에 default 제거

```vim
sudo rm /etc/nginx/sites-enabled/default
```

### nginx 재시작

```vim
sudo nginx -t && sudo systemctl restart nginx
```

### nginx 에러 로그 보기

```vim
sudo tail -F /var/log/nginx/error.log
```

# 위에서 허용했던 8000 port 제거 & 포트 80의 일반 트래픽에 방화벽을 열기

```vim
sudo ufw delete allow 8000
sudo ufw allow 'Nginx Full'
```