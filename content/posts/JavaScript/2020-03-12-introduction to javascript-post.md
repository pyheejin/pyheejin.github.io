---
title: JavaScript의 정의와 역할
date: "2020-03-12"
template: "post"
draft: false
slug: "JavaScript의-정의와 -할"
category: "javascript"
tags:
  - "javascript"
  - "introduction_to_javascript"
description: "JavaScript의 정의와 역할"
socialImage: ""
---

# JavaScript
JavaScript를 실행시키려면 브라우저가 존재해야하고, HTML파일이 있어야하고, HTML파일에서 JavaScript 파일을 연결시켜줘야 합니다.
(JavaScript 파일은 확장자가 .js)

## 자바스크립트의 특징

* 인터프리트 언어 : 컴파일 과정을 거치지 않고 바로 실행시킬 수 있는 언어
* 동적 타이핑(dynamic typing) : 변수의 자료형을 선언하지 않고도 변수를 사용할 수 있는 특징, 단순히 모든 변수는 var x;와 같이 선언할 수 있다.
* 구조적 프로그래밍 지원 : C언어의 구조적 프로그래밍을 지원한다. 즉 if-else, while, for 등의 제어구조를 완벽하게 지원한다.
* 객체기반 : 자바스크립트는 전적으로 객체 지향 언어이다. 자바스크립트의 객체는 연관 배열(associative arrays)이다.
* 함수형 프로그래밍 지원 : 자바스크립트에서 함수는 일급 객체이다. 즉 함수는 그 자체로 객체이다. 함수는 속성과 .call()과 같은 메서드를 가진다.
* 프로토타입 기반(prototype-based) : 자바스크립트는 상속을 위해 클래스 개념 대신에 프로토타입을 사용한다.

```html
<html>
    <head>
        <title>First Javascript</title>
    </head>
    <body>
        <script>
            var now = new Date(); //현재 시간을 가지고 있는 객체를 생성
            document.write(now); //객체의 값을 화면에 표시
        </script>
    </body>
</html>
```

* 자바스크립트의 가장 중요한 특징은 동적 웹 페이지를 생성할 수 있다는 점이다.
* 자바스크립트는 &#60;script&#62;...&#60;/script&#62;사이에 기술된다.
* HTML문서의 &#60;head&#62;섹션이나 &#60;body&#62;섹션 안에 위치할 수 있다.
* var now = new Date(); 는 현재 시간을 가지고 있는 now라는 이름의 객체가 생성된다.
* document.write(now); 는 now객체의 값을 HTML문서에 출력한다.

<br>

## 자바스크립트의 용도

* 이벤트에 반응하는 동작을 구현할 수 있다.
* Ajax를 통하여 전체 페이지를 다시 로드하지 않고도 서버로부터 새로운 페이지 콘텐츠를 받거나 데이터를 제출할 때 사용한다.
* HTML요소의 크기나 색상을 동적으로 변경할 수 있다.
* 게임이나 애니메이션과 같은 상호 대화적인 콘텐츠를 구현할 수 있다.
* 사용자가 입력한 값을 검증하는 작업도 자바스크립트를 이용한다.

```html
<html>
    <head>
        <title>Javascript</title>
    </head>
    <body>
        <p>자바스크립트는 이벤트에 반응할 수 있습니다.</p>
        <button type="button" onclick="alert('hello~')">press the button!</button>
    </body>
</html>
```

* 위 코드는 버튼이 클릭되어 onclick 이벤트가 발생하면 alert('hello~')를 실행하는 코드이다.




<br>

## 자바스크립트의 위치

1. 내부 자바스크립트 : &#60;head&#62;섹션이나 &#60;body&#62;섹션 안에 위치

```html
<html>
    <head>
        <title>First Javascript</title>
        <script>
            document.write('hello Javascript');
        </script>
    </head>
    
    <body>
        <script>
            var now = new Date();
            document.write(now);
        </script>
    </body>
</html>
```


2. 외부 자바스크립트 : &#60;script&#62; 태그의 src속성의 값으로 외부 스크립트 파일의 이름을 입력

```html
<html>
    <head>
        <title>Javascript</title>
        <script src="now.js"></script>
    </head>
    <body>
        <p>자바스크립트는 이벤트에 반응할 수 있습니다.</p>
    </body>
</html>
```


3. 인라인 자바스크립트 : HTML 태그 내부에 이벤트 속성으로 삽입

```html
<body>
    <p>자바스크립트는 이벤트에 반응할 수 있습니다.</p>
    <button type="button" onclick="alert('hello~')">press the button!</button>
</body>
```
