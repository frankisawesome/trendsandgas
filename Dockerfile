FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install dependencies
RUN apt-get update
RUN apt-get install redis-server -y
RUN npm install


COPY . .

# build front end
RUN npm run build

EXPOSE 3001

# build arguments
## etherscan api key
ARG E=default
## production api ip
ARG A=default
## redis instance ip
ARG R=default
## mongo db ip
ARG M=default

# cast build arguments as environment variables
ENV API_ENDPOINT=$A
ENV PORT=3001
ENV ETHERSCAN_KEY=$E
ENV REDIS_URL=$R
ENV MONGO_URL=$M

CMD [ "npm", "run", "server" ]