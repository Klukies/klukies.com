# This file is moved to the root directory before building the image
FROM node:18-alpine as base
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as dev-dependencies
WORKDIR /myapp
ADD package.json package-lock.json ./
ADD /scripts/postinstall.sh ./scripts/postinstall.sh
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-dependencies
WORKDIR /myapp
COPY --from=dev-dependencies /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

# Build the app
FROM base as build
WORKDIR /myapp
COPY --from=dev-dependencies /myapp/node_modules /myapp/node_modules
ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base
ENV FLY="true"
ENV PORT="8080"
WORKDIR /myapp
COPY --from=production-dependencies /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/server-build /myapp/server-build
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
ADD . .
CMD ["npm", "start"]
