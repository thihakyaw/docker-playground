FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 30000
CMD ["npm", "run", "dev"]