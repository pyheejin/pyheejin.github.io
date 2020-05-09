---
title: 리스트가 주어졌을 때 같은 알파벳으로 이루어진 단어끼리 return
date: "2020-05-09"
template: "post"
draft: false
slug: "groupAnagrams"
category: "algorithm"
tags:
  - "groupAnagrams"
description: "리스트가 주어졌을 때 같은 알파벳으로 이루어진 단어끼리 return"
socialImage: ""
---

다음과 같이 input이 주어졌을 때,
같은 알파벳으로 이루어진 단어끼리 묶어주세요.
(output 순서 상관 없음)

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```


```python
def groupAnagrams(strs):
    result = {}

    for word in sorted(strs):
        key = tuple(sorted(word))
        print(key)
        '''
        ('a', 'e', 't')
        ('a', 'b', 't')
        ('a', 'e', 't')
        ('a', 'n', 't')
        ('a', 'n', 't')
        ('a', 'e', 't')
        '''
        result[key] = result.get(key, []) + [word]
    print(result)
    '''
    {('a', 'e', 't'): ['ate', 'eat', 'tea'], ('a', 'b', 't'): ['bat'], ('a', 'n', 't'): ['nat', 'tan']}
    '''
    return result.values()

print(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
```