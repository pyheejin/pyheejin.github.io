---
title: 파이썬으로 엑셀 다루기(with, openpyxl)
date: "2024-01-23"
template: "post"
draft: false
slug: "/posts/python-to-excel-with-openpyxl"
category: "Python"
tags:
  - "python"
  - "excel"
  - "openpyxl"
description: "python to excel with openpyxl"
---


## 설치
```commandline
pip install openpyxl
```

```python
from openpyxl import Workbook


file_path = '/Users/Administrator/Desktop/output.xlsx'

# 엑셀파일 쓰기
write_wb = Workbook()

# 이름이 있는 시트를 생성
write_ws = write_wb.create_sheet('생성시트')

# Sheet1에다 입력
write_ws = write_wb.active
write_ws['A1'] = '숫자'

#행 단위로 추가
write_ws.append([1,2,3])

#셀 단위로 추가
write_ws.cell(5, 5, '5행5열')
write_wb.save(file_path)
```
