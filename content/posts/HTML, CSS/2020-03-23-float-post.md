---
title: float
date: "2020-03-23"
template: "post"
draft: false
slug: "css float"
category: "htmlcss"
tags:
  - "css"
  - "float"
description: "css float"
socialImage: ""
---

# float

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>float</title>

        <style>
            hr {
                margin-top: 30px;
                margin-bottom: 30px;
            }

            .none1 {
                border: 1px solid red;
                margin-bottom: 2px;
            }

            .none2 {
                border: 1px solid green;
            }

            .float1 {
                border: 1px solid pink;
                float: left;
            }

            .float2 {
                border: 1px solid blue;
            }

            .float3 {
                border: 1px solid saddlebrown;
                float: right;
            }

            .float4 {
                border: 1px solid skyblue;
                float: right;
            }
        </style>
    </head>

    <body>
        <div class="none1">float none</div>
        <div class="none2">float none</div>

        <hr>

        <!-- 앞 요소만 float 속성을 가질 때 -->
        <div class="float1">float1</div>
        <div class="float2">float2</div>

        <hr>

        <!-- 두 요소 모두 float 속성을 가질 때 -->
        <div class="float3">float3</div>
        <div class="float4">float4</div>
    </body>
</html>
```

### clear
플롯된 자식요소를 포함하는 경우에 부모요소는 높이를 인지하지 못하게 되어서 주변 엘리먼트의 배치에 영향을 미치지 않도록 해제시키는 속성

1. 부모에게도 float 적용
2. 부모에게 display: inline-block;
3. 자식 요소가 부모 요소 박스보다 클 경우에 자식 요소 박스의 콘텐츠를 숨기고 보이지 않도록 부모에게 overflow:hidden;
4. 자식요소의 마지막에 형제 요소로 빈 엘리먼트에 clear: both;

```html
<style>
    .main-page aside {
        float: left;
        width: 200px;
    }

    .clear {
        clear: both;
    }
</style>

<div class="main-page">
    <header>배너</header>
    <aside>사이드바</aside>
    <section>main contents</section>
    <br class="clear">
</div>
```

5. 가상 선택자 :after 이용하기

```css
.parent:after { 
    content: ""; 
    display:block; 
    clear:both; 
}
```