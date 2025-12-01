# Local Development

This guide outlines how to set up and run the project locally for development and debugging. For most local development tasks (except API debugging), it is recommended to use the **Azure Static Web Apps CLI** (`swa`).

---

## Install Dependencies

Install all required dependencies for the API and frontend:

```bash
cd api
npm install

cd ../app
npm install

cd ..
---


## Configure Local Settings

### Update `api/local.settings.json`

Ensure the `local.settings.json` file under `./api/` contains the following configuration:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AZURE_STORAGE_ACCOUNT_CONNECTION_STRING": "UseDevelopmentStorage=true",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AAB_STORAGE_LOCAL_FS_PATH": "/workspaces/axtract/data"
  }
}
```

---

## Running the Project Locally

### 1. Start Azurite (Azure Storage Emulator)

This project may require Azure Storage for local execution. In a separate terminal, start **Azurite**:

```bash
azurite --location ./_azurite --blobPort 10000 --queuePort 10001 --tablePort 10002 --loose --silent
```


### 2. Start the Local Stack (Using Azure SWA CLI)

In another terminal:

```bash
swa build
swa start app/dist --api-location api
```

This will launch the Azure SWA emulator at `http://localhost:4280` with:
- **Frontend:** [http://localhost:4280/.auth/login/azureActiveDirectory](http://localhost:4280/.auth/login/azureActiveDirectory)
- **API:** [http://localhost:4280/api](http://localhost:4280/api)

---

### Optional: Start Local  (Using Azure SWA CLI) with more controll

To have more control over the build/start process with swa cli, you can run the steps manually:

```bash
# Build the frontend
cd app
rm -rf dist
npm run build

# Build the API
cd ../api
npm run clean
npm run build

# Start the local SWA stack
cd ..
swa start app/dist --api-location api
```

---

### Optional: Start Local manually

To start application in full manual mode, without using swa cli

#### Start front end

In a new terminal

```bash
cd app
rm -rf dist
npm run dev
```
This start fronend at `http://localhost:4280`

#### Start api

In a new terminal

```bash
cd api
npm run clean
npm run build
func start
```

This start fronend at `http://localhost:7071/api`


## Debug Locally

To debug the Azure Functions locally:

1. Open the debugger in your editor (e.g., VS Code).
2. Select the **"Debug Azure Functions"** launch configuration.
3. For more details, refer to [`LOCAL_DEBUG_SETUP.md`](LOCAL_DEBUG_SETUP.md).