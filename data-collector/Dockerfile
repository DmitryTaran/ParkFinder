# Используем официальный образ Node.js
FROM node:18-slim

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и установка зависимостей
# Предполагается, что в каждой директории есть package.json
COPY package.json package-lock.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Команда запуска будет определена в docker-compose.yml