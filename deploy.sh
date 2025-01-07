gcloud config set project "madcampweek24"
docker build . -t fastapi-app:latest
docker tag fastapi-app:latest gcr.io/madcampweek24/fastapi-app:latest
docker push gcr.io/madcampweek24/fastapi-app:latest
gcloud run deploy madcamp-week2-1 --image gcr.io/madcampweek24/fastapi-app:latest --platform managed --region asia-northeast3 --allow-unauthenticated
