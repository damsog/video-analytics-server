FROM node:16

WORKDIR /app

COPY . .

COPY .env.SAMPLE .env

RUN sed -ie 's/SERVER=192.168.1.5/SERVER=192.168.1.5/g' .env
RUN sed -ie 's/PORT=4000/PORT=4000/g' .env
RUN sed -ie 's/LOGGER_LEVEL=info\/debug\/etc/LOGGER_LEVEL=debug/g' .env
RUN sed -ie 's/NODE_ENV=development/NODE_ENV=development/g' .env
RUN sed -ie 's/DB_NAME=dbname/DB_NAME=videoanalytics/g' .env
RUN sed -ie 's/DB_USER=user/DB_USER=root/g' .env
RUN sed -ie 's/DB_PASS=pass/DB_PASS=adminpass/g' .env
RUN sed -ie 's/DB_HOST=host/DB_HOST=localhost/g' .env
RUN sed -ie 's/DB_LOGGING=false/DB_LOGGING=false/g' .env
RUN sed -ie 's/TOKEN_KEY=mytokenkey/TOKEN_KEY=mytokenkey/g' .env
RUN sed -ie 's/FACE_ANALYTICS_SERVER=ipanalyticsserver/FACE_ANALYTICS_SERVER=192.168.1.1/g' .env
RUN sed -ie 's/FACE_ANALYTICS_PORT=portanalyticsserver/FACE_ANALYTICS_PORT=6000/g' .env
RUN sed -ie 's/RESOURCES_PATH=absolute\/path\/to\/resources\//RESOURCES_PATH=app\//g' .env

RUN npm install

EXPOSE 4000

CMD [ "node","index.js" ]