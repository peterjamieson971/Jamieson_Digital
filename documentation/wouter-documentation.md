# Wouter Documentation

This document contains essential Wouter routing documentation and code examples relevant to this project.

## Overview
Wouter is a super-tiny, hook-based router for React and Preact apps, offering a minimal dependency footprint and a familiar API. Version 3.3.5 is used in this project.

## Installation

### Install Wouter
```bash
npm i wouter
```

### For Preact Projects
```bash
npm install wouter-preact
```

## Basic Routing Components

### Basic App Structure
```javascript
import { Link, Route, Switch } from "wouter";

const App = () => (
  <>
    <Link href="/users/1">Profile</Link>

    <Route path="/about">About Us</Route>

    {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
    <Switch>
      <Route path="/inbox" component={InboxPage} />

      <Route path="/users/:name">
        {(params) => <>Hello, {params.name}!</>}
      </Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);
```

## Core Components

### Route Component
```javascript
import { Route } from "wouter";

// Simple form
<Route path="/home"><Home /></Route>

// Render-prop style
<Route path="/users/:id">
  {params => <UserPage id={params.id} />}
</Route>

// Component prop - params will be passed down to Orders
<Route path="/orders/:status" component={Orders} />
```

### Link Component
```javascript
import { Link } from "wouter"

// Basic usage
<Link href="/">Home</Link>

// 'to' is an alias for 'href'
<Link to="/">Home</Link>

// Standard 'a' props are proxied
<Link href="/" className="link" aria-label="Go to homepage">Home</Link>

// Location hook options supported
<Link href="/" replace state={{ animate: true }} />
```

### Link with Dynamic Styling
```jsx
// Dynamic className based on active state
<Link className={(active) => (active ? "active" : "")}>Nav</Link>
```

### Link with Custom Component
```jsx
// Using asChild prop with custom component
<Link to="/" asChild>
  <UIKitLink />
</Link>

// Remember: UIKitLink must implement an onClick handler for navigation to work
```

### Switch Component
```javascript
import { Route, Switch } from "wouter";

<Switch>
  <Route path="/orders/all" component={AllOrders} />
  <Route path="/orders/:status" component={Orders} />

  {/* 
     Default route behavior within Switch. 
     Note: Order matters!
  */}
  <Route>This is rendered when nothing above has matched</Route>
</Switch>
```

### Default Route
```javascript
<Switch>
  <Route path="/about">...</Route>
  <Route>404, Not Found!</Route>
</Switch>
```

### Redirect Component
```jsx
import { Redirect } from "wouter";

// Basic redirect
<Redirect to="/" />

// With state object
<Redirect to="/" state={{ modal: true }} />

// Using replaceState
<Redirect to="/" replace />
```

## Core Hooks

### useLocation Hook
```javascript
import { useLocation } from "wouter";

const CurrentLocation = () => {
  const [location, navigate] = useLocation();

  return (
    <div>
      {`The current page is: ${location}`}
      <a onClick={() => navigate("/somewhere")}>Click to update</a>
    </div>
  );
};
```

### Navigation Options with useLocation
```jsx
const [location, navigate] = useLocation();

navigate("/jobs"); // pushState is used
navigate("/home", { replace: true }); // replaceState is used

// With state
navigate("/home", { state: { modal: "promo" } });
history.state; // { modal: "promo" }
```

### useRoute Hook
```javascript
import { useRoute } from "wouter";

const Users = () => {
  // `match` is a boolean
  const [match, params] = useRoute("/users/:name");

  if (match) {
    return <>Hello, {params.name}!</>;
  } else {
    return null;
  }
};
```

### useParams Hook
```javascript
import { Route, useParams } from "wouter";

const User = () => {
  const params = useParams();

  params.id; // "1"
  
  // alternatively, use the index to access the prop
  params[0]; // "1"
};

<Route path="/user/:id" component={User}> </Route>
```

### useSearch Hook
```jsx
import { useSearch } from "wouter";

// returns "tab=settings&id=1" (without the ? character)
const searchString = useSearch();
```

### useSearchParams Hook
```jsx
import { useSearchParams } from 'wouter';

const [searchParams, setSearchParams] = useSearchParams();

// Extract a specific search parameter
const id = searchParams.get('id');

// Modify a specific search parameter
setSearchParams((prev) => {
  prev.set('tab', 'settings');
});

// Override all search parameters
setSearchParams({
  id: 1234,
  tab: 'settings',
});

// Push new history entry by default
// To avoid this, set `replace` option to `true`
setSearchParams(
  (prev) => {
    prev.set('order', 'desc');
  },
  {
    replace: true,
  },
);

// Pass history state in options
setSearchParams(
  (prev) => {
    prev.set('foo', 'bar');
  },
  {
    state: 'hello',
  },
);
```

