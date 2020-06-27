---
title: Deploying-with-Docker
date: "2020-06-28"
template: "post"
draft: false
slug: "Deploying-with-Docker"
category: "django"
tags:
  - "Deploying-with-Docker"
description: "Docker로 배포하기"
socialImage: ""
---

## 설치
- mac & window
[docker download link](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
클라이언트 다운로드 및 설치
<br>

- ubuntu

```vim
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
```

### 명령어
- 실행중인 컨테이너를 보여주는 커맨드

    ```vim
    docker ps
    ```

- 실행이 종료된 것을 포함해서 모든 컨테이너를 보는 커맨드 및 옵션

    ```vim
    docker ps -a
    ```

- 컨테이너 종료

    ```vim
    docker stop [컨테이너 명]
    ```

- 컨테이너 삭제(컨테이너를 종료해야 삭제할 수 있다.)

    ```vim
    docker rm [컨테이너 명]
    ```

- 생성된 혹은 다운로드 된 이미지를 보여주는 커맨드

    ```vim
    docker images
    ```

- 모든 이미지를 보여주는 커맨드 및 옵션

    ```vim
    docker images -a
    ```

- 도커 로그인

    ```vim
    docker login
    ```

- 도커 저장소에 이미지 푸시

    ```vim
    docker push 'docker 계정명'/'이미지명':0.1(버전)
    ```

# 배포
### Dockerfile 생성
```python
#./Dockerfile
FROM python:3
#기반이 될 이미지

# 작업디렉토리(default)설정
WORKDIR /usr/src/app

## Install packages
#현재 패키지 설치 정보를 도커 이미지에 복사
COPY requirements.txt ./
#설치정보를 읽어 들여서 패키지를 설치
RUN pip install -r requirements.txt

## Copy all src files
#현재경로에 존재하는 모든 소스파일을 이미지에 복사
COPY . .


## Run the application on the port 8080
#8000번 포트를 외부에 개방하도록 설정
EXPOSE 8000


#CMD ["python", "./setup.py", "runserver", "--host=0.0.0.0", "-p 8080"]
#gunicorn을 사용해서 서버를 실행
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "[project name].wsgi:application"]
```

### 이미지 빌드 & 실행
- 빌드

```vim
docker build -t 'docker 계정명'/'이미지명':'0.1(버전)' .
```
- 실행(run 후 httpie 또는 postman으로 연결이 잘 되었는지 테스트)

```vim
// -d'데몬으로 실행하기 위한 옵션' 
// -p '호스트 포트':'컨테이너 포트'
docker run --name '컨테이너 명' -d -p 8000:8000 'docker 계정명'/'이미지명':'0.1(버전)'
```

### 도커 로그인

```vim
docker login
```

### 도커 저장소에 이미지 푸시
```vim
docker push 'docker 계정명'/'이미지명':'0.1(버전)'
```

# 전체 과정
```vim
(insa) ➜  insa git:(master) ✗ vi Dockerfile
(insa) ➜  insa git:(master) ✗ docker build -t 'heejin1228'/'wanted':'0.1' .
Sending build context to Docker daemon  32.01MB
Step 1/7 : FROM python:3
 ---> 659f826fabf4
Step 2/7 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 8f30bb559f11
Step 3/7 : COPY requirements.txt ./
 ---> 20ae2381792b
Step 4/7 : RUN pip install -r requirements.txt
 ---> Running in 07be5ed02ee2
Collecting asgiref==3.2.7
  Downloading asgiref-3.2.7-py2.py3-none-any.whl (19 kB)
Collecting bcrypt==3.1.7
  Downloading bcrypt-3.1.7-cp34-abi3-manylinux1_x86_64.whl (56 kB)
Collecting certifi==2020.4.5.1
  Downloading certifi-2020.4.5.1-py2.py3-none-any.whl (157 kB)
Collecting cffi==1.14.0
  Downloading cffi-1.14.0-cp38-cp38-manylinux1_x86_64.whl (409 kB)
Collecting chardet==3.0.4
  Downloading chardet-3.0.4-py2.py3-none-any.whl (133 kB)
Collecting Django==3.0.6
  Downloading Django-3.0.6-py3-none-any.whl (7.5 MB)
Collecting django-cors-headers==3.3.0
  Downloading django_cors_headers-3.3.0-py3-none-any.whl (14 kB)
Collecting django-ipware==2.1.0
  Downloading django-ipware-2.1.0.tar.gz (10 kB)
Collecting django-partial-date==1.3.1
  Downloading django_partial_date-1.3.1-py3-none-any.whl (5.5 kB)
Collecting iamporter==0.2.3
  Downloading iamporter-0.2.3-py3-none-any.whl (11 kB)
Collecting idna==2.8
  Downloading idna-2.8-py2.py3-none-any.whl (58 kB)
Collecting mariadb==0.9.58
  Downloading mariadb-0.9.58.tar.gz (79 kB)
Collecting MonthDelta==0.9.1
  Downloading MonthDelta-0.9.1.tar.gz (2.5 kB)
Collecting mysqlclient==1.4.6
  Downloading mysqlclient-1.4.6.tar.gz (85 kB)
Collecting pycparser==2.20
  Downloading pycparser-2.20-py2.py3-none-any.whl (112 kB)
Collecting PyJWT==1.7.1
  Downloading PyJWT-1.7.1-py2.py3-none-any.whl (18 kB)
Collecting PyMySQL==0.9.3
  Downloading PyMySQL-0.9.3-py2.py3-none-any.whl (47 kB)
Collecting pytz==2020.1
  Downloading pytz-2020.1-py2.py3-none-any.whl (510 kB)
Collecting requests==2.21.0
  Downloading requests-2.21.0-py2.py3-none-any.whl (57 kB)
Collecting six==1.15.0
  Downloading six-1.15.0-py2.py3-none-any.whl (10 kB)
Collecting sqlparse==0.3.1
  Downloading sqlparse-0.3.1-py2.py3-none-any.whl (40 kB)
Collecting urllib3==1.24.3
  Downloading urllib3-1.24.3-py2.py3-none-any.whl (118 kB)
Collecting django-celery==3.3.1
  Downloading django_celery-3.3.1-py3-none-any.whl (63 kB)
Collecting iamport-rest-client==0.8.1
  Downloading iamport_rest_client-0.8.1-py2.py3-none-any.whl (10 kB)
Collecting celery<4.0,>=3.1.15
  Downloading celery-3.1.26.post2-py2.py3-none-any.whl (526 kB)
Collecting billiard<3.4,>=3.3.0.23
  Downloading billiard-3.3.0.23.tar.gz (151 kB)
Collecting kombu<3.1,>=3.0.37
  Downloading kombu-3.0.37-py2.py3-none-any.whl (240 kB)
Collecting amqp<2.0,>=1.4.9
  Downloading amqp-1.4.9-py2.py3-none-any.whl (51 kB)
Collecting anyjson>=0.3.3
  Downloading anyjson-0.3.3.tar.gz (8.3 kB)
Building wheels for collected packages: django-ipware, mariadb, MonthDelta, mysqlclient, billiard, anyjson
  Building wheel for django-ipware (setup.py): started
  Building wheel for django-ipware (setup.py): finished with status 'done'
  Created wheel for django-ipware: filename=django_ipware-2.1.0-py3-none-any.whl size=11674 sha256=af43369bc773cae1bcfe5aaf2c8f83014f6d92197fd3390f424b93c066762ec2
  Stored in directory: /root/.cache/pip/wheels/0a/d2/a4/389b801a45c3dd5f33759bc4b9a8c56a3343797bfbc7b3771a
  Building wheel for mariadb (setup.py): started
  Building wheel for mariadb (setup.py): finished with status 'done'
  Created wheel for mariadb: filename=mariadb-0.9.58-cp38-cp38-linux_x86_64.whl size=223350 sha256=cbe339735a696419739c0497a581c446a1f5bb1a5e39ee92be9254afd2c29fd2
  Stored in directory: /root/.cache/pip/wheels/51/14/12/3829d9293c804b3d08b0bca843e66f04dcd2d1b443e3a8e245
  Building wheel for MonthDelta (setup.py): started
  Building wheel for MonthDelta (setup.py): finished with status 'done'
  Created wheel for MonthDelta: filename=MonthDelta-0.9.1-py3-none-any.whl size=3108 sha256=0e9cf0acbb8b3d688e77f9778fded405969afe2cb778b2a7e46c776db00f2f7c
  Stored in directory: /root/.cache/pip/wheels/28/83/73/9df1c01bb209f71aa0971ff777e9c0a3d7d2e0887bc64565df
  Building wheel for mysqlclient (setup.py): started
  Building wheel for mysqlclient (setup.py): finished with status 'done'
  Created wheel for mysqlclient: filename=mysqlclient-1.4.6-cp38-cp38-linux_x86_64.whl size=116043 sha256=c64f942f4595feb44bd7a8d9889a49a583d4e3e9a0b037998ff6df0a5d9def91
  Stored in directory: /root/.cache/pip/wheels/8a/3c/e6/347e293dbcd62352ee2806f68d624aae821bca7efe0070c963
  Building wheel for billiard (setup.py): started
  Building wheel for billiard (setup.py): finished with status 'done'
  Created wheel for billiard: filename=billiard-3.3.0.23-py3-none-any.whl size=85763 sha256=fcbbe4dd26fb383aad33bf68119b8bcd3f6217f007fac147ed32f5aae2c91545
  Stored in directory: /root/.cache/pip/wheels/75/ba/d4/1503855a78b96501be42a5fc87b25d7e56272c7e9e830cc854
  Building wheel for anyjson (setup.py): started
  Building wheel for anyjson (setup.py): finished with status 'done'
  Created wheel for anyjson: filename=anyjson-0.3.3-py3-none-any.whl size=4963 sha256=4f6511a38ccb77e765c4b2f9e1c3b5167f9ad4c72ba039dd99cbdd79e6d6f8a6
  Stored in directory: /root/.cache/pip/wheels/92/e6/48/d652e8a313ee068de7ea4aba2cb03348ae549f99dc706ee3cc
Successfully built django-ipware mariadb MonthDelta mysqlclient billiard anyjson
Installing collected packages: asgiref, pycparser, cffi, six, bcrypt, certifi, chardet, sqlparse, pytz, Django, django-cors-headers, django-ipware, django-partial-date, idna, urllib3, requests, iamporter, mariadb, MonthDelta, mysqlclient, PyJWT, PyMySQL, billiard, amqp, anyjson, kombu, celery, django-celery, iamport-rest-client
Successfully installed Django-3.0.6 MonthDelta-0.9.1 PyJWT-1.7.1 PyMySQL-0.9.3 amqp-1.4.9 anyjson-0.3.3 asgiref-3.2.7 bcrypt-3.1.7 billiard-3.3.0.23 celery-3.1.26.post2 certifi-2020.4.5.1 cffi-1.14.0 chardet-3.0.4 django-celery-3.3.1 django-cors-headers-3.3.0 django-ipware-2.1.0 django-partial-date-1.3.1 iamport-rest-client-0.8.1 iamporter-0.2.3 idna-2.8 kombu-3.0.37 mariadb-0.9.58 mysqlclient-1.4.6 pycparser-2.20 pytz-2020.1 requests-2.21.0 six-1.15.0 sqlparse-0.3.1 urllib3-1.24.3
Removing intermediate container 07be5ed02ee2
 ---> 710eac195db2
Step 5/7 : COPY . .
 ---> be1915695c38
Step 6/7 : EXPOSE 8000
 ---> Running in 72f029668b9f
Removing intermediate container 72f029668b9f
 ---> 7b8b7a2ea0f2
Step 7/7 : CMD ["gunicorn", "--bind", "0.0.0.0:8000", "insa.wsgi:application"]
 ---> Running in 38d96f233b65
Removing intermediate container 38d96f233b65
 ---> 9178bcfd8185
Successfully built 9178bcfd8185
Successfully tagged heejin1228/wanted:0.1

(insa) ➜  insa git:(master) ✗ docker run --name wanted -d -p 8000:8000 heejin1228/wanted:0.1
109b83573936f7d3e9d0a37584535d91769cf207124a3be5ad360c7fa750bd60
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"gunicorn\": executable file not found in $PATH": unknown.

(insa) ➜  insa git:(master) ✗ docker ps -a
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                    NAMES
109b83573936        heejin1228/wanted:0.1   "gunicorn --bind 0.0…"   8 seconds ago       Created             0.0.0.0:8000->8000/tcp   wanted

(insa) ➜  insa git:(master) ✗ docker login
Authenticating with existing credentials...
Login Succeeded

(insa) ➜  insa git:(master) ✗ docker push heejin1228/wanted:0.1
The push refers to repository [docker.io/heejin1228/wanted]
2aada39d07b6: Pushed
8c60567c22fa: Pushed
b0d57c21e0c1: Pushed
bd4f1ae65919: Pushed
5bf497fc7ae4: Mounted from library/python
079e0a70bca0: Mounted from library/python
569e5571a3eb: Mounted from library/python
697765a85531: Mounted from library/python
8c39f7b1a31a: Mounted from library/python
88cfc2fcd059: Mounted from library/python
760e8d95cf58: Mounted from library/python
7cc1c2d7e744: Mounted from library/python
8c02234b8605: Mounted from library/python
0.1: digest: sha256:fc1c24ceaec0d1b1ccf18670fecba628846033b91c642632850ace7b8ba14baa size: 3054

(insa) ➜  insa git:(master) ✗ docker ps -a
CONTAINER ID        IMAGE                   COMMAND                  CREATED              STATUS              PORTS                    NAMES
109b83573936        heejin1228/wanted:0.1   "gunicorn --bind 0.0…"   About a minute ago   Created             0.0.0.0:8000->8000/tcp   wanted
(insa) ➜  insa git:(master) ✗
```