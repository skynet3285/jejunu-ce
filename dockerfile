# 베이스 이미지 Alpine을 사용
FROM alpine

# Nginx를 설치
RUN apk add --no-cache nginx

# docker 컨테이너 내부에서 nginx가 응답하는지 확인하기 위한 curl 설치
RUN apk add --no-cache curl

# 프로젝트 내의 conf/nginx.conf 파일을 도커가 실행되는 환경의 /etc/nginx/nginx.conf로 복사
COPY conf/nginx.conf /etc/nginx/nginx.conf

# 프로젝트 내의 HTML 파일들과 이미지 파일들을 도커가 실행되는 환경의 /usr/share/nginx/html/...로 복사
COPY page/jeju.html /usr/share/nginx/html/page/jeju.html
COPY toss/jeju.html /usr/share/nginx/html/toss/jeju.html
COPY imgs/jeju.jpg /usr/share/nginx/html/imgs/jeju.jpg

# 도커의 8888번 포트를 Host OS에 노출하는 걸로 설정
EXPOSE 8888

# Docker 컨테이너가 실행된 이후 nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]