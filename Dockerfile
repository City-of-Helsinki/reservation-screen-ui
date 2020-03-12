# ===============================================
FROM helsinkitest/node:12-slim as appbase
# ===============================================

# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# Global npm deps in a non-root user directory
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin

# Set env
ARG PORT
ENV PORT $PORT

# Use non-root user
USER appuser

# Copy package.json and package-lock.json/yarn.lock files
COPY --chown=appuser:appuser package*.json *yarn* ./

# Copy internals becaused they are called in preinstall and postinstall
# hooks
COPY --chown=appuser:appuser internals/ ./internals/

# Make scripts in dependencies available through path
ENV PATH /app/node_modules/.bin:$PATH

USER root

# Build scripts for production stage rely on devDependencies. When
# NODE_ENV is production, some of these dependencies would not be
# installed. For this purpose, we are setting NODE_ENV to "develop" for
# the durationo this RUN command to ensure that all dependencies are
# installed.
RUN export NODE_ENV=develop && \
    apt-install.sh \
       build-essential \
       autoconf \
       libpng-dev && \
    su appuser -c "npm install" && \
    apt-cleanup.sh build-essential

USER appuser

# =============================
FROM appbase as development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Copy all files
COPY --chown=appuser:appuser . .

# Bake package.json start command into the image
CMD ["npm", "start"]

# =============================
FROM appbase as staticbuilder
# =============================

# Set NODE_ENV to production for build
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Copy all files
COPY --chown=appuser:appuser . .

RUN npm run build

# =============================
FROM appbase as production
# =============================

# Set NODE_ENV to production in the production container
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Copy server
COPY --from=staticbuilder --chown=appuser:appuser /app/server /app/server

# Copy build folder
COPY --from=staticbuilder --chown=appuser:appuser /app/build /app/build/

# Start server
CMD ["npm", "run", "start:prod"]