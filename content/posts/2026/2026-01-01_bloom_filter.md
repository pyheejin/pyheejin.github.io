---
title: 블룸 필터(Bloom filter)
date: "2026-01-01"
template: "post"
draft: false
slug: "/posts/bloom-filter"
category: "Python"
tags:
  - "python"
  - "bloom_filter"
description: "면접 과정에 라이브 코딩 주제가 잘 모르는 블룸 필터여서 이참에 공부하면 좋을 것 같아서 정리해보고자 한다"
---

### 핵심 포인트
- 동작 원리
  - 데이터가 들어왔을 때 여러 개의 해시 함수를 거쳐서 비트 배열의 특정 인덱스를 1로 변경
  - 조회할 때는 해당 인덱스가 1인지 확인
- 긍정 오류(False Positive)
  - "데이터가 있다"라고 했지만 실제로 없는 경우를 뜻함
  - **하지만 반대로 "데이터가 없다"라고 했는데 실제로 있는 경우는 발생하지 않음**
- 시간/공간 복잡도
  - 데이터 삽입과 조회 모두 "O(해시 함수의 개수)"
  - 공간 복잡도는 저장하려는 데이터 개수가 아닌 **비트 배열의 크기**에 비례함


### hashlib를 이용한 코드
```python
import hashlib

from bitarray import bitarray


class BloomFilter:
    def __init__(self, size, hash_count):
        self.size = size
        self.hash_count = hash_count
        self.bit_array = bitarray(size)
        self.bit_array.setall(0)  # 비트 배열을 0으로 초기화해서 메모리 사용량 최소화

    def _get_hashes(self, item):
        hashes = []
        for idx in range(self.hash_count):
            '''
            블룸 필터가 제대로 작동하려면 하나의 입력값에 대해 서로 다른 독립적인 해시 함수가 필요하지만,
            구현이 복잡하고 연산 효율을 위해 하나의 해시 함수에 각각의 인덱스를 조합해서 여러개의 독립적인
            결과값을 얻는 방식을 사용함

            hashlib의 함수들은 파이썬의 문자열 객체를 바로 받을 수 없기에 바이트 형태로 encode 해야 함
            '''
            hashing_data = hashlib.sha256(f'{idx}{item}'.encode()).hexdigest()

            '''
            16진수 문자열을 10진수 정수로 변환하고, 비트 배열의 크기로 '나머지 연산'을 수행해서
            배열 범위 내의 유효한 인덱스를 얻기 위함
            나머지 연산을 하는 이유:
                해시 함수는 데이터의 작은 변화에도 완전히 다른 값이 되기 때문에 출력 범위가 넚음,
                따라서 비트 배열 크기에 맞춰서 사용하려면 나머지 연산이 필수
            '''
            index = int(hashing_data, 16) % self.size
            hashes.append(index)
        return hashes

    def add(self, item):
        for index in self._get_hashes(item):
            self.bit_array[index] = 1

    def exists(self, item):
        for index in self._get_hashes(item):
            if not self.bit_array[index]:
                return False
        return True


'''
size 기준:
  1. 예상 데이터 개수
  2. 긍정 오류 오차율
  3. 해시 함수의 개수
배열의 크기를 정하는 기준은 긍정 오류(False Positive)의 확률이 어느정도인지에 달려 있음
데이터가 많아질수록 비트가 1로 가득 차서 오류율이 증가하기 때문에,
데이터 하나당 약 10~15비트 정도를 할당하는 것을 권장
(수학 공식은 너무 복잡해서.. 아래 코드는 데이터 하나당 10비트를 할당하고 해시 함수를 7개 사용하면
 오차율을 1% 내외로 유지하면서 메모리를 효율적으로 사용할 수 있다고 함)
'''
data_count = 1000
size = data_count * 10

'''
hash_count 기준:
데이터 하나를 비트 배열에 몇 개의 점으로 찍을 것인가에 달려 있음
적으면 데이터를 구분하는 특징이 부족해지고, 많으면 데이터를 넣을 때마다 너무 많은 비트를 1로 바꿔서 비트 배열이 금방 차버림
오차율이 가장 낮은 이상적인 상태는 데이터를 전부 넣었을 때 절반 정도가 1로 채워진 상태
(비트가 절반 이상 채워지면 해시 충돌이 늘어나서 오차율이 급격히 상승함)
근사치 계산법은 (비트 배열 크기 / 데이터 개수) * 0.7
(50%가 기준인데 0.7을 곱하는 이유는 해시 함수를 여러 번 적용할 때, 비트가 중복해서 찍히는 가능성을 고려해서 나온 숫자)
'''
hash_count = (size / data_count) * 0.7

bloom_filter = BloomFilter(size, int(hash_count))

print(f'size: {size}')
print(f'hash_count: {hash_count}')

bloom_filter.add('hi')
exists = bloom_filter.exists('hi')
exists2 = bloom_filter.exists('hi2')
print(f'이건 있겠지? {exists}')
print(f'이건 없을거야 {exists2}')
```
