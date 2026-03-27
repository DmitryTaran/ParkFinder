# 1. Сборка приложения (Multi-stage build: build stage)
FROM node:18-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Выполняем скрипт сборки, как указано в package.json
RUN npm run build

# 2. Обслуживание статики (Multi-stage build: final stage)
FROM nginx:alpine
# Копируем собранные файлы в папку статики Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем кастомный конфиг Nginx для обработки роутинга Vite
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт Nginx по умолчанию - 80.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
