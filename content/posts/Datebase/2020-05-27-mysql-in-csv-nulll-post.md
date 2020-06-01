---
title: mysql에 csv 파일 넣을 때 파일에 빈값 처리
date: "2020-05-27"
template: "post"
draft: false
slug: "mysql-insert-from-csv-file-null"
category: "database"
tags:
  - "mysql-insert-from-csv-file-null"
description: "mysql에 csv 파일 넣을 때 파일에 빈값 처리"
socialImage: ""
---

```python
CSV_PATH = './csv/positions.csv'
with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)

    for row in data_reader:
        # here
        expiry_date = None if row['expiry_date'] == '' else row['expiry_date']
        preferred = None if row['preferred'] == '' else row['preferred']
        themes_id = None if row['themes_id'] == '' else Theme.objects.get(id=row['themes_id'])

        Position.objects.create(
            company = Company.objects.get(id=row['companies_id']),
            theme = themes_id,
            role = Role.objects.get(id=row['roles_id']),
            min_level = row['min_level'],
            max_level = row['max_level'],
            entry = row['entry'],
            mim_wage = row['mim_wage'],
            max_wage = row['max_wage'],
            expiry_date = expiry_date,
            always = row['always'],
            name = row['name'],
            description = row['description'],
            responsibility = row['responsibility'],
            qualification = row['qualification'],
            preferred = preferred,
            benifit = row['benifit'],
            created_at = row['created_at'],
            updated_at = row['updated_at'],
            referrer = row['referrer'],
            volunteer = row['volunteer'],
            total = row['total']
        )
```