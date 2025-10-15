# Install dependencies only when needed
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Configure Prisma for Alpine Linux with OpenSSL 3.x
ENV PRISMA_QUERY_ENGINE_BINARY=query-engine-rhel-openssl-3.0.x
ENV PRISMA_SCHEMA_ENGINE_BINARY=schema-engine-rhel-openssl-3.0.x

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm run build; \
  else npm run build; \
  fi

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Configure Prisma for Alpine Linux with OpenSSL 3.x
ENV PRISMA_QUERY_ENGINE_BINARY=query-engine-rhel-openssl-3.0.x
ENV PRISMA_SCHEMA_ENGINE_BINARY=schema-engine-rhel-openssl-3.0.x

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]