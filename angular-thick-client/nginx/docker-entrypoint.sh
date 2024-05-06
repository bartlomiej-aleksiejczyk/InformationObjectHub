#!/bin/sh
envsubst '$IMAGE_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@"
