---
title: 우분투 시간대 한국으로 변경하기
date: "2024-01-23"
template: "post"
draft: false
slug: "/posts/ubuntu-timezone-setting"
category: "Ubuntu"
tags:
  - "ubuntu"
  - "timezone"
description: "ubuntu timezone setting"
---

### 현재 시간대 확인
```commandline
date
```
![ubuntu_timezone_utc](./media/ubuntu_timezone_utc.png)


### 로컬 시간으로 변경
```commandline
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

### 바뀐 시간대 확인
```commandline
date
```
![ubuntu_timezone_utc](./media/ubuntu_timezone_kst.png)
