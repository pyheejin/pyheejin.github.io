---
title: 이미지 WebP 변환 후 S3에 비동기로 업로드
date: "2024-01-19"
template: "post"
draft: false
slug: "/posts/fastapi-s3-async"
category: "FastAPI"
tags:
  - "fastapi"
  - "s3"
  - "async"
  - "image"
  - "file"
  - "upload"
description: ""
---

# 설치
```commandline
pip install pillow
```
```commandline
pip install pillow-heif
```

# S3 연동
```python
import boto3
import pillow_heif

from PIL import Image
from io import BytesIO
from fastapi import UploadFile


def s3_connection():
    try:
        s3 = boto3.client(
            service_name='s3',
            region_name='ap-northeast-2',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_ACCESS_SECRET_KEY,
        )
    except Exception as e:
        print(e)
    else:
        print('s3 bucket connected!')
        return s3


s3 = s3_connection()


def upload_file(file, bucket, bucket_folder, object_name=None):
    """
    file: 업로드 할 파일
    bucket: 업로드 될 버킷
    object_name: S3 객체 이름, 없으면 file_name 사용
    """

    # S3 객체 이름이 정의 되지 않으면, file.filename 사용
    if object_name is None:
        object_name = file.filename

    # 저장할 버킷 폴더 선택
    object_key = f"{bucket_folder}/{object_name}"
    try:
        s3.upload_file(
            file,
            bucket,
            object_key,
            ExtraArgs={"ContentType": "image/jpg", "ACL": "public-read"},
        )
    except Exception as e:
        print(e)
    else:
        file_path = f'https://vukapro.s3.ap-northeast-2.amazonaws.com/{bucket_folder}/'
        image_url = f'https://vukapro.s3.ap-northeast-2.amazonaws.com/{object_key}'
        return file_path, image_url


def upload_file_async(file: UploadFile, bucket_folder, object_name=None):
    """
    file: 업로드 할 파일
    bucket: 업로드 될 버킷
    object_name: S3 객체 이름, 없으면 file_name 사용
    """
    bucket = 'bucket'
    s3_url = f'https://{bucket}.s3.ap-northeast-2.amazonaws.com/'

    # S3 객체 이름이 정의 되지 않으면, file.filename 사용
    if object_name is None:
        object_name = file.filename

    # 저장할 버킷 폴더 선택
    object_key = f"{bucket_folder}/{object_name}.webp"
    try:
        s3.upload_fileobj(
            file.file,
            bucket,
            object_key,
            ExtraArgs={'ContentType': 'image/jpg', 'ACL': 'public-read'},
        )
    except Exception as e:
        print(e)
    else:
        file_path = f'{s3_url}{bucket_folder}/'
        image_url = f'{s3_url}{object_key}'
        return file_path, image_url
    return None, None


def convert_to_webp(image_data, extension):
    if extension.upper() == 'HEIC':
        heif_file = pillow_heif.read_heif(image_data)
        image = Image.frombytes(heif_file.mode, heif_file.size, heif_file.data, 'raw')
    else:
        image = Image.open(BytesIO(image_data))

    webp_data = BytesIO()
    image.save(webp_data, format='webp', quality=75)
    webp_data.seek(0)
    return webp_data


async def image_upload(request, folder, filename):
    file_data = request.filename.split('.')
    extension = file_data[1]

    # webp 변환
    webp_data = convert_to_webp(await request.read(), extension)
    filename = f"{filename}{file_data[0]}"

    webp_upload_file = UploadFile(webp_data, filename=filename)

    # aws에 이미지 업로드
    file_path, image_url = upload_file_async(file=webp_upload_file,
                                             bucket_folder=folder,
                                             object_name=filename)
    return file_path, image_url
```

- controller.py
```python
def image_controller(request):
    for idx, image in enumerate(request.image_files):
        file_path, image_url = await image_upload(request=image,
                                                  folder='folder',
                                                  filename='filename')
```
