# Vite Documentation

This document contains essential Vite documentation and code examples relevant to this project.

## Overview
Vite is a next-generation frontend build tool that provides instant server start and lightning-fast HMR. Version 5.4.19 is used in this project.

## Installation Commands

### Create New Vite Project
```bash
npm create vite@latest
yarn create vite
pnpm create vite
bun create vite
```

### Create with Specific Template
```bash
npm create vite@latest my-app -- --template react
yarn create vite my-app --template react
pnpm create vite my-app --template react
```

### Install Vite CLI Locally
```bash
npm install -D vite
yarn add -D vite
pnpm add -D vite
```

## Project Setup

### Basic package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Start Development Server
```bash
npm run dev
npx vite
yarn vite
pnpm vite
```

### Build for Production
```bash
npm run build
vite build
```

### Preview Production Build
```bash
npm run preview
vite preview
```

## HTML Entry Point

### Basic index.html Structure
```html
<!doctype html>
<html>
  <head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <img src="/src/images/logo.svg" alt="logo" />
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## JavaScript API

### Create Development Server
```typescript
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const server = await createServer({
  configFile: false,
  root: __dirname,
  server: {
    port: 1337,
  },
})

await server.listen()
server.printUrls()
server.bindCLIShortcuts({ print: true })
```

### Preview Server
```typescript
import { preview } from 'vite'

const previewServer = await preview({
  preview: {
    port: 8080,
    open: true,
  },
})

previewServer.printUrls()
previewServer.bindCLIShortcuts({ print: true })
```

## Asset Handling

### Dynamic Imports
```javascript
// Basic glob import
const modules = import.meta.glob('/dir/**/*')
Promise.all(Object.keys(modules).map(key => modules[key]()))
  .then(mods => {
    // Handle loaded modules
  })

// Import from node_modules
const nodeModules = import.meta.glob('/dir/node_modules/**/*')
```

### JSON Imports
```javascript
// Standard JSON import
import data from './data.json'

// JSON as URL
import url from './test.json?url'

// Import assertion syntax
import * as data from './data.json' assert { type: 'json' }
```

### Raw Asset Imports
```javascript
// Import SVG as raw string
import bundlerSvg from '../images/bundler.svg?raw'
import esmSvg from '../images/esm.svg?raw'
```

## Web Workers

### Standard Worker
```javascript
// Using new Worker
const worker = new Worker(new URL('./worker.js', import.meta.url))

// Using Vite's import syntax
import MyWorker from './worker.js?worker'
const worker = new MyWorker()
```

### Shared Workers
```javascript
// Basic SharedWorker
import MySharedWorker from './shared-worker.js?sharedworker'
const sharedWorker = new MySharedWorker()

// With module type
new SharedWorker(new URL('./worker.js', import.meta.url), { type: 'module' })

// Inline SharedWorker
import InlineSharedWorker from './worker.js?sharedworker&inline'
```

## CSS Processing

### Install CSS Preprocessors
```bash
# Sass/SCSS
npm add -D sass-embedded # or sass

# Less
npm add -D less

# Stylus
npm add -D stylus
```

### Lightning CSS (Experimental)
```bash
npm add -D lightningcss
```

## Configuration

### Basic vite.config.js
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration options
})
```

### Framework Plugin Example
```javascript
// framework-plugin
import frameworkRefresh from 'vite-plugin-framework-refresh'
import frameworkDevtools from 'vite-plugin-framework-devtools'

export default function framework(config) {
  return [frameworkRefresh(config), frameworkDevTools(config)]
}
```

### Server Configuration
```javascript
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    warmup: {
      clientWarmup: ['src/main.js'],
    }
  }
})
```

## Build Configuration

### Build Manifest
```json
{
  "views/foo.js": {
    "file": "assets/foo-BRBmoGS9.js",
    "name": "foo",
    "src": "views/foo.js",
    "isEntry": true,
    "imports": ["_shared-B7PI925R.js"],
    "css": ["assets/foo-5UjPuW-k.css"]
  }
}
```

### Module Preload Configuration
```javascript
export default defineConfig({
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        return deps.filter(condition);
      },
    },
  },
})
```

## Performance

### Server Warmup
```javascript
export default defineConfig({
  server: {
    warmup: {
      clientWarmup: ['src/main.js'],
    }
  }
})
```

### Optimization Configuration
```javascript
export default defineConfig({
  optimizeDeps: {
    holdUntilCrawlEnd: false, // New strategy for better cold starts
  }
})
```

### Profiling
```bash
vite --profile --open
```

## CLI Commands

### Development Server
```bash
vite [root]
vite dev
vite serve

# Options:
# --host [host]           Specify hostname
# --port <port>           Specify port
# --open [path]           Open browser on startup
# --cors                  Enable CORS
# --strictPort            Exit if port is in use
# --force                 Force optimizer to re-bundle
```

### Build Commands
```bash
vite build
vite build --ssr

# For environment-specific builds
vite build --mode production
```

### Preview Command
```bash
vite preview

# Preview with specific port
vite preview --port 8080
```

## Environment Variables

### Define Configuration
```javascript
// In vite.config.js
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
```

### Using in Code
```javascript
// Access environment variables
text('.process-node-env', process.env.NODE_ENV);
text('.process-env', JSON.stringify(process.env, null, 2));

// Custom defines
text('.define-in-environment', JSON.stringify(__DEFINE_IN_ENVIRONMENT__));
```

## Module Runner (Advanced)

### ModuleRunner Setup
```javascript
import {
  ModuleRunner,
  ESModulesEvaluator,
  createNodeImportMeta,
} from 'vite/module-runner'
import { transport } from './rpc-implementation.js'

const moduleRunner = new ModuleRunner(
  {
    transport,
    createImportMeta: createNodeImportMeta,
  },
  new ESModulesEvaluator(),
)

await moduleRunner.import('/src/entry-point.js')
```

## Deployment

### Static Deployment Scripts
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Netlify CLI Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Initialize site
ntl init

# Deploy to preview
ntl deploy

# Deploy to production
ntl deploy --prod
```

### Vercel Deployment
```bash
npm i -g vercel
vercel init vite
```

### Surge.sh Deployment
```bash
npm install -g surge
npm run build
surge dist
```

## Troubleshooting

### SSL Certificate (macOS)
```bash
security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain-db your-cert.cer
```

### Performance Issues
- Use `vite --profile` to identify bottlenecks
- Avoid barrel file patterns that import unused modules
- Configure `server.warmup` for better startup times

### Development Setup
```bash
# Clone and build from source
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link --global
```

## Best Practices

1. Use ES modules for better tree shaking
2. Configure `server.warmup` for frequently used modules  
3. Use dynamic imports for code splitting
4. Optimize dependencies with `optimizeDeps`
5. Use proper asset imports (`?raw`, `?url`, etc.)
6. Configure module preloading for better performance
7. Use environment-specific builds
8. Enable source maps for debugging

## Related Documentation
- [React Documentation](./react-documentation.md)
- [TypeScript Documentation](./typescript-documentation.md)
- [Express Documentation](./express-documentation.md)