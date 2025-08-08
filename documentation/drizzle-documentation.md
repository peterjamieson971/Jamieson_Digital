# Drizzle ORM Documentation

This document contains essential Drizzle ORM documentation and code examples relevant to this project.

## Overview
Drizzle ORM is a TypeScript ORM for SQL databases, offering a type-safe and intuitive way to interact with your database. Version 0.39.1 is used in this project.

## Installation Commands

### Install Drizzle ORM and Drizzle Kit
```bash
npm install drizzle-orm
npm install -D drizzle-kit
```

### Install Database Drivers
```bash
# For PostgreSQL (Neon Database)
npm install pg
npm install -D @types/pg

# For MySQL
npm install mysql2

# For SQLite
npm install better-sqlite3
```

## Basic Configuration

### Drizzle Config File (drizzle.config.ts)
```typescript
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Extended Configuration
```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/schema.ts",

  driver: "pglite",
  dbCredentials: {
    url: "./database/",
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
```

## Database Connection

### PostgreSQL Connection
```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

export const client = new Client({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

// { schema } is used for relational queries
export const db = drizzle({ client, schema });
```

### Neon Database Connection
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

## Schema Definition

### Basic Table Schema
```typescript
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().notNull().unique(),
  createdAt: p.timestamp().defaultNow(),
})
```

### Table with Relationships
```typescript
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

## Migration Management

### Generate Migrations
```bash
npx drizzle-kit generate
```

### Apply Migrations
```bash
npx drizzle-kit migrate
```

### Push Schema Changes (Development)
```bash
npx drizzle-kit push
```

### Runtime Migration Application
```typescript
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const db = drizzle(process.env.DATABASE_URL);

await migrate(db, { migrationsFolder: './drizzle' });
```

### Manual Migration Execution
```typescript
import 'dotenv/config';
import { client, db } from './drizzle/db';
import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

(async () => {
  await client.connect();

  // Apply all migrations from the migrations folder
  await migrate(db, { migrationsFolder: resolve(__dirname, './drizzle') });

  // Start your application
})();
```

## Database Operations

### Basic Queries

#### Select Operations
```typescript
// Select all users
const allUsers = await db.select().from(users);

// Select specific columns
const userNames = await db.select({ name: users.name }).from(users);

// Select with conditions
import { eq, and, or } from 'drizzle-orm';

const activeUsers = await db
  .select()
  .from(users)
  .where(eq(users.active, true));

// Complex conditions
const result = await db
  .select()
  .from(users)
  .where(
    and(
      eq(users.active, true),
      or(eq(users.role, 'admin'), eq(users.role, 'moderator'))
    )
  );
```

#### Insert Operations
```typescript
// Insert single record
const newUser = await db
  .insert(users)
  .values({
    name: 'John Doe',
    email: 'john@example.com'
  })
  .returning();

// Insert multiple records
await db.insert(users).values([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' }
]);
```

#### Update Operations
```typescript
// Update with conditions
await db
  .update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.id, 1));

// Update with returning
const updatedUser = await db
  .update(users)
  .set({ lastLogin: new Date() })
  .where(eq(users.id, 1))
  .returning();
```

#### Delete Operations
```typescript
// Delete with conditions
await db
  .delete(users)
  .where(eq(users.id, 1));

// Delete all (use with caution)
await db.delete(users);
```

### Advanced Queries

#### Joins
```typescript
// Inner join
const usersWithPosts = await db
  .select({
    userName: users.name,
    postTitle: posts.title,
  })
  .from(users)
  .innerJoin(posts, eq(users.id, posts.authorId));

// Left join
const allUsersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));
```

#### Aggregations
```typescript
import { count, sum, avg } from 'drizzle-orm';

// Count records
const userCount = await db
  .select({ count: count() })
  .from(users);

// Grouping
const postsByUser = await db
  .select({
    authorId: posts.authorId,
    postCount: count(posts.id),
  })
  .from(posts)
  .groupBy(posts.authorId);
```

### Relational Queries
```typescript
// Query with relations (requires schema with relations)
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: true,
  },
});

// Nested relations
const userWithPostsAndComments = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    posts: {
      with: {
        comments: true,
      },
    },
  },
});
```

## Package.json Scripts

### Add Migration Scripts
```json
{
  "scripts": {
    "generate": "drizzle-kit generate",
    "migrate": "drizzle-kit migrate",
    "push": "drizzle-kit push",
    "studio": "drizzle-kit studio"
  }
}
```

## Drizzle Studio

### Launch Database Browser
```bash
npx drizzle-kit studio
```

### Studio with Custom Port
```bash
npx drizzle-kit studio --port 3333
```

## Multiple Configuration Files

### Managing Multiple Environments
```bash
# Development environment
drizzle-kit migrate --config=drizzle-dev.config.ts

# Production environment
drizzle-kit migrate --config=drizzle-prod.config.ts
```

### Project Structure Example
```
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

## Common CLI Commands

### Drizzle Kit Commands Overview
```bash
# Generate SQL migration files based on schema
drizzle-kit generate

# Apply generated SQL migration files to database
drizzle-kit migrate

# Push schema changes directly to database
drizzle-kit push

# Pull (introspect) database schema into Drizzle schema
drizzle-kit pull

# Check for migration race conditions
drizzle-kit check

# Upgrade migration snapshots
drizzle-kit up

# Launch Drizzle Studio
drizzle-kit studio
```

### Command with Options
```bash
# Migrate with custom config
drizzle-kit migrate --config=custom.config.ts

# Push to specific dialect
npx drizzle-kit push:pg --config=drizzle.config.ts

# Generate with verbose output
drizzle-kit generate --verbose
```

## Environment Variables

### Required Variables
```env
# Database connection
DATABASE_URL=postgresql://user:password@host:port/dbname

# For Neon Database
DATABASE_URL=postgresql://user:password@hostname/database?sslmode=require

# For Turso
TURSO_DATABASE_URL=libsql://your-database-url
TURSO_AUTH_TOKEN=your-auth-token
```

## TypeScript Integration

### Type Inference
```typescript
// Infer select and insert types
type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

// Use in functions
async function createUser(userData: NewUser): Promise<User> {
  const [user] = await db
    .insert(users)
    .values(userData)
    .returning();
  
  return user;
}
```

### Prepared Statements
```typescript
import { placeholder } from 'drizzle-orm';

// Prepare statement for better performance
const getUserById = db
  .select()
  .from(users)
  .where(eq(users.id, placeholder('id')))
  .prepare();

// Execute prepared statement
const user = await getUserById.execute({ id: 1 });
```

## Error Handling

### Migration Errors
```typescript
try {
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migration completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}
```

### Query Error Handling
```typescript
try {
  const users = await db.select().from(users);
  return users;
} catch (error) {
  if (error.code === '23505') { // PostgreSQL unique violation
    throw new Error('User already exists');
  }
  throw error;
}
```

## Best Practices

1. **Schema Organization**: Keep schema definitions modular and organized
2. **Migration Safety**: Always review generated migrations before applying
3. **Type Safety**: Use TypeScript inference for better type safety
4. **Performance**: Use prepared statements for frequently executed queries
5. **Transactions**: Wrap related operations in transactions
6. **Environment Configuration**: Use environment-specific config files
7. **Validation**: Combine with validation libraries like Zod
8. **Connection Pooling**: Configure appropriate connection pooling for production

## Troubleshooting

### Common Issues
- **Missing DATABASE_URL**: Ensure environment variables are properly loaded
- **Schema Sync**: Use `drizzle-kit push` for development, migrations for production
- **Type Errors**: Regenerate types after schema changes
- **Migration Conflicts**: Use `drizzle-kit check` to detect race conditions

### Debug Mode
```typescript
// Enable query logging
const db = drizzle(sql, { 
  schema, 
  logger: true 
});
```

## Related Documentation
- [TypeScript Documentation](./typescript-documentation.md)
- [Vite Documentation](./vite-documentation.md)
- [Express Documentation](./express-documentation.md)