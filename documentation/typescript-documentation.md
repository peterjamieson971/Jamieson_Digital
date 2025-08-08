# TypeScript Documentation

This document contains essential TypeScript documentation and code examples relevant to this project.

## Overview
TypeScript is a superset of JavaScript that adds static types. Version 5.6.3 is used in this project.

## Installation Commands

### Install TypeScript
```bash
npm install -g typescript
npm link typescript
```

### Check TypeScript Version
```bash
tsc --v
```

### Install Latest TypeScript
```bash
npm install typescript@latest
```

### Install TypeScript Node Types
```bash
npm install -D @types/node
```

## Basic TypeScript Syntax

### Variable Declaration and Classes
```typescript
var m1_a1 = 10;
class m1_c1 {
    public m1_c1_p1: number;
}

var m1_instance1 = new m1_c1();
function m1_f1() {
    return m1_instance1;
}
```

### Class with Constructor and Methods
```typescript
class Greeter {
    constructor(public greeting: string) {
    }

    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}

var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
```

## Type System Features

### Using typeof Operator
```typescript
export class C {
    foo: string;
}
export var c: C;

export var r3: typeof C; // Constructor type
export var r4: typeof c; // Instance type
```

### Enum Types
```typescript
export enum E {
    A
}
export var r10: typeof E;
export var r11: typeof E.A;
```

## Getters and Setters

### Valid Getter Example
```typescript
class C {
    public get m3() {
        return "Okay, because this is a return expression.";
    }
}
```

### Common Getter Errors
```typescript
class C {
   get Foo(a: number) { } // Error: Cannot have parameters
   // Error: Must return a value
}
```

## Module System

### ES Module Imports
```typescript
import * as cjs from "#cjs";
import * as mjs from "#mjs";
import * as type from "#type";
```

### Module Export
```typescript
declare function f(): string;
export = f;
```

### Import with Type Checking
```typescript
import React from "react";
import { createStore } from "redux";
```

## JSX Configuration

### React JSX Setup
```typescript
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};
```

## TypeScript Compiler API

### Basic Compilation
```typescript
import ts = require("typescript");

export function compile(filenames: string[], options: ts.CompilerOptions): void {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    var checker = ts.createTypeChecker(program, /*produceDiagnostics*/ true);
    var result = checker.emitFiles();

    var allDiagnostics = program.getDiagnostics()
        .concat(checker.getDiagnostics())
        .concat(result.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
        console.log(`${diagnostic.file.filename} (${lineChar.line},${lineChar.character}): ${diagnostic.messageText}`);
    });

    console.log(`Process exiting with code '${result.emitResultStatus}'.`);
    process.exit(result.emitResultStatus);
}
```

### Creating AST Nodes
```typescript
import ts = require("typescript");

function makeFactorialFunction() {
  const functionName = ts.factory.createIdentifier("factorial");
  const paramName = ts.factory.createIdentifier("n");
  const parameter = ts.factory.createParameterDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName
  );

  const condition = ts.factory.createBinaryExpression(
    paramName, 
    ts.SyntaxKind.LessThanEqualsToken, 
    ts.factory.createNumericLiteral(1)
  );
  
  // ... rest of implementation
}
```

## File Watcher Implementation

### Incremental Build System
```typescript
import fs = require("fs");
import ts = require("typescript");
import path = require("path");

function watch(filenames: string[], options: ts.CompilerOptions) {
    var files: ts.Map<{ version: number; text: string; }> = {};
    
    // Add the default library file
    filenames.unshift(path.join(path.dirname(require.resolve('typescript')), 'lib.d.ts'));

    // initialize the list of files
    filenames.forEach(filename => {
        files[filename] = { version: 0, text: fs.readFileSync(filename).toString() };
    });

    // Create the language service host
    var servicesHost: ts.LanguageServiceHost = {
        getScriptFileNames: () => filenames,
        getScriptVersion: (filename) => files[filename] && files[filename].version.toString(),
        // ... rest of implementation
    };

    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

    // Watch files for changes
    filenames.forEach(filename => {
        fs.watchFile(filename, 
            { persistent: true, interval: 250 }, 
            (curr, prev) => {
                if (+curr.mtime <= +prev.mtime) {
                    return;
                }
                // Handle file changes
            });
    });
}
```

## TypeScript Configuration

### tsconfig.json Example
```json
{ "files": "a.ts" }
```

### Compiler Options
```typescript
compile(process.argv.slice(2), { 
  noEmitOnError: true, 
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5, 
  module: ts.ModuleKind.CommonJS 
});
```

## Performance and Debugging

### Generate Performance Trace
```bash
npm install @typescript/analyze-trace
npx analyze-trace some_directory
```

### MSBuild Integration
TypeScript files are installed in:
```
Microsoft SDKs Folder:
  "%ProgramFiles%\Microsoft SDKs\TypeScript\<version-number>"
  "%ProgramFiles%\Microsoft SDKs\TypeScript\<version-number>\build"
  "%ProgramFiles%\Microsoft SDKs\TypeScript\<version-number>\versions"

MSBuild folder:
  "%ProgramFile%\MSBuild\Microsoft\VisualStudio\v14.0\TypeScript"
```

## Common Error Patterns

### Generator in Accessor (Error)
```typescript
var v = { get foo() { yield foo; } } // Error: yield in get accessor
```

### Import/Export Issues
```typescript
import { x, y } from "./a"; // Error if y doesn't exist
const a2 = require("./a"); // Error in ESM context
```

## Docker Usage with TypeScript

### Run TypeScript in Docker
```bash
docker run -it --rm node
npm install -g typescript
```

### Mount Project Directory
```bash
docker run -it --rm -v c:\foo:/work node bash
```

## Best Practices

1. Use strict type checking (`noImplicitAny: true`)
2. Enable proper module resolution
3. Use TypeScript compiler API for advanced scenarios
4. Implement proper error handling for diagnostics
5. Use file watchers for incremental compilation
6. Configure proper JSX settings for React projects
7. Use appropriate target and module settings

## Related Documentation
- [React Documentation](./react-documentation.md)
- [Vite Documentation](./vite-documentation.md)
- [Express Documentation](./express-documentation.md)