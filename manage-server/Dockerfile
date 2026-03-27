# Dockerfile для manage_backend_server
FROM node:18-slim
WORKDIR /app

# Установка инструментов для сборки нативных модулей (gcc, g++, make)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    python3 && \
    rm -rf /var/lib/apt/lists/*

# Копирование package.json и package-lock.json (без node_modules!)
COPY package.json package-lock.json ./

# Установка зависимостей ВНУТРИ контейнера
RUN npm install

# Копирование исходного кода
COPY . .

# Команда запуска...