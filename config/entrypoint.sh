#! /bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$child" 2>/dev/null
}

trap _term SIGTERM

# Extrae la IP del host
export HOST_IP=$(ip -4 route get 8.8.8.8 | awk '{print $3}')

# Imprime la IP del host
# export DATABASE_HOST=$HOST_IP
# export DATABASE_HOST=mysql

npm run typeorm:mgr:run
npm start &

child=$! 
wait "$child"
