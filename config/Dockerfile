FROM node:18.15.0-bullseye-slim

RUN apt-get update -y && apt-get install -y \ 
  iproute2

# Create app directory
WORKDIR /opt/app

COPY ./package*.json .
COPY ./.env.deploy ./.env

RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

COPY ./config/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
