# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in the Jamieson Digital professional website repository.

## Repository Information

- **Repository**: https://github.com/peterjamieson971/Jamieson_Digital.git
- **Primary Domain**: jamieson.digital
- **Environment**: Professional portfolio and thought leadership platform
- **Deployment**: AWS App Runner (production)

## Common Development Commands

### Development
- `npm run dev` - Start development server with hot reload (runs on port 5000)
- `npm run build` - Build production bundle (client + server)
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes to Neon Database
- `npm run db:studio` - Open Drizzle Studio for database management
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

### Quality Assurance
- Run `npm run check` before pushing changes (TypeScript validation)
- Test in development server before deploying
- Validate article content and search functionality

### Email Configuration
- Email service uses Resend API with `jamieson@qstore24.com` sender domain
- Contact form emails deliver to `peter@jamieson.digital`
- Includes automatic confirmation emails to users

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Wouter routing
- **Backend**: Express.js + TypeScript (ES modules)
- **Database**: PostgreSQL via Neon Database + Drizzle ORM
- **Styling**: Tailwind CSS with Apple-inspired design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Email**: Resend API service
- **Build**: Vite + ESBuild
- **Deployment**: AWS App Runner

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
│   ├── index-simple.ts    # Production server entry point
│   ├── routes.ts          # API route definitions
│   ├── email.ts           # Email service (Resend integration)
│   ├── vite.ts            # Development server setup
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle database schema + Zod validation
├── public/                 # Static assets (icons, images, manifests)
└── dist/                   # Production build output
```

### Key Features
- **Articles System**: Centralized articles data with comprehensive publishing workflow
- **Search Integration**: Advanced search with keyword matching and content excerpts
- **Contact Form**: Full-stack contact form with email notifications
- **SEO Optimized**: Complete meta tags, structured data, and accessibility
- **Professional Portfolio**: Sections for about, expertise, experience, and articles

## Hosting & Deployment

### AWS App Runner Configuration
- **Platform**: AWS App Runner (fully managed container service)
- **Build Configuration**: Defined in build process
- **Runtime**: Node.js 18+
- **Port**: 5000 (configurable via PORT environment variable)
- **Auto-scaling**: Managed by AWS App Runner
- **GitHub Integration**: Automatic deployments from main branch

### Environment Variables (Production)
Required for production deployment:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=neon_database_connection_string
RESEND_API_KEY=resend_api_key_for_email_service
SESSION_SECRET=secure_random_string_for_sessions
VITE_GA_MEASUREMENT_ID=G-QLHNT88NN1
```

### Build Process
1. **Development**: `npm run dev` - Vite development server
2. **Production Build**: `npm run build` - TypeScript check + Vite build + ESBuild bundle
3. **Production Start**: `npm start` - Runs compiled `dist/index-simple.js`

### Deployment Process
- **Automatic**: Pushes to main branch trigger AWS App Runner deployments
- **Manual**: Via AWS Console or CLI commands
- **Build Commands**: 
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: `npm start`

## Development Architecture

### Frontend Routing (Wouter)
- `/` - Homepage with hero, about, expertise, experience, articles preview, contact
- `/articles` - Full articles listing page with search and filtering
- `/article/:slug` - Individual article pages with full content
- Error pages with proper HTTP status codes and user-friendly messages

