FROM node:15-alpine AS builder

WORKDIR /workspace

COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./yarn.lock .
COPY ./src ./src
COPY ./prisma ./prisma

RUN yarn install
RUN yarn run build

FROM node:15-alpine

WORKDIR /app

COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/yarn.lock .
COPY --from=builder /workspace/prisma ./prisma
COPY --from=builder /workspace/dist ./dist

RUN yarn install --prod

ENTRYPOINT [ "yarn", "run", "start:prod" ]
