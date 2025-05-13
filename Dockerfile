FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY bun.lock .


CMD ["bun", "install"]

FROM build AS development

COPY website/ website/
COPY serve.tsx .

EXPOSE 3000

ENTRYPOINT ["bun", "--hot", "serve.tsx"]

FROM development AS production

EXPOSE 3000

ENTRYPOINT ["bun", "run", "serve.tsx"]