# Express.js Documentation

This document contains essential Express.js documentation and code examples relevant to this project.

## Overview
Express.js is a fast, unopinionated, minimalist web framework for Node.js. Version 4.21.2 is used in this project.

## Installation Commands

### Install Express.js
```bash
npm install express
```

### Install Express Application Generator
```bash
npm install -g express-generator@4
```

### Create Express Application
```bash
express /tmp/foo && cd /tmp/foo
npm install
npm start
```

## Basic Express Application

### Simple Server Setup
```javascript
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)
```

### HTTP and HTTPS Servers
```javascript
var app = express();
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```

## Middleware and Routing

### Basic Middleware
```javascript
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session())
```

### Route Parameters (Express 4.x)
```javascript
app.use('/users/:user_id', function(req, res, next) {
  // req.params.user_id exists here
});
```

### Error Handling Middleware
```javascript
app.use(function(err, req, res, next){
  // Error handling logic
  res.send(500, { error: 'Sorry something bad happened!' });
})
```

## Express 4.x Router

### Creating Modular Router
```javascript
var people = express.Router();

people.use(function(req, res, next) {
  // Router-specific middleware
});

people.get('/', function(req, res, next) {
  // Route handler
});

module.exports.people = people;
```

### Mounting Router
```javascript
app.use('/people', require('./routes/people').people);
```

### Route Chaining
```javascript
app.route('/users')
.get(function(req, res, next) {})
.post(function(req, res, next) {})
```

## Migration Notes

### Express 3.x to 4.x Changes
```javascript
// Environment configuration
app.configure('development', function() {
   // configure stuff here
});

// becomes
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}
```

### Removed Middleware (Express 4.0)
Express 4.0 removed bundled middleware. Install separately:
- `body-parser` (for bodyParser)
- `cookie-parser` (for cookieParser) 
- `serve-favicon` (for favicon)
- `express-session` (for session)

### API Changes
```javascript
// Deprecated methods (still work for backwards compatibility)
req.header(field) -> req.get(field)
res.header(field, value) -> res.set(field, value)
app.register() -> app.engine()
express.createServer() -> express()

// Property changes
req.params: now object (was array)
res.locals: now object (was function)
res.headerSent -> res.headersSent
```

## Template Engines

### Register Custom Engine
```javascript
var markdown = require('some-markdown-library');

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    str = markdown.parse(str).toString();
    fn(null, str);
  });
});
```

## Application Settings

### App Configuration
```javascript
// Trust proxy for protocol detection
app.set('trust proxy', true);

// JSON formatting
app.set('json spaces', 2); // Pretty print JSON
```

### Local Variables
```javascript
// App-level locals
app.locals.foo = 'bar';
app.locals({ foo: 'bar', bar: 'baz'});

// Response-level locals
res.locals.foo = 'bar';
res.locals({ foo: 'bar', bar: 'baz'});
```

## Request Object (req)

### Request Properties
```javascript
req.path        // Request pathname
req.protocol    // "http" or "https"
req.get(field)  // Get header field
req.ip          // Client IP
req.ips         // Array of IPs (with trust proxy)
req.fresh       // Check if request is fresh
req.stale       // Check if request is stale
```

### Content Negotiation
```javascript
req.accepts(type)             // Check accepted content type
req.accepts(types)            // Return best viable type
req.acceptsCharset(charset)   // Check accepted charset
req.acceptsLanguage(lang)     // Check accepted language
```

### Cookies and Parameters
```javascript
req.cookies      // Parsed cookies
req.signedCookies // Signed cookies
req.params       // Route parameters
req.query        // Query string parameters
req.body         // Request body (requires body-parser)
```

## Response Object (res)

### Response Methods
```javascript
res.get(field)          // Get response header
res.set(field, value)   // Set response header
res.set(obj)           // Set multiple headers
res.type(path)         // Set content type
res.status(code)       // Set status code
```

### Response Data
```javascript
res.send(body)         // Send response
res.json(obj)          // Send JSON
res.jsonp(obj)         // Send JSONP
res.redirect(url)      // Redirect
res.render(view, data) // Render template
```

### Cookies
```javascript
res.cookie('name', 'value')                    // Set cookie
res.cookie('cart', { ids: [1,2,3] })          // JSON cookie
res.cookie('name', 'value', { signed: true }) // Signed cookie
res.clearCookie('name')                        // Clear cookie
```

## Socket.IO Integration

### Express 3.x with Socket.IO
```javascript
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);
```

## Configuration Management

### Using ESON for Configuration
```javascript
var express = require('express');
var app = express();
var eson = require('eson');
var file = __dirname + '/config/' + app.get('env') + '.json';

var conf = eson()
  .use(eson.env('MYAPP_'))
  .use(eson.args())
  .read(file);
```

## Testing and Development

### Run Tests
```bash
npm test
```

### Development Server
```bash
npm start
```

### Clone Repository
```bash
git clone https://github.com/expressjs/express.git --depth 1 && cd express
npm install
node examples/content-negotiation
```

## Best Practices

1. Use middleware for cross-cutting concerns
2. Implement proper error handling
3. Use routers to organize routes
4. Set up appropriate security headers
5. Use environment-based configuration
6. Implement request logging
7. Handle async errors properly
8. Use compression middleware for production

## Performance Considerations

1. Enable gzip compression
2. Use connection pooling for databases  
3. Implement caching strategies
4. Use reverse proxy (nginx) in production
5. Monitor memory usage
6. Use clustering for multi-core systems

## Security Best Practices

1. Use helmet middleware for security headers
2. Implement rate limiting
3. Validate and sanitize input
4. Use HTTPS in production
5. Keep dependencies updated
6. Implement proper authentication
7. Use CORS appropriately

## Related Documentation
- [TypeScript Documentation](./typescript-documentation.md)
- [Vite Documentation](./vite-documentation.md)
- [Drizzle Documentation](./drizzle-documentation.md)