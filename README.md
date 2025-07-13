# AppSolve application blocks, azure static web app implementation

## Features
* Azure App Block based frontend developed using ReactJS
* Azure function app based backend developed using Azure App Block patterns

## Initial setup
### Setup SWA CLI
At project root, run `swa init` and select default options

### Setup azure function app
```bash
cd api
func init
# select 'node' as worker-runtime
# select 'typescript' as language
```

## Run locally
### Frontend
```bash
cd app
npm install
npm run build
cd ..

swa start
```

### Function app
```bash
cd api
npm install
npm run build

func start
```

## Publish
```bash
# at project root
swa deploy --deployment-token=<deployment-token> --env <env such as production>
```
