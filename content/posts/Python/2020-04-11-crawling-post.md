---
title: 크롤링(crawling)
date: "2020-04-08"
template: "post"
draft: false
slug: "crawling"
category: "python"
tags:
  - "crawling"
  - "BeautifulSoup"
  - "Selenium"
description: "crawling"
socialImage: ""
---

## 빌보드 차트 순위, 곡, 아티스트 크롤링해서 csv파일에 저장하기

### BeautifulSoup
설치하기
```terminal
pip install BeautifulSoup4
pip install requests
```


1. 엘리먼트

```python
import requests
import csv
import re
from bs4 import BeautifulSoup
from urllib.request import urlopen


# csv file open
csv_filename_to_write = 'billboard_chart_100.csv'
csv_open = open(csv_filename_to_write, 'w', encoding='utf-8')
csv_writer = csv.writer(csv_open)
csv_writer.writerow(('rank','song','artist'))

# BeautifulSoup
url = 'https://www.billboard.com/charts/hot-100'
req = requests.get(url)
html = req.text
bs = BeautifulSoup(html, 'html.parser')

hot_list = bs.findAll('li', {'class':re.compile('chart-list__element')})
for hot in hot_list:
    # rank
    rank_class = hot.findAll('span',{'class': re.compile('chart-element__rank__number')})
    rank = rank_class[0].text
    rank = ' '.join(rank.split())

    # song
    song_class = hot.findAll('span',{'class': re.compile('chart-element__information__song')})
    song = song_class[0].text
    song = ' '.join(song.split())

    # artist
    artist_class = hot.findAll('span',{'class': re.compile('chart-element__information__artist')})
    artist = artist_class[0].text
    artist = ' '.join(artist.split())

    csv_writer.writerow((rank, song, artist))

csv_open.close()
```

2. selector로 가져오기
Copy - Copy selector

```python
from bs4 import BeautifulSoup
from urllib.request import urlopen
import csv
import re
import requests

# csv file open
csv_filename_to_write = 'billboard_chart_100_selector.csv'
csv_open = open(csv_filename_to_write, 'w', encoding='utf-8')
csv_writer = csv.writer(csv_open)
csv_writer.writerow(('rank','song','artist'))

# BeautifulSoup
url = 'https://www.billboard.com/charts/hot-100'
req = requests.get(url)
html = req.text
bs = BeautifulSoup(html, 'html.parser')

rank = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__rank.flex--column.flex--xy-center.flex--no-shrink > span.chart-element__rank__number")
song = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__information > span.chart-element__information__song.text--truncate.color--primary")
artist = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__information > span.chart-element__information__artist.text--truncate.color--secondary")

for hot in zip(rank, song, artist):
    rank = hot[0].text
    song = hot[1].text
    artist = hot[2].text

    csv_writer.writerow((rank, song, artist))

csv_open.close()
```

### Selenium

설치하기

```terminal
pip install selenium
```

웹 드라이버 설치
클릭 -> [설치](https://sites.google.com/a/chromium.org/chromedriver/downloads)

```python
import time
import csv
from selenium import webdriver
from bs4 import BeautifulSoup


csv_filename_to_write = 'billboard_chart_100_selenium.csv'
csv_open = open(csv_filename_to_write, 'w', encoding='utf-8')
csv_writer = csv.writer(csv_open)
csv_writer.writerow(('rank','song','artist'))


driver = webdriver.Chrome('./chromedriver')
driver.get('https://www.billboard.com/charts/hot-100')
time.sleep(2)

html = driver.page_source
bs = BeautifulSoup(html, 'html.parser')

rank = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__rank.flex--column.flex--xy-center.flex--no-shrink > span.chart-element__rank__number")
song = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__information > span.chart-element__information__song.text--truncate.color--primary")
artist = bs.select("#charts > div > div.chart-list.container > ol > li > button > span.chart-element__information > span.chart-element__information__artist.text--truncate.color--secondary")

for hot in zip(rank, song, artist):
    rank = hot[0].text
    song = hot[1].text
    artist = hot[2].text

    csv_writer.writerow((rank, song, artist))

csv_open.close()

driver.quit()
```