# Step 1 build angular files
FROM node:18.7.0 as node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package.json ./

RUN npm i
RUN npm run build --prod

# Step 2 nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/ui-prototyping-tool /usr/share/nginx/html

ENV PORT=8083
EXPOSE ${PORT}
