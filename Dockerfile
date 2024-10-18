# Stage 1: Build the Angular app
FROM node:20.16.0 AS build

WORKDIR /app

COPY . .

RUN npm install --force

# Build the Angular application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/Ingress-Test-FE-ONE/browser /usr/share/nginx/html/Ingress-Test-FE-ONE
RUN chmod -R 755 /usr/share/nginx/html/Ingress-Test-FE-ONE
COPY nginx.conf /etc/nginx/nginx.conf