### Backend API Structure
- `GET /api/profile` - Profile information
- `PUT /api/profile` - Update profile (future admin feature)
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contact` - Retrieve submissions (future admin feature)
- Health check endpoints for AWS App Runner

### Database Schema (Drizzle + Zod)
Three main entities in `shared/schema.ts`:
- **users**: Authentication system (prepared for future expansion)
- **profiles**: Professional information and bio data
- **contactSubmissions**: Contact form data with comprehensive validation

### Static Assets & SEO
- Icons and images in `/public/` directory
- Complete SEO implementation with meta tags, Open Graph, Twitter cards
- Structured data schemas for articles and organization
- Sitemap, robots.txt, and web manifest configured
- Social preview images for article sharing
- WCAG 2.2 Level AA accessibility compliance

## Articles Management System

### Article Publishing Workflow
- **Guide**: See ARTICLE_PUBLISHING_GUIDE.md for complete process
- **Data File**: `client/src/data/articles.ts` - Article metadata and search keywords
- **Content File**: `client/src/pages/article.tsx` - Full article HTML content
- **Hero Articles**: First 3 articles in array automatically become homepage heroes
- **Search Integration**: Enhanced keywords and content excerpts for discoverability

### Article Structure
- **Metadata**: Title, description, category, read time, publish date, author
- **Search Fields**: Keywords, content excerpt for enhanced findability
- **Content**: Full HTML with proper semantic structure
- **References**: Formatted academic-style citations
- **Social Sharing**: Individual preview images for each article

### Categories and Icons
Available categories:
- Strategy (businessIcon)
- Technology (aiIcon) 
- Digital Marketing (seoIcon)
- Leadership (leadershipIcon)
- Future of Work (transformationIcon)

## Search Management System

### Search Functionality
- **Guide**: See SEARCH_MANAGEMENT_GUIDE.md for complete system details
- **Command Palette**: ⌘K/Ctrl+K global search
- **Articles Page**: Dedicated search bar with filtering
- **Homepage**: Quick search integration
- **Enhanced Matching**: Title, description, keywords, and content excerpt search

### Search Implementation
- Real-time search with debouncing
- Category filtering and sorting
- Keyword highlighting in results
- Mobile-optimized search interface

## Important Implementation Notes

### Email Configuration
- Uses Resend API with environment variable `RESEND_API_KEY`
- Sender domain: `jamieson@qstore24.com` (verified in Resend)
- Recipient: `peter@jamieson.digital`
- Includes both notification and confirmation emails
- Rate limiting: 3 submissions per 15 minutes per IP

### Development Server
- Vite handles client-side development with HMR
- Express serves API routes and handles static assets
- `server/vite.ts` configures development middleware
- Static assets served from both `/public` and client build
- WebSocket support for development features

### Security Features
- **Helmet.js**: Comprehensive security headers (CSP, HSTS, X-Frame-Options)
- **Rate Limiting**: API endpoints protected (100 requests/minute)
- **Input Validation**: Zod schema validation with length limits
- **Payload Limits**: 1MB request body limit
- **Environment Separation**: All secrets properly managed

### Database Configuration
- **Neon Database**: PostgreSQL cloud database
- **Connection**: Via `@neondatabase/serverless` driver
- **ORM**: Drizzle ORM with TypeScript types
- **Migrations**: `npm run db:push` for schema changes
- **Studio**: `npm run db:studio` for database management

## Branch Strategy
- `main` - Production branch (auto-deploys to AWS App Runner)
- Feature branches - For new development (merge to main when ready)
- Always commit completed features with descriptive messages

## Documentation References
- **AWS_DEPLOYMENT_GUIDE.md** - Complete AWS deployment instructions and options
- **ARTICLE_PUBLISHING_GUIDE.md** - Step-by-step article publishing workflow
- **SEARCH_MANAGEMENT_GUIDE.md** - Search system configuration and management
- **SEO_ACCESSIBILITY_GUIDELINES.md** - SEO and accessibility standards
- **replit.md** - Historical system architecture reference

## Code Standards

### TypeScript Configuration
- ES modules throughout (`"type": "module"` in package.json)
- Strict TypeScript mode enabled
- Node.js 18+ required (defined in engines)

### Styling Standards
- Tailwind CSS with custom Apple-inspired design tokens
- Component-based architecture with shadcn/ui primitives
- Responsive design patterns
- Dark/light theme support preparation

### API Standards
- Express.js with TypeScript
- Zod validation for all inputs
- Comprehensive error handling
- Rate limiting and security middleware
- RESTful API design patterns

### Frontend Standards
- React 18 with modern hooks patterns
- Wouter for lightweight routing
- React Query for server state management
- Component composition over inheritance
- Accessibility-first development

## Important Instruction Reminders

### File Creation Policy
- NEVER create files unless absolutely necessary for achieving goals
- ALWAYS prefer editing existing files over creating new ones
- NEVER proactively create documentation files (*.md) or README files
- Only create documentation files if explicitly requested by User

### Development Workflow
1. Analyze existing code patterns and conventions
2. Use existing libraries and frameworks (check package.json first)
3. Follow established patterns in the codebase
4. Run `npm run check` before committing changes
5. Test functionality in development server
6. Ensure security best practices are followed

### Article Management
- New articles must be added as first item in `allArticles` array (hero status)
- Include enhanced search keywords for discoverability
- Follow the complete publishing checklist in ARTICLE_PUBLISHING_GUIDE.md
- Update sitemap.xml for new articles
- Create social preview images for sharing

This documentation provides the complete context needed for effective development on the Jamieson Digital platform, covering all aspects from local development to production deployment on AWS App Runner.