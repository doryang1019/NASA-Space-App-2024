FROM node:12.16-slim

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./ $APP_HOME
ENV LANG C.UTF-8
# Timezone
ENV TZ=Asia/Taipei
# install oracle db
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
  apt-get install -y unzip libaio1 python2.7 python-pip && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN npm install

EXPOSE 3000/tcp

CMD npm start

