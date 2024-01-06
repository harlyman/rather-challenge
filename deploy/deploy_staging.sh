#!/bin/bash

# API
cd /var/www/twilio_dev
cp .env.dev .env.deploy

docker stop twilio_dev || true && docker rm twilio_dev || true && docker rmi twilio_dev || true &&
docker build . -t twilio_dev -f config/Dockerfile && docker run --name twilio_dev \
  -p 3001:3000 \
  --restart=always \
  -e API_KEY=$API_KEY_DEV \
  -e DATABASE_USERNAME=$DATABASE_USERNAME \
  -e DATABASE_PASSWORD=$DATABASE_PASSWORD \
  -d twilio_dev