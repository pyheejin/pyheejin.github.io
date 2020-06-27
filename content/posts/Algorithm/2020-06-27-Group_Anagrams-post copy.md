---
title: Group Anagrams
date: "2020-06-27"
template: "post"
draft: false
slug: "Group-Anagrams"
category: "algorithm"
tags:
  - "Group-Anagrams"
description: "Group Anagrams"
socialImage: ""
---

Given an array of strings, group anagrams together.

Example:

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

Note
- All inputs will be in lowercase.
- The order of your output does not matter.

### answer

```python
class Solution:
    def groupAnagrams(self, strs):
        strings = {}
        answer = []
        for string in strs:
            key = ''.join(sorted(string))
            if key not in strings:
                strings[key] = []
            strings[key].append(string)
        for key in strings:
            answer.append(strings[key])
        return answer
```