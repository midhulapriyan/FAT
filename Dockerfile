FROM node:20-alpine

WORKDIR /app

COPY src/package.json ./package.json
RUN npm install --omit=dev

COPY src/ .

EXPOSE 3000
CMD ["npm", "start"]