### useRouter Hook
```javascript
import { useRouter } from "wouter";

const Custom = () => {
  const router = useRouter();

  router.hook; // `useBrowserLocation` by default
  router.base; // "/app"
};

const App = () => (
  <Router base="/app">
    <Custom />
  </Router>
);
```

## Router Configuration

### Router Component
```jsx
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const App = () => (
  <Router hook={useHashLocation} base="/app">
    {/* Your app goes here */}
  </Router>
);
```

### Router with Base Path
```javascript
import { Router, Route, Link } from "wouter";

const App = () => (
  <Router base="/app">
    {/* the link's href attribute will be "/app/users" */}
    <Link href="/users">Users</Link>

    <Route path="/users">The current path is /app/users!</Route>
  </Router>
);
```

### Nested Routers with Base Paths
```javascript
<Router base="/app">
  <Router base="/cms">
    <Route path="/users">Path is /app/cms/users!</Route>
  </Router>
</Router>
```

## Pattern Matching

### Route Pattern Examples
```javascript
useRoute("/app/:page");
useRoute("/app/:page/:section");

// Optional parameter, matches "/en/home" and "/home"
useRoute("/:locale?/home");

// Suffixes
useRoute("/movies/:title.(mp4|mov)");

// Wildcards, matches "/app", "/app-1", "/app/home"
useRoute("/app*");

// Optional wildcards, matches "/orders", "/orders/"
// and "/orders/completed/list"
useRoute("/orders/*?");

// Regex for matching complex patterns,
// matches "/hello:123"
useRoute(/^[/]([a-z]+):([0-9]+)[/]?$/);

// Named capture groups
useRoute(/^[/](?<word>[a-z]+):(?<num>[0-9]+)[/]?$/);
```

### Using Wildcards
```javascript
// Wildcards, matches "/app", "/app-1", "/app/home"
const [match, params] = useRoute("/app*");

if (match) {
  // "/home" for "/app/home"
  const page = params["*"];
}
```

### Default Route with Wildcard Parameter
```javascript
<Switch>
  <Route path="/users">...</Route>

  {/* Will match anything that starts with /users/, e.g. /users/foo, /users/1/edit etc. */}
  <Route path="/users/*">...</Route>

  {/* Will match everything else */}
  <Route path="*">
    {(params) => `404, Sorry the page ${params["*"]} does not exist!`}
  </Route>
</Switch>
```

### Using useParams with Regex Paths
```javascript
import { Route, useParams } from "wouter";

const User = () => {
  const params = useParams();

  params.id; // "1"
  params[0]; // "1"
};

<Route path={/^[/]user[/](?<id>[0-9]+)[/]?$/} component={User}> </Route>
```

## Nested Routing

### Nested Routes with 'nest' prop
```js
const App = () => (
  <Router base="/app">
    <Route path="/dashboard" nest>
      {/* the href is "/app/dashboard/users" */}
      <Link to="/users" />

      <Route path="/users">
        {/* Here `useLocation()` returns "/users"! */}
      </Route>
    </Route>
  </Router>
);
```

### Route Nesting Example
```javascript
<Route path="/app" nest>
  <Route path="/users/:id" nest>
    <Route path="/orders" />
  </Route>
</Route>
```

## Advanced Usage

### Programmatic Navigation
```js
import { navigate } from "wouter/use-browser-location";

navigate("/", { replace: true });
```

### Redirect with useLocation
```javascript
import { useLocation } from "wouter";

const [location, setLocation] = useLocation();

fetchOrders().then((orders) => {
  setOrders(orders);
  setLocation("/app/orders");
});
```

### Custom Active Link Component
```js
const [isActive] = useRoute(props.href);

return (
  <Link {...props} asChild>
    <a style={isActive ? { color: "red" } : {}}>{props.children}</a>
  </Link>
);
```

### Custom Location Hooks
```js
import { useBrowserLocation } from "wouter/use-browser-location";

const UsersRoute = () => {
  const [location] = useBrowserLocation();

  if (location !== "/users") return null;

  // render the route
};
```

## Server-Side Rendering (SSR)

### SSR Setup
```js
import { renderToString } from "react-dom/server";
import { Router } from "wouter";

const handleRequest = (req, res) => {
  // Top-level Router is mandatory in SSR mode
  const ssrContext = {};
  const prerendered = renderToString(
    <Router ssrPath={req.path} ssrSearch={req.search} ssrContext={ssrContext}>
      <App />
    </Router>
  );

  if (ssrContext.redirectTo) {
    // Encountered redirect
    res.redirect(ssrContext.redirectTo);
  } else {
    // Respond with prerendered html
  }
};
```

