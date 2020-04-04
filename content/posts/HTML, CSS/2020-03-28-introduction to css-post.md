---
title: CSS의 정의와 역할
date: "2020-03-28"
template: "post"
draft: false
slug: "css의-정의와-역할"
category: "htmlcss"
tags:
  - "css"
  - "introduction"
description: "introduction to css"
socialImage: ""
---

# CSS(Cascading Style Sheets)
Style sheet 언어로 HTML 문서에 있는 요소들에 선택적으로 스타일을 적용할 수 있다.

### HTML에 반영하는 방법
1. 인라인 스타일 : 태그 style 속성에 직접 작성

```css
<h1 style="color: red;">FRONTEND 101</h1>
```

2. style 태그 : html 파일의 style 태그 안에 작성

```html
<style>
    h2 {
        color: #408090;
    }
</style>
```

3. css 파일에 작성 : html 파일과 분리하여 css파일에 따로 작성
(대신 html파일에서 어느 css파일이 쓰였는지 브라우저에 알려야 하므로, &#60;head&#62;와 &#60;/head&#62; 안에 링크를 해주는 태그를 추가해야 한다.)
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Page Title</title>

        <!-- here -->
        <link href="index.css" rel="stylesheet" type="text/css" />
    </head>

    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

```css
/* css파일 */
p {
  font-size: 12px;
}
```

1. link — link 태그로 사용할 css파일을 링크
2. href — href 속성에 css 파일 경로를 작성
3. type — link 태그로 연결되는 파일이 어떤 것인지 알려줍니다. 여기서 css file을 연결하므로 type값은 항상 "text/css"입니다.
4. rel — rel은 HTML file과 CSS file과의 관계를 설명하는 속성입니다. css파일을 링크할 때는 항상 "stylesheet"값을 대입해줍니다.

## 작성법
### 선택자(selector)

```css
p {
  font-size: 12px;
}
```
- p라는 태그의 내용(텍스트)의 글씨크기를 12px로 변경
- 콜론(:)을 기준으로 왼쪽의 font-size는 property(속성)이라고 하며, 오른쪽의 12px는 속성 값입니다.
- selector(선택자)는 tag, class, id 등 여러 종류가 올 수 있습니다.

1. tag 
```css
p {
  font-size: 12px;
}
```

2. class
(중복 사용 가능)
```css
.className {
  font-size: 12px;
}
```

3. id
(중복 사용 불가)
```css
#idName {
  font-size: 12px;
}
```