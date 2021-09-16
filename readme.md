# CAB 432 Assignment

This is a simple example of serving a React Application from within your Express Server, alongside your API. In this example we have two separate folders, client and server - they each house their respective files and logic. We assume at this point you're able to containerize an application yourself so we have left that as an exercise for you.

### Client

`REACT_APP_PORT` is used to specify the PORT to send request to during the development phrase.

### Server

Environment variables needed by the server

```bash
# The port that the api server is listening
SERVER_PORT
# For OCR https://intl.cloud.tencent.com/document/product/1005/37315
TENCENT_CLOUD_SECRET_ID
TENCENT_CLOUD_SECRET_KEY
# For News https://newsdata.io/docs
NEWS_API_KEY
NODE_TLS_REJECT_UNAUTHORIZED
```

### Modifications

### Getting Started - dev

```bash
# change Dockerfile last line to run dev (nodemon)
CMD ["npm","run", "dev", "--prefix", "/app/server"]
docker build -t assignment1 .
docker run --name app -p 3100:3000 -v $(pwd)/server:/app/server -v /app/server/node_modules -it --rm --env-file .env assignment1
docker exec -it app bash
docker rm app -fv
```

### Deployment

```bash
# change Dockerfile last line to run start
CMD ["npm","run", "start", "--prefix", "/app/server"]
docker run --name app -p 80:3000 -it --rm \
             -e "TENCENT_CLOUD_SECRET_ID=AKIDd8OPAtdCWbR2NVP4JK5brrbHitoVyCBw" \
             -e "TENCENT_CLOUD_SECRET_KEY=czBE4f1A4j8KJ3WjiT3PYVDguytY0Nfs" \
             -e "NEWS_API_KEY=pub_1299aa681b2308b02b14a8510b22779f5f96" \
             -e "NODE_TLS_REJECT_UNAUTHORIZED=0" \
             xiaohaihuang/assignment1
```
