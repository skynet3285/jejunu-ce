Readme는 Docker를 구성하는 과정을 순서대로 나열합니다.

#### 프로젝트 구성

## 개발 환경

윈도우11(10.0.22631 빌드 22631) x64
Ryzen 5700X
64GB
로 구축했습니다.

## 윈도우 OS

Docker 웹사이트에서 Docker Desktop을 설치하면 모든 준비는 끝납니다.

## 맥 OS

brew install --cask docker를 통해 docker app을 설치합니다.


프로젝트 디렉토리 구조는 아리와 같습니다
dockerfile

- conf
  - nginx.conf
- imgs
  - jeju.jpg
- page
  - jeju.html
- toss
  - jeju.html

dockerfile
기본적으로 도커의 base 이미지로 alpine를 설정하고 curl와 nginx를 설치합니다
그리고 프로젝트 내의 파일을 도커 컨테이너 경로에 COPY합니다
도커의 8888 포트를 외부로 개방합니다.

nginx.conf
localhost를 웹서버의 도메인으로 설정하고 라우팅 설정을 합니다

#### Docker 빌드 및 실행 그리고 테스트

1. 터미널에서 도커를 이용하여 빌드
   docker build -t my-jeju-docker .

2. 빌드된 컨테이너 이미지 실행
   host os의 포트 8888 : 컨테이너의 8888포트에 연결
   docker run -p 8888:8888 my-jeju-docker

3. 도커 실행중인 컨테이너 인스턴스 확인 (-a는 실행이 안된 컨테이너 확인가능) => docker rm [컨테이너 ID]로 삭제 가능
   docker ps

4. 도커 내부 쉘 접속
   docker exec -it [컨테이너 ID] /bin/sh

5. 도커 내부 쉘에서 Nginx 접근
   sh> curl localhost:8888
   아래의 결과 리턴
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

- nginx 정상작동 확인 -

6. host os 브라우저에서 아래 URL 접속 확인
   http://localhost:8888/page/2024/jeju.html # Welcome to Docker's World
   http://localhost:8888/toss/2024/jeju.html # Welcome to Docker's World, 5초뒤 제주대학교 포털로 Redirect
   http://localhost:8888/images/2024/jeju.jpg # 제주대학교 로고 사진
   http://localhost:8888/redirect/2024/jeju # 제주대학교 포털로 Redirect
