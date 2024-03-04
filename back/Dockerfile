FROM oven/bun:1.0.29 AS base
WORKDIR /back

FROM base AS install
RUN mkdir -p /temp/dev-back
COPY package.json bun.lockb /temp/dev-back/
RUN cd /temp/dev-back && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/dev-back/node_modules node_modules
COPY . .

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "start" ]
