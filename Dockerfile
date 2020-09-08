FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3001

ENV PORT=3001
ENV ETHERSCAN_KEY=2CTSQ245YKKA55TZBR12S5XHP4UGM9TF9W

CMD [ "node", "server/index.js" ]