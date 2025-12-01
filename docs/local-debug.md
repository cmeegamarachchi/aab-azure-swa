# VS Code Debugging Setup for Azure Functions

This workspace is configured for debugging Azure Functions locally using VS Code.

## Prerequisites

- Node.js (available in this dev container)
- Azure Functions Core Tools (already installed)
- Azure Functions VS Code extension (already installed)

## How to Debug

### One-Click Debugging

1. Open the Debug panel in VS Code (Ctrl+Shift+D)
2. Select "Debug Api" from the dropdown
3. Press F5 or click the green play button
4. This will:
   - Automatically start the Azure Functions host with debugging enabled
   - Wait for the host to initialize
   - Attach the VS Code debugger to the process

## Setting Breakpoints

1. Open your function file (e.g., `api/src/functions/coinbase.js`)
2. Click in the gutter next to line numbers to set breakpoints
3. Make requests to your function endpoints to trigger the breakpoints

## Function Endpoints

With the Functions host running, your endpoints will be available at:
- `http://localhost:7071/api/coinbase` (GET/POST)

## Verification

To verify debugging is working:
1. Set a breakpoint on line 7 in `coinbase.js` (the fetch line)
2. Press F5 to start debugging
3. Make a request to `http://localhost:7071/api/coinbase`
4. The debugger should pause at your breakpoint

## Technical Details

The debugging setup uses:
- Environment variable: `languageWorkers__node__arguments="--inspect=9229"`
- Debug port: 9229
- VS Code automatically manages the Functions host lifecycle

To manually start:

Run following code to launch the debugger
```bash
cd /workspaces/aab-azure-swa/api && FUNCTIONS_WORKER_RUNTIME=node languageWorkers__node__arguments="--inspect=9229" func host start
```

## Troubleshooting

- **Port conflicts**: If port 7071 or 9229 are in use, stop existing processes with `pkill -f func`
- **Debugger not attaching**: Wait for the "Worker process started and initialized" message before the debugger attempts to attach
- **Functions not loading**: Ensure you're in the correct workspace and all dependencies are installed