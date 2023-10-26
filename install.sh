#!/bin/bash
clear;
sudo apt install mkcert
mkcert -install
mkcert localhost 127.0.0.1 ::1
rm -Rf ssl
mkdir -p ssl
mv localhost+2-key.pem cert-key.pem
mv localhost+2.pem cert.pem
mv *.pem ssl
sudo service docker start
docker compose build
docker compose -f docker-compose.yml up
#docker compose -f docker-compose.yml up -d
