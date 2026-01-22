# --- STAGE 1: Install ALL dependencies (for building) ---
FROM node:18-alpine AS deps
# Install libc6-compat because Next.js/React-scripts often need it on Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# --- STAGE 2: Build the application ---
FROM node:18-alpine AS builder
WORKDIR /app
# Bring in all node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the Next.js build (creates the .next folder)
RUN yarn build

# --- STAGE 3: Final Production Image ---
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
# Hardcode the port here because we bypass package.json scripts
ENV PORT=1919

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 1. Copy public assets (images, robots.txt)
COPY --from=builder /app/public ./public

# 2. Copy the standalone server (The minimal app)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 3. Copy static assets (CSS, JS chunks)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 1919

# Start the standalone server directly
CMD ["node", "server.js"]