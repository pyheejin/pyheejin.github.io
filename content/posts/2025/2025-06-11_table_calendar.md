---
title: 달력 구현하기
date: "2025-06-11"
template: "post"
draft: false
slug: "/posts/table-calendar"
category: "Flutter"
tags:
  - "flutter"
  - "calendar"
description: ""
---

## 설치
```commandline
dependencies:
  table_calendar: ^3.2.0
```

## import
```commandline
import 'package:table_calendar/table_calendar.dart';
```

```dart
DateFormat dateFormat = DateFormat('yyyy-MM-dd');
DateTime now = DateTime.now();
CalendarFormat calendarFormat = CalendarFormat.month;
List<String> days = ['_', '월', '화', '수', '목', '금', '토', '일'];

Map<dynamic, List<dynamic>> events = {
  '2025-06-10': [
    {
      'title': 'event1',
    },
    {
      'title': 'event2',
    },
  ],
  '2025-06-11': [
    {
      'title': 'event3',
    },
  ],
};

List<dynamic> getEventsForDay(DateTime day) {
  return events[day] ?? [];
}

TableCalendar(
  // 달에 첫 날
  firstDay: DateTime(now.year - 1, now.month, 1),
  // 달에 마지막 날
  lastDay: DateTime(now.year + 10, 12, 31),
  focusedDay: selectDay,
  calendarFormat: calendarFormat,
  locale: 'ko-KR',
  headerStyle: const HeaderStyle(
    titleCentered: true,
    formatButtonVisible: false,
  ),
  calendarStyle: CalendarStyle(
    selectedDecoration: const BoxDecoration(
      color: Color(0xFFA48AFF),
      shape: BoxShape.circle,
    ),
    defaultDecoration: const BoxDecoration(
      shape: BoxShape.circle,
    ),
    todayDecoration: BoxDecoration(
      color: Colors.blueAccent.shade100,
      shape: BoxShape.circle,
    ),
    markerDecoration: const BoxDecoration(
      color: Color(0xFFA48AFF),
      shape: BoxShape.circle,
    ),
  ),
  selectedDayPredicate: (day) {
    return isSameDay(selectDay, day);
  },
  // 사용자가 캘린더에 요일을 클릭했을 때
  onDaySelected: (selectedDay, focusedDay) {
    setState(() {
      selectDay = selectedDay;
      now = focusedDay;
    })
  },
  // 달이 바뀌었을 때
  onPageChanged: (focusedDay) {
    setState(() {
      now = focusedDay;
    })
  },
  calendarBuilders: CalendarBuilders(
    dowBuilder: (context, day) {
      return Center(
        child: Text(days[day.weekday]),
      );
    },
  ),
  // 이벤트 마커 표시
  eventLoader: (day) {
    final dateFormat = DateFormat('yyyy-MM-dd');
    final newDay = dateFormat.format(day);
    return getEventsForDay(dateFormat.parse(newDay));
  },
)
```
