FROM node:alpine
WORKDIR /ecommerce
COPY package*.json ./
RUN npm install
CMD ["node", "index.js"]
CMD /wait-for-it.sh db:3306
COPY . .