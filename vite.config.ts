import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
  ],
  // Safari compatibility settings
  define: {
    global: 'globalThis',
    // Safari polyfills
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  esbuild: {
    target: 'es2021', // Modern target that supports BigInt
    supported: {
      'top-level-await': false, // Still disable for broader compatibility
      'dynamic-import': true,   // Ensure dynamic imports work
      'import-meta': true,      // Ensure import.meta works
      'bigint': true            // Ensure BigInt support
    },
    // Ensure JSX works properly
    jsx: 'automatic',
    jsxDev: process.env.NODE_ENV === 'development'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Modern build target that supports BigInt (required by Drizzle ORM)
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for different libraries
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'utils';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform')) {
              return 'forms';
            }
            // Query libraries
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            // Other node_modules go into vendor
            return 'vendor';
          }
          // Component chunks for lazy loading
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        },
        // Modern ES modules format
        format: 'es',
      },
    },
    // Generate source maps for production debugging
    sourcemap: true,
    // Module preload polyfill for older browsers
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    // Server warmup for better cold start performance
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/pages/*.tsx',
        './src/components/*.tsx',
      ],
    },
  },
  // Optimize dependency handling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'wouter',
      '@tanstack/react-query',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
    ],
  },
});
