FROM node:18-alpine AS base

WORKDIR /app


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE 4004

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]