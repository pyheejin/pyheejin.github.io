---
title: DateTime 사용법
date: "2025-06-12"
template: "post"
draft: false
slug: "/posts/datetime"
category: "Flutter"
tags:
  - "flutter"
  - "dart"
  - "datetime"
description: ""
---

## DateTime Format 패키지 설치
```commandline
dependencies:
  intl: ^0.16.0
```

## DateTime to String
```shell
import 'package:intl/intl.dart';

DateTime now = DateTime.now();
String nowString = DateFormat('yyyy-MM-dd').format(now);
```

## String to DateTime
```shell
import 'package:intl/intl.dart';

DateTime now = DateTime.now();
String nowString = DateFormat('yyyy-MM-dd').format(now);
DateTime date = DateFormat('yyyy-MM-dd').parse(nowString);
```

## 날짜 비교

### isAfter
특정 날짜가 다른 날짜보다 이후인지 확인
```shell
DateTime date1 = DateTime(2025, 6, 12);
DateTime date2 = DateTime(2025, 6, 13);
bool isAfter = date2.isAfter(date1); // true
```

### isBefore
특정 날짜가 다른 날짜보다 이전인지 확인
```shell
DateTime date1 = DateTime(2025, 6, 12);
DateTime date2 = DateTime(2025, 6, 13);
bool isBefore = date1.isBefore(date2); // true
```

### compareTo
두 날짜를 비교하고 결과를 반환
- -1 : 비교하는 날짜가 이전
- 0 : 두 날짜가 같음
- 1 : 비교하는 날짜가 이후
```shell
DateTime date1 = DateTime(2025, 6, 12);
DateTime date2 = DateTime(2025, 6, 13);
int comparisonResult = date1.compareTo(date2); // -1
```

### 날짜 사이의 사이
```python
DateTime date1 = DateTime(2025, 6, 12);
DateTime date2 = DateTime(2025, 6, 13);
dynamic difference = date1.difference(date2);
print(difference.inDays);  // -1
print(difference.inHours);  // -24
```

### 날짜 연산
```shell
DateTime date = DateTime(2025, 6, 12);

// 2025-06-22 00:00:00.000
print(date.add(Duration(days: 10)));

// 2025-06-02 00:00:00.000
print(date.subtract(Duration(days: 10)));
```
