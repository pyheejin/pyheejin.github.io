---
title: HTML의 정의와 역할
date: "2020-03-28"
template: "post"
draft: false
slug: "html의-정의와-역할"
category: "htmlcss"
tags:
  - "html"
  - "introduction"
description: "introduction to html"
socialImage: ""
---

# HTML(Hyper Text Markup Language)
HTML은 웹 페이지를 기술하는 언어로써 웹페이지의 내용(content)과 구조(structure)을 담당하는 언어로써 HTML 태그를 통해 정보를 구조화하는 것이다.

- HTML은 마크업 언어(markup language)을 사용하여 웹 페이지의 구조를 설명
- HTML 요소는 태그(tag)로 표현되며, 태그(tag)는 "heading", "paragraph", "table" 등과 같은 내용의 레이블을 표시한다.
- 브라우저는 HTML 태그를 표시하지 않지만, 이를 사용하여 페이지의 내용을 렌더링한다.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Page Title</title>
    </head>

    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

- !DOCTYPE 선언은 문서의 형식을 정의 (HTML5에서의 문서타입 선언 방식)
- &#60;html&#62;와 &#60;/html&#62; 사이의 텍스트가 웹 페이지를 설명
- &#60;head&#62;와 &#60;/head&#62; 사이에는 document title, 외부 파일의 참조, 메타데이터의 설정 등이 위치하며 이 정보들은 브라우저에 표시되지 않는다.
- &#60;title&#62;와 &#60;/title&#62; 사이의 텍스트는 문서의 제목을 제공
- &#60;body&#62;와 &#60;/body&#62; 안의 내용만이 브라우저에 표시된다.

## HTML5의 기본 문법
### 요소 (Element)
HTML 요소는 시작 태그(start tag)와 종료 태그(end tag) 그리고 태그 사이에 위치한 content로 구성

- HTML 태그는 &#60;html&#62; 처럼 꺽쇠괄호로 둘러싸인 키워드(태그 이름)이다.
- HTML 태그는 일반적으로 &#60;b&#62; 와 &#60;/b&#62; 처럼 쌍으로 주어진다.
- 쌍의 첫 번째 태그가 시작 태그(start tag) 이고, 두 번째 태그가 종료 태그(end tag)이다.
- 종료 태그는 시작 태그와 같으나 그 이름 앞에 슬래시(/)가 붙는다.

### 빈 요소 (Empty Element)
content를 가질 수 없는 요소를 빈 요소(Empty element or Self-Closing element)라 한다.

```html
<br>
<hr>
<img>
<input>
<link>
<meta charset="utf-8">
```

빈 요소는 content가 없으며(필요가 없다) 어트리뷰트(Attribute)만을 가질 수 있다.

### 어트리뷰트 (Attribute)
어트리뷰트(Attribute 속성)이란 요소의 성질, 특징을 정의하는 명세이다.
요소는 어트리뷰트를 가질 수 있으며 어트리뷰트는 요소에 추가적 정보(예를 들어 이미지 파일의 경로, 크기 등)를 제공한다.
어트리뷰트는 시작 태그에 위치해야 하며 이름과 값의 쌍을 이룬다. (e.g. name=”value”)

```html
<!-- 
    src : 어트리뷰트 명
    image.jpg : 어트리뷰트 값
 -->
<img src="image.jpg" width="100" height="100">
```

### 글로벌 어트리뷰트 (HTML Global Attribute)
글로벌 어트리뷰트는 모든 HTML 요소가 공통으로 사용할 수 있는 어트리뷰트다.

|Attribute|Description|
|----|---|
|id|유일한 식별자(id)를 요소에 지정한다. 중복 지정이 불가하다.|
|class|	스타일시트에 정의된 class를 요소에 지정한다. 중복 지정이 가능하다.|
|hidden|css의 hidden과는 다르게 의미상으로도 브라우저에 노출되지 않게 된다.|
|lang|지정된 요소의 언어를 지정한다. 검색엔진의 크롤링 시 웹페이지의 언어를 인식할 수 있게 한다.|
|style|요소에 인라인 스타일을 지정한다.|
|title|요소에 관한 제목을 지정한다.|

### 주석 (Comments)
주석(comment)는 주로 개발자에게 코드를 설명하기 위해 사용되며 브라우저에 표시하지 않는다.

```html
<!--주석은 브라우저에 표시되지 않는다.-->
<p>Lorem ipsum dolor sit amet</p>
```