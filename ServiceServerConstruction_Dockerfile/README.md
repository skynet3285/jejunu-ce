# README.md

Docker를 통해 alpine 이미지를 기반으로 nginx과 간단한 웹페이지를 설정하여, 컨테이너를 빌드하고 실행하는 과정을 순서대로 나열합니다.


# 프로젝트 구성

## 개발 환경

윈도우11(10.0.22631 빌드 22631) x64
Ryzen 5700X
64GB
로 구축했습니다.


## 테스트 환경

윈도우11(x86-64 Ryzen7 5700x), MacOS14.5(Apple Silicon M3 Pro) 환경에서 테스트 완료했습니다.


### 윈도우 OS

Docker 웹사이트에서 Docker Desktop을 설치합니다.


### 맥 OS

터미널에서 `brew install --cask docker`을 입력하여 docker app을 설치합니다.


## 프로젝트 디렉토리 구조

- dockerfile
- conf
  - nginx.conf
- imgs
  - jeju.jpg
- page
  - jeju.html
- toss
  - jeju.html

### dockerfile 파일

컨테이너를 설정합니다.


### nginx.conf

웹서버의 라우팅을 설정합니다.


# Docker 빌드 및 실행 그리고 테스트

1. 터미널에서 컨테이너 빌드
   
   `docker build -t my-jeju-docker .`

2. 빌드된 컨테이너 이미지 실행
   
   -d는 데몬으로 실행(백그라운드)
   
   -p는 포트 지정, host os의 포트 8888를 컨테이너의 8888포트에 연결(왼쪽이 호스트 : 오른쪽이 컨테이너 인스턴스)
   
   `docker run -d -p 8888:8888 my-jeju-docker`
   

3. 도커 실행중인 컨테이너 인스턴스 확인

   -a는 실행이 안된 컨테이너 확인 가능
   
   `docker ps`


4. 도커 내부 쉘 접속
   
   `docker exec -it [컨테이너 ID] /bin/sh`


5. 도커 컨테이너 내부 쉘에서 Nginx 서버 HTTP GET 요청
   
   `curl localhost:8888`

   ### nginx가 의도대로 설정된 경우

   아래의 결과가 문자열로 출력됩니다.
   <!DOCTYPE html>
   <html>
   <head>
   <title>Welcome to nginx!</title>
   <style>
   html { color-scheme: light dark; }
   body { width: 35em; margin: 0 auto;
   font-family: Tahoma, Verdana, Arial, sans-serif; }
   </style>
   </head>
   <body>
   <h1>Welcome to nginx!</h1>
   <p>If you see this page, the nginx web server is successfully installed and
   working. Further configuration is required.</p>

    <p>For online documentation and support please refer to
    <a href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="http://nginx.com/">nginx.com</a>.</p>

    <p><em>Thank you for using nginx.</em></p>
    </body>
    </html>

   ### nginx 로그 확인

   `cat /var/log/nginx/error.log`
   `cat /var/log/nginx/access.log`


6. host os 브라우저에서 아래 URL 접속

   1. Welcome to Docker's World
      <http://localhost:8888/page/2024/jeju.html>
   2. Welcome to Docker's World, 5초뒤 제주대학교 포털로 Redirect
      <http://localhost:8888/toss/2024/jeju.html>
   3. 제주대학교 로고 사진
      <http://localhost:8888/images/2024/jeju.jpg>
   4. 제주대학교 포털로 Redirect
      <http://localhost:8888/redirect/2024/jeju>


7. 도커 컨테이너 종료
    
   `docker ps` : 실행중인 컨테이너의 ID를 확인합니다
   
   `docker stop [컨테이너 ID]`

