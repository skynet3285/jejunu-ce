# 아래에 작성된 Docker 명령의 자세한 내용은
# https://docs.docker.com/reference/dockerfile 에서 확인할 수 있습니다.

# 베이스 이미지 Alpine을 사용
FROM alpine

# Alpine 리눅스의 APK(패키지 관리자)를 통해 curl과 nginx를 설치
RUN apk add --no-cache nginx curl

# 프로젝트 내의 conf/nginx.conf 파일을 도커가 실행되는 환경의 /etc/nginx/nginx.conf로 복사
COPY conf/nginx.conf /etc/nginx/nginx.conf

# 프로젝트 내의 HTML 파일들과 이미지 파일들을 도커가 실행되는 환경의 /usr/share/nginx/html/...로 복사
COPY page/jeju.html /usr/share/nginx/html/page/jeju.html
COPY toss/jeju.html /usr/share/nginx/html/toss/jeju.html
COPY imgs/jeju.jpg /usr/share/nginx/html/imgs/jeju.jpg


# 컨테이너의 8888번 포트를 Host OS에 노출하는 걸로 명시합니다.(명령이 아니라 명시)
# https://docs.docker.com/reference/dockerfile/#expose에 따르면 no-op입니다.
# 컨테이너를 실행할 때 docker run -p 8888:8888로 포트를 직접 지정해줘야 외부로 노출됩니다
EXPOSE 8888

# Docker 컨테이너가 실행된 이후 nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]