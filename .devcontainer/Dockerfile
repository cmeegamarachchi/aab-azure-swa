FROM mcr.microsoft.com/devcontainers/typescript-node:22

# azure functions core tools
RUN wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y azure-functions-core-tools-4

# Install Azure Static Web Apps CLI
RUN npm install -g @azure/static-web-apps-cli@2.0.6