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

# --- STAGE 3: Production Dependencies ---
FROM node:18-alpine AS runner-deps
WORKDIR /app
COPY package.json yarn.lock* ./
# This step ONLY installs 'dependencies', ignoring 'devDependencies' like Cypress/TS
RUN yarn install --production --frozen-lockfile

# --- STAGE 4: Final Lean Production Image ---
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create a secure non-root user for the app to run under
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Only copy what is strictly necessary to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# Use the filtered node_modules from Stage 3
COPY --from=runner-deps /app/node_modules ./node_modules

# Ensure the app can write to its own cache/build folder
RUN chown -R nextjs:nodejs /app/.next

# Switch to the non-root user
USER nextjs

EXPOSE 1919

# Match your specific package.json deploy script
CMD ["yarn", "deploy"]