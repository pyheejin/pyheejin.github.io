---
title: 카카오 지도 api 이용해서 주소로 위도, 경도 구하기
date: "2020-06-10"
template: "post"
draft: false
slug: "coordinates-in-django"
category: "django"
tags:
  - "coordinates-in-django"
description: "카카오 지도 api 이용해서 주소로 위도, 경도 구하기"
socialImage: ""
---

### 카카오 개발자사이트에서 등록하기
1. https://developers.kakao.com/ 에서 내 애플리케이션 만들기
2. 내 애플리케이션 > 플랫폼 > Web 플랫폼 등록하기 <br>
(ex: http://127.0.0.1:8000)

### Python 코드로 작성하기

```python
import requests
import json
import urllib

def getGPS_coordinates_for_KAKAO(address):
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'KakaoAK {}'.format(config.MYAPP_KEY['MYAPP_KEY'])
    }
    address = address.encode("utf-8")
    p = urllib.parse.urlencode(
        {
            'query': address
        }
    )
    api = requests.get("https://dapi.kakao.com/v2/local/search/address.json", headers=headers, params=p)
    lat = api.json()['documents'][0]['x'] # 경도
    lng = api.json()['documents'][0]['y'] # 위도
    result = [lat, lng]
    return result

print(getGPS_coordinate_for_KAKAO('강남대로 27'))
```

- api.json()
```json
{
    'documents': [
        {
            'address': {
                'address_name': '서울 서초구 양재동 232', 
                'b_code': '1165010200', 
                'h_code': '1165065200', 
                'main_address_no': '232', 
                'mountain_yn': 'N', 
                'region_1depth_name': '서울', 
                'region_2depth_name': '서초구', 
                'region_3depth_h_name': '양재2동', 
                'region_3depth_name': '양재동', 
                'sub_address_no': '', 
                'x': '127.039136433366', // 경도
                'y': '37.4682787075426' // 위도
            }, 
            'address_name': 
            '서울 서초구 강남대로 27', 
            'address_type': 'ROAD_ADDR', 
            'road_address': {
                'address_name': '서울 서초구 강남대로 27', 
                'building_name': 'AT센터', 
                'main_building_no': '27', 
                'region_1depth_name': '서울', 
                'region_2depth_name': '서초구', 
                'region_3depth_name': '양재동', 
                'road_name': '강남대로', 
                'sub_building_no': '', 
                'underground_yn': 'N', 
                'x': '127.039136433366', 
                'y': '37.4682787075426', 
                'zone_no': '06774' // 우편번호
            }, 
            'x': '127.039136433366', 
            'y': '37.4682787075426'
        }
    ], 
    'meta': {
        'is_end': True, 
        'pageable_count': 1, 
        'total_count': 1
    }
}
```

### Django views.py
회사 정보를 등록할 때 주소를 입력하면 위도와 경도를 구해서 테이블에 넣어주는 코드

```python
def getGPS_coordinates_for_KAKAO(address):
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'KakaoAK {}'.format(config.MYAPP_KEY['MYAPP_KEY'])
    }
    address = address.encode("utf-8")
    p = urllib.parse.urlencode(
        {
            'query': address
        }
    )
    api = requests.get("https://dapi.kakao.com/v2/local/search/address.json", headers=headers, params=p)
    lat = api.json()['documents'][0]['x']
    lng = api.json()['documents'][0]['y']
    result = [lat, lng]
    return result

class CompanyRegister(View):
    @login_decorator
    def post(self, request):
        data = json.loads(request.body)
        try:
            if Company.objects.filter(user_id=request.user.id).exists():
                return JsonResponse({'MESSAGE': 'INVALID'}, status=401)
            
            Company(
                user_id = request.user.id,
                name = data['name'],
                registration_number = data['registration_number'],
                revenue = data['revenue'],
                industry = Industry.objects.get(name=data['industry']),
                employee = Employee.objects.get(number=data['employee']),
                description = data['description'],
                foundation_year = Foundation_year.objects.get(name=data['foundation_year']),
                email = data['email'],
                contact_number = data['contact_number'],
                website = data['website'],
                keyword = data['keyword'],
                recommender = data['recommender'],
                image_url = data['image_url'],
			).save()

            address = data['address']
            coordinates = getGPS_coordinates_for_KAKAO(address)
            Workplace.objects.create(
                company_id = Company.objects.get(user_id=request.user.id).id,
                city = City.objects.get(name=data['city']),
                address = address,
                represent = data['represent'],
                lat = coordinates[0],
                lng = coordinates[1]
            )
            return JsonResponse({'MESSAGE':'SUCCESS'}, status=200)
        except KeyError:
            return JsonResponse({'MESSAGE': 'INVALID KEYS'}, status=401)
```