# Используем официальный образ Python 3.10
FROM python:3.10-slim

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование файла зависимостей и установка
# Предполагается, что в каждой директории есть requirements.txt
COPY requirements.txt .

# Установка зависимостей. Для detection-service могут понадобиться дополнительные ML-библиотеки.
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y libgl1

# Вставьте этот блок после 'RUN pip install...'
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgthread-2.0-0 && \
    rm -rf /var/lib/apt/lists/*

# Копирование остального кода
COPY . .

# Команда запуска будет определена в docker-compose.yml
