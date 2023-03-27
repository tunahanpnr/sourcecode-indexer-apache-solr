FROM node:18-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
