FROM node:16 as builder
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . ./
RUN npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d