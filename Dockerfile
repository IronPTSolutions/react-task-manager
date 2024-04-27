FROM node:18.19.0 as builder

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

COPY ./web /opt/web
WORKDIR opt/web
RUN npm ci
RUN npm run build

FROM node:18.19.0-alpine3.17

COPY ./api /opt/iron-tasks
WORKDIR /opt/iron-tasks
COPY --from=builder /opt/web/dist /opt/iron-tasks/web/build
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]
