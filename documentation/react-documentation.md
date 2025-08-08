# React Documentation

This document contains essential React documentation and code examples relevant to this project.

## Overview
React is a JavaScript library for building user interfaces. Version 18.3.1 is used in this project with TypeScript support.

## Installation Commands

### Install React and ReactDOM
```bash
npm install react react-dom
```

### Install React 19 (if upgrading)
```bash
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
```

## Basic Component Structure

### Functional Component Example
```javascript
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

### Component with State
```javascript
import { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>Hello, world!</h1>
      <Counter />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}
```

## Key React Hooks

### useEffect Hook
```javascript
useEffect(setup, dependencies?)
```

**Parameters:**
- `setup`: The function with your Effect's logic
- `dependencies`: Array of reactive values (optional)

**Example:**
```javascript
import { useState, useEffect, useRef } from 'react';

function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(1000);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1 ref={ref}>Welcome</h1>
  );
}
```

## Context API

### Creating Context
```javascript
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

### Using Context
```javascript
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

## State Management with useReducer

### Complete Context + Reducer Example
```javascript
import { useReducer } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext>
    </TasksContext>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

## Suspense for Data Fetching

### Basic Suspense Setup
```javascript
import { Suspense } from 'react';
import Albums from './Albums.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```

## Migration Notes

### ReactDOM.render to createRoot
```javascript
// Before
import {render} from 'react-dom';
render(<App />, document.getElementById('root'));

// After
import {createRoot} from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## Development Setup

### HTML Structure
```html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Entry Point (index.js)
```javascript
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## React Compiler (Optional)

### Install React Compiler
```bash
npm install -D babel-plugin-react-compiler@rc
```

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig]
        ]
      }
    })
  ]
});
```

## Best Practices

1. Use functional components with hooks
2. Keep components small and focused
3. Use TypeScript for better type safety
4. Implement proper error boundaries
5. Use Suspense for data fetching
6. Follow the rules of hooks
7. Use React DevTools for debugging

## Related Documentation
- [TypeScript Documentation](./typescript-documentation.md)
- [Vite Documentation](./vite-documentation.md)
- [Express Documentation](./express-documentation.md)