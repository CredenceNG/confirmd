ARG build_image=node:18-alpine
ARG runtime_image=caddy:alpine

# build stage
FROM ${build_image} as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build


# production stage
FROM ${runtime_image} as production-stage
RUN mkdir -p /srv/
COPY --from=build-stage /app/client/build /srv/

# Fix permissions issue with Caddy image
# - Between version 2.6.2 and 2.6.3 there were some permissions changes on the official images that stopped them from working on OpenShift.
# - This update resolves that permissions issue for OCP.
RUN chown 1001:root /usr/bin/caddy