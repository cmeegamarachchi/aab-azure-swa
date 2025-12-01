# Azure Static Web Apps Boilerplate

A comprehensive boilerplate application for Azure Static Web Apps featuring a modern React frontend with TypeScript and Azure Functions backend.

## Overview

This project provides a production-ready foundation for building full-stack applications on Azure Static Web Apps. It implements Azure App Block patterns and includes modern development tooling, TypeScript support, and a well-structured codebase suitable for enterprise applications.

## Architecture

- **Frontend**: React 18 with TypeScript, Vite build system, Tailwind CSS
- **Backend**: Azure Functions with TypeScript
- **Deployment**: Azure Static Web Apps with integrated CI/CD
- **Development**: SWA CLI for local development and testing

## Features

- Modern React application with TypeScript support
- Azure Functions API with TypeScript
- Tailwind CSS for styling with shadcn/ui components
- Contact management functionality (demo feature)
- Responsive design with mobile-first approach
- ESLint and TypeScript configuration
- Production-ready build configuration
- Local development environment setup

## Prerequisites

- Node.js 18 or higher
- Azure CLI (for deployment)
- SWA CLI (`npm install -g @azure/static-web-apps-cli`)
- Azure Functions Core Tools (for local API development)

## Getting Started

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd aab-azure-swa
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd app
npm install

# Install backend dependencies
cd ../api
npm install
cd ..
```

### Local Development

#### Option 1: Full Stack Development (Recommended)
```bash
# Build the frontend
cd app
npm run build
cd ..

# Start the full application with SWA CLI
swa start
```

#### Option 2: Separate Development
For backend API development:
```bash
cd api
npm install
npm run build
func start
```

For frontend development:
```bash
cd app
npm install
npm run dev
```

The application will be available at `http://localhost:4280` when using SWA CLI.

## Project Structure

```
├── api/                          # Azure Functions backend
│   ├── src/
│   │   ├── functions/           # API endpoints
│   │   ├── models/              # Data models
│   │   └── services/            # Business logic
│   └── package.json
├── app/                          # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── features/            # Feature-specific components
│   │   ├── hooks/               # Custom React hooks
│   │   └── providers/           # Context providers
│   └── package.json
├── swa-cli.config.json          # SWA CLI configuration
└── staticwebapp.config.json     # Azure SWA configuration
```

## Deployment

### Prerequisites
- Azure subscription
- Azure Static Web Apps resource created in Azure Portal

### Deploy to Azure

1. Build the application
```bash
swa build
```

2. Deploy using SWA CLI
```bash
swa deploy --deployment-token=<your-deployment-token> --env production
```

Alternatively, you can set up GitHub Actions for automated deployment by connecting your repository to Azure Static Web Apps through the Azure Portal.

## Configuration

### Static Web App Configuration

The `app/staticwebapp.config.json` file controls application behavior including:
- Routing rules
- Authentication settings
- API route configuration
- Security headers

### SWA CLI Configuration

The `swa-cli.config.json` file contains default settings for the SWA CLI including:
- Local development ports
- Build output directories
- API location

## Development Guidelines

### Code Quality
- TypeScript is enforced across both frontend and backend
- ESLint configuration is provided for code consistency
- Follow the established folder structure for maintainability

### Adding New Features
1. Create feature-specific folders under `app/src/features/`
2. Add corresponding API endpoints under `api/src/functions/`
3. Update models and services as needed
4. Maintain TypeScript interfaces for type safety

## Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all TypeScript interfaces are properly defined
3. Test locally using SWA CLI before submitting changes
4. Update documentation for any new features or configuration changes

## License

See [LICENSE](LICENSE) file for details.