#!/bin/bash

# API
cd /var/www/twilio
cp .env.prod .env.deploy

docker stop twilio || true && docker rm twilio || true && docker rmi twilio || true &&
docker build . -t twilio -f config/Dockerfile && docker run --name twilio \
  -p 3000:3000 --restart=always \
  -e API_KEY=$API_KEY \
  -e DATABASE_USERNAME=$DATABASE_USERNAME \
  -e DATABASE_PASSWORD=$DATABASE_PASSWORD \
  -d twilio