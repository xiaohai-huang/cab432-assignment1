FROM node:16
# Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils

# Node process management
RUN npm install pm2@latest -g

# Client
WORKDIR /app/client
COPY /client/package.json .
COPY /client/package-lock.json .
RUN npm install



# Server
WORKDIR /app/server
COPY /server/package.json .
COPY /server/package-lock.json .
RUN npm install
RUN chmod -R o+rwx ./node_modules/puppeteer/.local-chromium



# Copy source code
WORKDIR /app/client
COPY ./client .
RUN npm run build

WORKDIR /app/server
COPY ./server .

ENV SERVER_PORT=3000
EXPOSE $SERVER_PORT

# CMD ["npm","run", "dev", "--prefix", "/app/server"]
CMD ["npm","run", "start", "--prefix", "/app/server"]
