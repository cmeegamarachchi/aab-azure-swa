FROM mcr.microsoft.com/devcontainers/typescript-node:22

ARG SWA_VERSION=2.0.7
ARG AZURE_FUNCTION_CORE_TOOL_VERSION=4
ARG AZURITE_VERSION=3.34.0

# Install Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    python3-venv \
    build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# azure functions core tools
RUN wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y azure-functions-core-tools-${AZURE_FUNCTION_CORE_TOOL_VERSION}

# Install Azure Static Web Apps CLI
RUN npm install -g @azure/static-web-apps-cli@${SWA_VERSION} && \
    npm install -g azurite@${AZURITE_VERSION} && \
    npm cache clean --force