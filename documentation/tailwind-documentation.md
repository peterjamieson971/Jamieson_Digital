# Tailwind CSS Documentation

This document contains essential Tailwind CSS documentation and code examples relevant to this project.

## Overview
Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. Version 3.4.17 is used in this project.

## Installation Commands

### Install Tailwind CSS with Vite
```bash
npm install tailwindcss @tailwindcss/vite
```

### Install with PostCSS
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

### Install CLI
```bash
npm install tailwindcss @tailwindcss/cli
```

## Project Setup

### Create New Vite Project
```bash
npm create vite@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

### Vite Configuration
```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

### Import in CSS
```css
@import "tailwindcss";
```

## HTML Integration

### Basic HTML Structure
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/src/style.css" rel="stylesheet">
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </body>
</html>
```

### CDN (for prototyping)
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

## Core Utility Classes

### Typography
```html
<!-- Text sizes -->
<p class="text-sm">Small text</p>
<p class="text-base">Base text</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>
<p class="text-2xl">2X large text</p>
<p class="text-3xl">3X large text</p>

<!-- Font weight -->
<p class="font-thin">Thin</p>
<p class="font-normal">Normal</p>
<p class="font-medium">Medium</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified</p>
```

### Colors
```html
<!-- Text colors -->
<p class="text-red-500">Red text</p>
<p class="text-blue-600">Blue text</p>
<p class="text-green-700">Green text</p>

<!-- Background colors -->
<div class="bg-red-100">Light red background</div>
<div class="bg-blue-500">Blue background</div>
<div class="bg-gray-800">Dark gray background</div>

<!-- Border colors -->
<div class="border border-red-500">Red border</div>
<div class="border-2 border-blue-400">Thick blue border</div>
```

### Layout and Positioning

#### Flexbox
```html
<!-- Flex container -->
<div class="flex">
  <div class="flex-1">Item 1</div>
  <div class="flex-1">Item 2</div>
  <div class="flex-1">Item 3</div>
</div>

<!-- Flex direction -->
<div class="flex flex-col">Column layout</div>
<div class="flex flex-row">Row layout</div>

<!-- Alignment -->
<div class="flex items-center justify-center">
  Centered content
</div>

<div class="flex items-start justify-between">
  Space between items
</div>
```

#### Grid
```html
<!-- Grid container -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Responsive item</div>
</div>

<!-- Grid alignment -->
<div class="grid justify-items-center">
  <div>Centered item</div>
</div>
```

### Spacing
```html
<!-- Padding -->
<div class="p-4">Padding on all sides</div>
<div class="px-6 py-3">Horizontal and vertical padding</div>
<div class="pt-2 pr-4 pb-6 pl-8">Individual padding</div>

<!-- Margin -->
<div class="m-4">Margin on all sides</div>
<div class="mx-auto">Horizontal centering</div>
<div class="mt-8 mb-4">Top and bottom margin</div>
```

### Sizing
```html
<!-- Width -->
<div class="w-full">Full width</div>
<div class="w-1/2">Half width</div>
<div class="w-64">Fixed width (16rem)</div>
<div class="w-auto">Auto width</div>

<!-- Height -->
<div class="h-screen">Full viewport height</div>
<div class="h-64">Fixed height</div>
<div class="h-auto">Auto height</div>
```

## Responsive Design

### Breakpoint Prefixes
```html
<!-- Responsive text sizes -->
<h1 class="text-lg md:text-xl lg:text-2xl xl:text-3xl">
  Responsive heading
</h1>

<!-- Responsive layout -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">Column on mobile, half-width on desktop</div>
  <div class="w-full md:w-1/2">Column on mobile, half-width on desktop</div>
</div>

<!-- Hide/show at breakpoints -->
<div class="hidden md:block">Hidden on mobile, visible on desktop</div>
<div class="block md:hidden">Visible on mobile, hidden on desktop</div>
```

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## State Variants

### Hover and Focus
```html
<!-- Hover effects -->
<button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4">
  Hover me
</button>

