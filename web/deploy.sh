gcloud config set project "madcamp-week-2"
docker build . -t nextjs-app:latest
docker tag nextjs-app:latest gcr.io/madcamp-week-2/nextjs-app:latest
docker push gcr.io/madcamp-week-2/nextjs-app:latest
gcloud run deploy madcamp-week2-2 --image gcr.io/madcamp-week-2/nextjs-app:latest --platform managed --region asia-northeast3 --allow-unauthenticated
