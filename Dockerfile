FROM python:3.11-slim

WORKDIR /api

COPY ./api/.env.local .env

COPY ./api/requirements.txt .
RUN pip install -r requirements.txt

COPY ./api . 

EXPOSE 8080

CMD ["python3", "main.py"]