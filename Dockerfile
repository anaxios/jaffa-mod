FROM oven/bun:latest AS ffmpeg
WORKDIR /app

RUN apt update
RUN apt install ffmpeg -y

FROM ffmpeg AS build
WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY drizzle.config.ts .
COPY bun.lock .

RUN ["bun", "install", "--no-cache"]

FROM build AS development

WORKDIR /app

COPY db/ db/
COPY drizzle/ drizzle/
COPY website/ website/
COPY serve.tsx .

EXPOSE 3000

ENTRYPOINT ["bun", "--hot", "serve.tsx"]

FROM development AS production

EXPOSE 3000

ENTRYPOINT ["bun", "run", "serve.tsx"]