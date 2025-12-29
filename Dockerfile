# Build stage
FROM node:22 AS build

WORKDIR /app/

COPY package.json package-lock.json ./

RUN npm install -g npm
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:22 AS production

WORKDIR /app/

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts/start-prod.sh ./scripts/start-prod.sh
COPY --from=build /app/prisma ./prisma/

RUN npm install -g npm
RUN npm ci --omit=dev

EXPOSE 8080

RUN chmod +x ./scripts/start-prod.sh

CMD ["./scripts/start-prod.sh"]

# Dev stage
FROM build AS dev

RUN npx prisma generate --allow-no-models

EXPOSE 8080

CMD ["./scripts/start-dev.sh"]
