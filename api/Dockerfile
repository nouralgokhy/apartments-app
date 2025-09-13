
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl

FROM base AS deps
COPY package.json package-lock.json* ./

RUN npm install --omit=dev --no-audit --no-fund 

FROM base AS build
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund 
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build 

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund


COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma


COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 4000
CMD ["sh","./start.sh"]