<!-- Focus effects -->
<input class="border focus:border-blue-500 focus:outline-none p-2" />

<!-- Active state -->
<button class="bg-gray-300 active:bg-gray-400 p-2">
  Press me
</button>
```

### Form States
```html
<!-- Required, invalid, disabled -->
<input class="required:border-red-500 invalid:border-red-600 disabled:opacity-50" />

<!-- Checked state -->
<input type="checkbox" class="checked:bg-blue-500" />
```

## Dark Mode

### Enable Dark Mode
```html
<!-- Dark mode variants -->
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content that adapts to dark mode
</div>

<!-- Dark mode specific styles -->
<h1 class="text-gray-900 dark:text-gray-100">
  Dark mode heading
</h1>
```

## Custom Styles and Configuration

### Using @apply Directive
```css
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700;
}

.card {
  @apply bg-white shadow-lg rounded-lg p-6;
}
```

### Arbitrary Values
```html
<!-- Custom spacing -->
<div class="p-[17px]">Custom padding</div>

<!-- Custom colors -->
<div class="bg-[#1da1f2]">Custom background color</div>

<!-- Custom grid -->
<div class="grid-cols-[1fr_500px_2fr]">Custom grid template</div>
```

### CSS Variables
```html
<!-- Using CSS custom properties -->
<div class="opacity-[var(--my-opacity)]">Custom opacity</div>
<div class="backdrop-brightness-[var(--my-backdrop-brightness)]">
  Custom backdrop
</div>
```

## Common Patterns

### Card Component
```html
<div class="bg-white shadow-lg rounded-lg p-6 m-4">
  <h2 class="text-xl font-semibold mb-2">Card Title</h2>
  <p class="text-gray-600 mb-4">Card description goes here.</p>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Action
  </button>
</div>
```

### Navigation Bar
```html
<nav class="bg-gray-800 text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <div class="text-xl font-bold">Logo</div>
    <div class="space-x-4">
      <a href="#" class="hover:text-gray-300">Home</a>
      <a href="#" class="hover:text-gray-300">About</a>
      <a href="#" class="hover:text-gray-300">Contact</a>
    </div>
  </div>
</nav>
```

### Form Styling
```html
<form class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Email
    </label>
    <input 
      type="email" 
      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
  
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Password
    </label>
    <input 
      type="password" 
      class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
  
  <button 
    type="submit" 
    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
  >
    Sign In
  </button>
</form>
```

## Build Process

### CLI Usage
```bash
# Build CSS
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

# Production build (with purging)
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --minify
```

### Development vs Production
```bash
# Development
npm run dev

# Production build
npm run build
```

## Performance Optimization

### Purging Unused CSS
Tailwind automatically purges unused styles in production builds when using modern build tools.

### JIT (Just-In-Time) Compilation
Tailwind v3+ uses JIT compilation by default, generating styles on-demand for better performance.

## Plugins

### Official Plugins
```bash
# Typography plugin
npm install @tailwindcss/typography

# Forms plugin  
npm install @tailwindcss/forms

# Aspect ratio plugin
npm install @tailwindcss/aspect-ratio
```

## Framework Integration

### React/JSX
```jsx
function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 font-semibold rounded-lg focus:outline-none';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

### Vue.js
```vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in items" :key="item.id" class="bg-white p-6 rounded-lg shadow">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
```

## Best Practices

1. **Use semantic HTML** - Tailwind enhances HTML, doesn't replace it
2. **Component extraction** - Extract repeated utility combinations into components
3. **Responsive-first** - Start with mobile styles, add larger breakpoints as needed
4. **Consistent spacing** - Use the spacing scale consistently
5. **Limit custom styles** - Prefer utilities over custom CSS when possible
6. **Use design tokens** - Stick to the built-in color and spacing scales
7. **Performance conscious** - Understand how purging works
8. **Accessibility** - Don't forget focus states and semantic markup

## Related Documentation
- [React Documentation](./react-documentation.md)
- [Vite Documentation](./vite-documentation.md)
- [TypeScript Documentation](./typescript-documentation.md)