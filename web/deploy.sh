docker build . -t nextjs-app:latest
docker tag nextjs-app:latest gcr.io/madcampweek24/nextjs-app:latest
docker push gcr.io/madcampweek24/nextjs-app:latest
gcloud run deploy madcamp-week2-1 --image gcr.io/madcampweek24/nextjs-app:latest --platform managed --region asia-northeast3 --allow-unauthenticated