### SSR with Search Parameters
```jsx
<Router ssrPath="/goods?sort=asc" />
// or
<Router ssrPath="/goods" ssrSearch="sort=asc" />

// For SSR with search
<Router ssrSearch={request.search}>{/* SSR! */}</Router>
```

### Client Hydration
```js
import { hydrateRoot } from "react-dom/client";

const root = hydrateRoot(
  domNode,
  // During hydration, `ssrPath` is set to `location.pathname`,
  // `ssrSearch` set to `location.search` accordingly
  <Router>
    <App />
  </Router>
);
```

## Testing

### Testing with memoryLocation
```jsx
import { render } from "@testing-library/react";
import { memoryLocation } from "wouter/memory-location";

it("renders a user page", () => {
  // `static` option makes it immutable
  const { hook } = memoryLocation({ path: "/user/2", static: true });

  const { container } = render(
    <Router hook={hook}>
      <Route path="/user/:id">{(params) => <>User ID: {params.id}</>}</Route>
    </Router>
  );

  expect(container.innerHTML).toBe("User ID: 2");
});
```

### Testing Navigation History
```jsx
it("performs a redirect", () => {
  const { hook, history, navigate } = memoryLocation({
    path: "/",
    // Will store navigation history in `history`
    record: true,
  });

  const { container } = render(
    <Router hook={hook}>
      <Switch>
        <Route path="/">Index</Route>
        <Route path="/orders">Orders</Route>
        <Route>
          <Redirect to="/orders" />
        </Route>
      </Switch>
    </Router>
  );

  expect(history).toStrictEqual(["/"]);

  navigate("/unknown/route");

  expect(container.innerHTML).toBe("Orders");
  expect(history).toStrictEqual(["/", "/unknown/route", "/orders"]);
});
```

## Animation Integration

### Animating Routes with Framer Motion
```jsx
import { motion, AnimatePresence } from "framer-motion";
import { useRoute } from "wouter";

// This approach works correctly
export const MyComponent = () => {
  const [isMatch] = useRoute("/");

  return (
    <AnimatePresence>
      {isMatch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};
```

## Custom Parsers

### Custom Parser with pathToRegexp for Strict Routes
```js
import { pathToRegexp } from "path-to-regexp";

/**
 * Custom parser based on `pathToRegexp` with strict route option
 */
const strictParser = (path, loose) => {
  const keys = [];
  const pattern = pathToRegexp(path, keys, { strict: true, end: !loose });

  return {
    pattern,
    // `pathToRegexp` returns metadata about keys,
    // we want to strip it to just an array of keys
    keys: keys.map((k) => k.name),
  };
};

const App = () => (
  <Router parser={strictParser}>
    <Route path="/foo">...</Route>
    <Route path="/foo/">...</Route>
  </Router>
);
```

## Preact Integration

### Using Wouter with Preact
```diff
- import { useRoute, Route, Switch } from "wouter";
+ import { useRoute, Route, Switch } from "wouter-preact";
```

## Location Hooks

### Custom Location Hook Usage
```jsx
import { Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const App = () => (
  <Router hook={useHashLocation}>
    <Route path="/about" component={About} />
    ...
  </Router>
);
```

## Best Practices

1. **Component Structure**: Use Switch for exclusive routing
2. **Default Routes**: Always provide a default route in Switch components
3. **Navigation**: Use Link components instead of anchor tags for internal navigation
4. **Parameters**: Use useParams hook to access route parameters without prop drilling
5. **Active States**: Use className functions or useRoute for active link styling
6. **SSR**: Always use Router component at the top level for SSR
7. **Testing**: Use memoryLocation for testing route behavior
8. **Performance**: Use bare location hooks for minimal bundle size when needed
9. **Nested Routing**: Use the nest prop for creating nested routing contexts
10. **Type Safety**: Consider using TypeScript for better type safety with route parameters

## Common Patterns

### Protected Routes
```jsx
const ProtectedRoute = ({ children, ...props }) => {
  const [isAuthenticated] = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return <Route {...props}>{children}</Route>;
};
```

### Layout Wrapper
```jsx
const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
    <Footer />
  </div>
);

const App = () => (
  <Router>
    <Route path="/dashboard" nest>
      <Layout>
        <Route path="/overview" component={Overview} />
        <Route path="/settings" component={Settings} />
      </Layout>
    </Route>
  </Router>
);
```

## Related Documentation
- [React Documentation](./react-documentation.md)
- [TypeScript Documentation](./typescript-documentation.md)
- [Vite Documentation](./vite-documentation.md)