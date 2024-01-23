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
sudo apt-get install nginx
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
sudo vi /etc/nginx/conf.d/server.conf
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

        access_log /home/ubuntu/logs/nginx/nginx_access.log;
        error_log  /home/ubuntu/logs/nginx/nginx_error.log;

        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```
