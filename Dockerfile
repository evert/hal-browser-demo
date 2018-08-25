# specify the node base image with your desired version node:<version>
FROM node:8
# replace this with your application's default port
EXPOSE 4000

RUN mkdir -p /opt/www
WORKDIR /opt/www

COPY package.json package.json 
COPY data data
COPY node_modules node_modules
COPY dist dist

CMD node dist/app.js 
