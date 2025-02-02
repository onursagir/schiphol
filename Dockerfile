# ==== Base ====
FROM node:22.13-alpine AS root

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
    corepack prepare pnpm@9.3.0 --activate

# ==== Installer ====
FROM root AS installer

WORKDIR /app

COPY .gitignore .gitignore
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY package.json /app/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ==== Base ====
FROM root AS base

WORKDIR /app

COPY --from=installer /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=installer /app/node_modules /app/node_modules
COPY . .

ARG PORT=5173
ENV PORT=${PORT}

EXPOSE ${PORT}
# ==== Dev ====
FROM base AS dev

WORKDIR /app

ENTRYPOINT ["sh", "-c", "pnpm dev --host --port $PORT"]
#  ==== Prod ====
FROM base AS prod

WORKDIR /app

RUN pnpm build

ENTRYPOINT ["sh", "-c", "pnpm start --host --port $PORT"]
