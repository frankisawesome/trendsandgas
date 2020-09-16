FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install dependencies
RUN npm install

COPY . .

# build front end
RUN npm run build

EXPOSE 3001

# take etherscan api key and prod api url as build time argument 
ARG E=default
ARG A=default

ENV API_ENDPOINT=$A
ENV PORT=3001
ENV ETHERSCAN_KEY=$E

CMD [ "node", "server/index.js" ]