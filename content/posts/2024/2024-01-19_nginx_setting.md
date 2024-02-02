---
title: Nginx 설정
date: "2024-01-19"
template: "post"
draft: false
slug: "/posts/nginx-setting"
category: "Deploy"
tags:
  - "nginx"
  - "deploy"
description: "Nginx Setting"
---

# 설치
```commandline
sudo apt-get update
```
```commandline
sudo apt install nginx
```

# 설정
```commandline
sudo vi /etc/nginx/sites-available/nginx.conf
```
```
server {
    listen 80;
    server_name [Public IP주소 or 도메인];

    charset utf-8;
    client_max_body_size 100M;

    location / {
        real_ip_header X-Forwarded-For;
        set_real_ip_from 0.0.0.0/0;

        log_format custom '[$time_local] $remote_addr - [$status] "$request_time" - "$request"';
        access_log /home/ubuntu/logs/nginx-access/access.log custom;
        error_log  /home/ubuntu/logs/nginx-error/error.log;

        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

# nginx 문법 오류 확인
```commandline
sudo nginx -t
```
```commandline
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

# 심볼릭 링크 설정
에러나면 -f 옵션을 붙여서 실행
```commandline
sudo ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
```

# 실행
- nginx 서비스 재시작
```commandline
sudo systemctl restart nginx.service
```

- nginx 서비스 상태 확인
```commandline
sudo systemctl status nginx.service
```

# SSL(HTTPS) 적용
1. 도메인 인증서, 체인 인증서, 루트 인증서 파일 합치기
```commandline
cat [도메인 인증서] [체인 인증서] [루트 인증서] > [새로운 파일명.pem]
```
2. 개인 키 암호 해제
> (----BEGIN RSA PRIVATE KEY---— 로 되어있으면 ----BEGIN PRIVATE KEY---—로 암호 해제를 해줘야 함)
```commandline
openssl rsa -in [개인키 파일] -out public.pem
```
3. nginx 설정
```commandline
sudo vi /etc/nginx/sites-available/nginx.conf
```
```commandline
server {
    listen 80;
    server_name 도메인;

    charset utf-8;
    client_max_body_size 100M;

    location / {
        real_ip_header X-Forwarded-For;
        set_real_ip_from 0.0.0.0/0;

        access_log /home/ubuntu/logs/nginx/nginx_access.log;
        error_log  /home/ubuntu/logs/nginx/nginx_error.log;

        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
    # http로 접근했을 때 https로 리다이렉트
    return 301 https://$host$request_uri;
}

# 블록 추가
server {
    listen 443 ssl;
    server_name 도메인;

    ssl_certificate [도메인 인증서, 체인 인증서, 루트 인증서 합친 파일의 경로];
    ssl_certificate_key [암호 해제한 개인 키 파일 경로];

    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;
    ssl_ciphers HIGH:!aNULL:!MD5;

    charset utf-8;
    client_max_body_size 100M;

    location / {
        real_ip_header X-Forwarded-For;
        set_real_ip_from 0.0.0.0/0;

        log_format custom '[$time_local] $remote_addr - [$status] "$request_time" - "$request"';
        access_log /home/ubuntu/logs/nginx-access/access.log custom;
        error_log  /home/ubuntu/logs/nginx-error/error.log;

        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

<hr>

```commandline
sudo vi /etc/nginx/nginx.conf
```
```
user root;
worker_processes auto;
pid /var/run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format custom '[$time_local] $remote_addr - [$status] "$request_time" - "$request"';
    access_log /home/ubuntu/logs/nginx-access/access.log custom;
    error_log  /home/ubuntu/logs/nginx-error/error.log;

    include /etc/nginx/mime.types;
    include /etc/nginx/conf.d/*.conf;  // server파일 분리해서 가져옴
}
```

```commandline
sudo vi /etc/nginx/sites-available/nginx.conf
```
```
server {
    listen 80;
    server_name [Public IP주소 or 도메인];

    charset utf-8;
    client_max_body_size 100M;

    location / {
        real_ip_header X-Forwarded-For;
        set_real_ip_from 0.0.0.0/0;

        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```
### 심볼릭 링크 설정
에러나면 -f 옵션을 붙여서 실행
```commandline
sudo ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
```
