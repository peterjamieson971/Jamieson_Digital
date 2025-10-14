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
    // Optimized bundle splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // All Radix UI components in one chunk
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          // Framer Motion (animation library)
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') || id.includes('zod')) {
            return 'forms';
          }
          // Icons and visual libraries
          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'icons';
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Modern ES modules format
        format: 'es',
        // Increase chunk size limit to 600KB (still warns at 500KB but less aggressive)
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Increase warning limit to 600KB to reduce noise
    chunkSizeWarningLimit: 600,
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
