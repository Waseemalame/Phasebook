# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.224.3/containers/python-3/.devcontainer/base.Dockerfile

# [Choice] Python version (use -bullseye variants on local arm64/Apple Silicon): 3, 3.10, 3.9, 3.8, 3.7, 3.6, 3-bullseye, 3.10-bullseye, 3.9-bullseye, 3.8-bullseye, 3.7-bullseye, 3.6-bullseye, 3-buster, 3.10-buster, 3.9-buster, 3.8-buster, 3.7-buster, 3.6-buster
ARG VARIANT="3.10-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="none"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Install Postgres - remove/comment out lines 12-18 if you are using sqlite
RUN sudo apt update
RUN sudo apt install postgresql -y && \
sudo service postgresql start && \
sudo -u postgres psql -c "CREATE USER vscode WITH PASSWORD 'password';" && \
sudo -u postgres psql -c "ALTER USER vscode WITH SUPERUSER;" && \
sudo -u postgres psql -c "CREATE DATABASE vscode WITH OWNER vscode" && \
sudo -u postgres psql -c "CREATE DATABASE python_project WITH OWNER vscode"

# auto configure flask app to connect to internal postgres.  this will need to
# be updated to connect to your sqlite3 database file instead of postgres
ENV DATABASE_URL=postgresql://vscode:password@localhost/python_project
