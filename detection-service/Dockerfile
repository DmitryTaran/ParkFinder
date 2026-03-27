# Используем официальный образ Python 3.10
FROM python:3.10-slim

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование файла зависимостей и установка
# Предполагается, что в каждой директории есть requirements.txt
COPY requirements.txt .

# ...

# Установка системных зависимостей для OpenCV (libgthread-2.0 и libGL.so.1)
# Используем apt, т.к. base-image основан на Debian (slim)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgl1 \
    libgthread-2.0-0 && \
    rm -rf /var/lib/apt/lists/*


RUN pip install --no-cache-dir -r requirements.txt

# Копирование остального кода
COPY . .
# ...

# Команда запуска будет определена в docker-compose.yml
