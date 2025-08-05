# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm run dev` - Start development server with hot reload (runs on port 5000)
- `npm run build` - Build production bundle (client + server)
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes to Neon Database

### Email Configuration
- Run linting/type checking before pushing changes (if available)
- Email service uses Resend API with `jamieson@qstore24.com` sender domain
- Emails deliver to `peter@jamieson.digital`
- Contact form includes automatic confirmation emails to users

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Wouter routing
- **Backend**: Express.js + TypeScript (ES modules)
- **Database**: PostgreSQL via Neon Database + Drizzle ORM
- **Styling**: Tailwind CSS with Apple-inspired design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Email**: Resend API service
- **Deployment**: AWS App Runner (see AWS_DEPLOYMENT_GUIDE.md)

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components (home, articles, article, not-found)
│   │   ├── data/           # Static data (articles.ts)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── index.ts           # Main server file with Vite integration
│   ├── routes.ts          # API route definitions
│   ├── email.ts           # Email service (Resend integration)
│   ├── vite.ts            # Development server setup
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle database schema + Zod validation
└── public/                # Static assets (icons, images, manifests)
```

### Key Features
- **Articles System**: Centralized articles data with future Loom video support
- **Contact Form**: Full-stack contact form with email notifications
- **SEO Optimized**: Complete meta tags, structured data, and accessibility (see SEO_ACCESSIBILITY_GUIDELINES.md)
- **Professional Portfolio**: Sections for about, expertise, experience, and contact

## Development Architecture

### Frontend Routing (Wouter)
- `/` - Homepage with hero, about, expertise, experience, articles preview, contact
- `/articles` - Full articles listing page
- `/article/:slug` - Individual article pages
- Error pages with proper HTTP status codes

### Backend API Structure
- `GET /api/profile` - Profile information
- `PUT /api/profile` - Update profile (future admin feature)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve submissions (future admin feature)

### Database Schema (Drizzle + Zod)
Three main entities in `shared/schema.ts`:
- **users**: Authentication system (prepared for future)
- **profiles**: Professional information and bio data
- **contactSubmissions**: Contact form data with validation

### Static Assets & SEO
- Icons and images in `/public/` directory
- Complete SEO implementation with meta tags, Open Graph, Twitter cards
- Structured data schemas for articles and organization
- Sitemap, robots.txt, and web manifest configured
- WCAG 2.2 Level AA accessibility compliance

## Important Implementation Notes

### Articles System
- Articles data centralized in `client/src/data/articles.ts`
- Future-ready for Loom video integration with video fields
- Homepage shows first 3 articles, `/articles` shows all
- Individual article content stored in `client/src/pages/article.tsx`
- Navigation properly connects homepage → articles page → individual articles

### Email Configuration
- Uses Resend API with environment variable `RESEND_API_KEY`
- Sender domain: `jamieson@qstore24.com` (verified in Resend)
- Recipient: `peter@jamieson.digital`
- Includes both notification and confirmation emails

### Environment Variables
Required for production:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=neon_database_connection_string
RESEND_API_KEY=resend_api_key
SESSION_SECRET=secure_random_string
```

### Development Server
- Vite handles client-side development with HMR
- Express serves API routes and handles static assets
- `server/vite.ts` configures development middleware
- Static assets served from both `/public` and client build

### Deployment
- Configured for AWS App Runner with `apprunner.yaml`
- Complete deployment guide in `AWS_DEPLOYMENT_GUIDE.md`
- Build process: `npm run build` creates production bundle
- Production server: `npm start` runs `dist/index-simple.js`

## Branch Strategy
- `main` - Production branch
- `feature/new-development` - Feature development branch
- Always commit completed features to appropriate branch

## Documentation References
- **SEO_ACCESSIBILITY_GUIDELINES.md** - Complete SEO and accessibility standards
- **AWS_DEPLOYMENT_GUIDE.md** - Comprehensive deployment instructions
- **replit.md** - Detailed system architecture and tech stack overview

## Code Standards
- TypeScript strict mode enabled
- ES modules throughout (`"type": "module"` in package.json)
- Tailwind CSS with custom Apple-inspired design tokens
- Component-based architecture with proper separation of concerns
- Comprehensive error handling and user feedback systems