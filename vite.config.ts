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
    target: 'es2020', // More conservative target for Safari compatibility
    supported: {
      'top-level-await': false, // Disable top-level await for Safari
      'dynamic-import': true,   // Ensure dynamic imports work
      'import-meta': true       // Ensure import.meta works in Safari
    },
    // Ensure Safari can handle JSX
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
    // Safari compatibility for build target
    target: ['es2020', 'chrome61', 'firefox60', 'safari13'],
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-select'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        // Ensure Safari compatibility in output format
        format: 'es',
      },
    },
    // Generate source maps for production debugging
    sourcemap: true,
    // Ensure Safari can handle the polyfills
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
