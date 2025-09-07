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
    // Optimize bundle size with improved chunking
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for different libraries
          if (id.includes('node_modules')) {
            // React core - keep separate for better caching
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'react-vendor';
            }
            // React ecosystem
            if (id.includes('react-') || id.includes('@tanstack/react-query')) {
              return 'react-ecosystem';
            }
            // Radix UI components - often large
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Utility libraries - usually small, can group together
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority') || id.includes('lucide-react')) {
              return 'utils-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'forms-vendor';
            }
            // Routing
            if (id.includes('wouter')) {
              return 'router-vendor';
            }
            // Other smaller libraries
            return 'misc-vendor';
          }
          
          // Split by route for better code splitting
          if (id.includes('/pages/home')) {
            return 'page-home';
          }
          if (id.includes('/pages/articles')) {
            return 'page-articles';
          }
          if (id.includes('/pages/article')) {
            return 'page-article';
          }
          if (id.includes('/pages/podcasts') || id.includes('/pages/podcast')) {
            return 'page-podcasts';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
          
          // Group components by type
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        // Modern ES modules format
        format: 'es',
        // Optimize chunk sizes
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
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
