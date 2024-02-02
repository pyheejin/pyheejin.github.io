---
title: git add/commit/push 취소
date: "2024-01-23"
template: "post"
draft: false
slug: "/posts/git-undo"
category: "Git"
tags:
  - "git"
  - "undo"
description: "git undo add/commit/push"
---


## add 취소
- 파일 상태를 unstage로 변경(file이 없으면 전체 취소)
```commandline
git reset [option] HEAD [file]
```

## commit 취소
> options
>   - —soft: stage 상태로 로컬에 보존
>   - —mixed: unstage 상태로 로컬에 보존
>   - —hard: unstage 상태로 로컬에서 삭제

- commit 로그 확인
```commandline
git log -g
```

- 직전 commit 취소
```commandline
git reset --hard HEAD^
```

- 마지막 2개의 commit 취소
```commandline
git reset --hard HEAD~2
```

## push 취소
1. 워킹 디렉토리 되돌리기
```commandline
// 직전 commit 취소
git reset --hard HEAD^
```
```commandline
git reset --hard [commit id]
```

3. 강제 push
```commandline
git push origin +[branch name]
```

## untracked 파일 삭제
> options
>   - -f: 파일만 삭제
>   - -f -d: 폴더+파일 삭제
>   - -f -d -x: gitignore로 무시되는 파일까지 삭제
```commandline
git clean [option]
```
