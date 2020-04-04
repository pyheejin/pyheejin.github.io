---
title: position
date: "2020-03-23"
template: "post"
draft: false
slug: "css-position"
category: "htmlcss"
tags:
  - "css"
  - "position"
description: "css position"
socialImage: ""
---

## position
1. static(기본값)

2. relative
브라우저 창을 기준으로 위치 조정

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>position</title>

        <style>
            .relative1 {
                border: 1px solid black;
                position: relative;
            }

            .relative2 {
                border: 1px solid red;
                position: relative;
                top: 20px;
                left: 20px;
            }
        </style>
    </head>

    <body>
        <div class="relative1">relative1</div>
        <div>
            <div class="relative2">relative2</div>
        </div>
    </body>
</html>
```

![relative](../../assets/images/relrative.png)

3. absolute
부모 태그를 기준으로 위치 조정

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>position</title>

        <style>
            .absolute1 {
                border: 1px solid black;
                position: relative;
                width: 200px;
                height: 200px;
            }

            .absolute2 {
                border: 1px solid red;
                position: absolute;
                top: 20px;
                right: 20px;
            }
        </style>
    </head>

    <body>
        <div class="absolute1">
            absolute1
            <div class="absolute2">absolute2</div>
        </div>
    </body>
</html>
```

![absolute](../../assets/images/absolute.jpg)

4. fixed
스크롤을 내리더라도 브라우저에 위치 고정

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>position</title>

        <style>
            .fixed {
                border: 1px solid black;
                position: fixed;
                width: 200px;
                height: 200px;
                bottom: 20px;
                right: 20px;
            }

            #large {
                height: 3000px;
                width: 500px;
            }
        </style>
    </head>

    <body>
        <!-- 오른쪽 아래에 고정 -->
        <div class="fixed">
            fixed
        </div>

        <div id="large">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque laborum eum dignissimos quaerat rerum, impedit voluptatum molestias, quidem hic adipisci unde, fuga minus alias qui reprehenderit expedita cupiditate illo numquam?</div>
    </body>
</html>
```