FROM nginx:alpine

# Copy nginx template (uses $PORT env var)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy site files
COPY . /usr/share/nginx/html

# Railway sets PORT dynamically; default to 80 for local
ENV PORT=80

CMD ["nginx", "-g", "daemon off;"]
