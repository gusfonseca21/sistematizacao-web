FROM oven/bun:1.0.29 AS base
WORKDIR /front

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

RUN bun run build

USER bun
EXPOSE 4173
CMD [ "bun", "run", "serve" ]
