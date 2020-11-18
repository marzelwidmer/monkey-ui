ARG BUILD_IMAGE=registry.redhat.io/ubi8/nginx-118:latest
FROM ${BUILD_IMAGE}

# Add application sources
ADD container/monkey-ui/nginx/default-server.conf "${NGINX_DEFAULT_CONF_PATH}"
ADD build .

EXPOSE 8080

CMD nginx -g "daemon off;"
