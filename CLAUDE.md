# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Information

- **Repository**: https://github.com/peterjamieson971/Jamieson_Digital.git
- **Primary Domain**: jamieson.digital
- **Environment**: Professional portfolio and thought leadership platform
- **Deployment**: Vercel (production)

## Common Development Commands

### Development
- `npm run dev` - Start Vercel development server with hot reload (runs on port 3000)
- `npm run dev:old` - Start old Express development server (deprecated)
- `npm run build` - Build production bundle for Vercel (client only)
- `npm run check` - TypeScript type checking
- `vercel` - Deploy to Vercel preview environment
- `vercel --prod` - Deploy to Vercel production

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
- **Backend**: Vercel Serverless Functions (TypeScript)
- **Storage**: In-memory storage (MemStorage class)
- **Styling**: Tailwind CSS with Apple-inspired design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Email**: Resend API service
- **Build**: Vite
- **Deployment**: Vercel

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components (home, articles, article, podcasts, podcast, not-found)
│   │   ├── data/           # Static data (articles.ts, podcasts.ts)
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── api/                    # Vercel serverless functions
│   ├── profile.ts         # GET /api/profile
│   └── contact.ts         # POST /api/contact
├── server/                 # Server utilities (used by API functions)
│   ├── email.ts           # Email service (Resend integration)
│   └── storage.ts         # In-memory storage operations
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Zod validation schemas
├── public/                 # Static assets (icons, images, manifests)
├── dist/                   # Production build output (Vite)
├── vercel.json            # Vercel deployment configuration
└── .vercelignore          # Files to exclude from Vercel deployment
```

### Key Features
- **Articles System**: Centralized articles data with comprehensive publishing workflow and PDF downloads
- **Podcasts System**: YouTube-integrated podcast platform with embedding and fallback handling
- **Search Integration**: Advanced search with keyword matching and content excerpts
- **Contact Form**: Full-stack contact form with email notifications
- **SEO Optimized**: Complete meta tags, structured data, and accessibility
- **Professional Portfolio**: Sections for about, expertise, experience, articles, and podcasts

## Hosting & Deployment

### Vercel Configuration
- **Platform**: Vercel (serverless platform)
- **Build Configuration**: Defined in vercel.json
- **Runtime**: Node.js 20.x (managed by Vercel)
- **Auto-scaling**: Automatic serverless scaling
- **GitHub Integration**: Automatic deployments from main branch
- **Global CDN**: Automatic edge caching for static assets

### Environment Variables (Production)
Required for production deployment in Vercel dashboard:
```env
RESEND_API_KEY=resend_api_key_for_email_service
EMAIL_FROM_DOMAIN=jamieson.digital
VITE_GA_MEASUREMENT_ID=G-QLHNT88NN1
```

Note: DATABASE_URL, SESSION_SECRET, PORT, and NODE_ENV are not required for Vercel deployment as we use in-memory storage.

### Build Process
1. **Development**: `npm run dev` - Vercel local development server with HMR and serverless functions
2. **Production Build**: `npm run build` - TypeScript check + Vite build for static assets
3. **Modern Build Targets**: ES2020+ with optimized chunk splitting

### Deployment Process
- **Automatic**: Pushes to main branch trigger Vercel production deployments
- **Preview**: Pull requests automatically create preview deployments
- **Manual**: Run `vercel` for preview or `vercel --prod` for production
- **Build Commands**:
  - Install: `npm ci`
  - Build: `npm run build`
  - Output Directory: `dist/public`

## Development Architecture

### Frontend Routing (Wouter)
- `/` - Homepage with hero, about, expertise, experience, articles preview, contact
- `/articles` - Full articles listing page with search and filtering
- `/article/:slug` - Individual article pages with full content and PDF downloads
- `/podcasts` - Podcasts listing page with YouTube integration
- `/podcast/:slug` - Individual podcast pages with embedded YouTube players
- Error pages with proper HTTP status codes and user-friendly messages

### Backend API Structure (Vercel Serverless Functions)
- `GET /api/profile` - Profile information (api/profile.ts)
- `POST /api/contact` - Submit contact form with validation and email notifications (api/contact.ts)

### Data Storage
- **In-Memory Storage**: Uses MemStorage class in server/storage.ts
- **Profile Data**: Hardcoded professional information
- **Contact Submissions**: Stored in memory (cleared on function cold start)
- **Future Enhancement**: Can migrate to Vercel KV or PostgreSQL if persistence is needed

### Static Assets & SEO
- Icons and images in `/public/` directory
- Complete SEO implementation with meta tags, Open Graph, Twitter cards
- Structured data schemas for articles and organization
- Sitemap, robots.txt, and web manifest configured
- Social preview images for article sharing
- WCAG 2.2 Level AA accessibility compliance

## Content Management Systems

### Articles Management System

#### Article Publishing Workflow
- **Data File**: `client/src/data/articles.ts` - Article metadata and search keywords
- **Content File**: `client/src/pages/article.tsx` - Full article HTML content
- **Hero Articles**: First 3 articles in array automatically become homepage heroes
- **Search Integration**: Enhanced keywords and content excerpts for discoverability
- **PDF Downloads**: Support for downloadable guides with analytics tracking

#### Article Structure
- **Metadata**: Title, description, category, read time, publish date, author
- **Search Fields**: Keywords, content excerpt for enhanced findability
- **Download Fields**: hasDownload, downloadUrl, downloadTitle, downloadSize (optional)
- **Content**: Full HTML with proper semantic structure
- **References**: Formatted academic-style citations
- **Social Sharing**: Individual preview images for each article

#### Categories and Icons
Available categories:
- Strategy (businessIcon)
- Technology (aiIcon)
- Digital Marketing (seoIcon)
- Leadership (leadershipIcon)
- Future of Work (transformationIcon)

### Podcasts Management System

#### Podcast Structure
- **Data File**: `client/src/data/podcasts.ts` - Podcast metadata and YouTube integration
- **YouTube Integration**: Direct embedding with fallback for restricted videos
- **Embedding Handling**: `embedRestricted` flag for videos that cannot be embedded
- **Categories**: trailer, episode, special
- **Content**: Topics, guest information, descriptions, and search keywords

#### YouTube Player Features
- **Responsive Design**: Automatic aspect ratio handling for shorts vs regular videos
- **Error Handling**: Graceful fallback for embedding restrictions (Error 153)
- **Analytics**: View tracking and engagement metrics

## Search Management System

### Search Functionality
- **Command Palette**: ⌘K/Ctrl+K global search across articles and podcasts
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
- Vite handles client-side development with HMR (Hot Module Reload)
- Express serves API routes and handles static assets
- `server/vite.ts` configures development middleware
- Static assets served from both `/public` and client build (including `/downloads/` for PDFs)
- WebSocket support for development features
- Automatic TypeScript checking and error reporting

### Security Features
- **Helmet.js**: Comprehensive security headers (CSP, HSTS, X-Frame-Options)
- **Rate Limiting**: API endpoints protected (100 requests/minute)
- **Input Validation**: Zod schema validation with length limits
- **Payload Limits**: 1MB request body limit
- **Environment Separation**: All secrets properly managed

### Data Storage Notes
- **Current**: In-memory storage (MemStorage class)
- **Future Database Option**: If persistence is needed, can add Vercel Postgres or Neon Database
- **Contact Submissions**: Currently stored in memory; consider adding database or Vercel KV for persistence

## Branch Strategy
- `main` - Production branch (auto-deploys to Vercel)
- Feature branches - For new development (merge to main when ready)
- Always commit completed features with descriptive messages
- Pull requests automatically create Vercel preview deployments

## Important Development Patterns

### Adding New Articles
1. Add article metadata to `allArticles` array in `client/src/data/articles.ts` as first item (for hero placement)
2. Add full HTML content to articles object in `client/src/pages/article.tsx`
3. For articles with downloads: set `hasDownload: true` and provide download properties
4. Update `public/sitemap.xml` with new article URL
5. Include comprehensive search keywords for discoverability

### Adding New Podcasts
1. Add podcast metadata to `allPodcasts` array in `client/src/data/podcasts.ts`
2. Extract YouTube video ID from URL
3. Set `embedRestricted: true` for videos that cannot be embedded (YouTube Error 153)
4. Include topics array and search keywords
5. Update `public/sitemap.xml` with new podcast URL

### YouTube Integration Handling
- Use `YouTubePlayer` component for embedded videos
- Set `embedRestricted: true` for videos that show "Video unavailable" in embed
- Component automatically provides fallback "Watch on YouTube" button for restricted videos
- Supports both regular videos (16:9) and YouTube Shorts (9:16) aspect ratios

## Code Standards

### TypeScript Configuration
- ES modules throughout (`"type": "module"` in package.json)
- Strict TypeScript mode enabled
- Node.js 16+ required (defined in engines)
- Modern build targets with BigInt support for Drizzle ORM compatibility

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

### Content Management Best Practices
- New articles must be added as first item in `allArticles` array (hero status)
- Include enhanced search keywords for discoverability
- Update sitemap.xml for new articles and podcasts
- For downloads: place PDF files in `/public/downloads/` directory
- Use `DownloadCTA` component for articles with downloadable content
- Test YouTube embedding before setting `embedRestricted: false`

### Vercel Deployment Information
- **Platform**: Vercel
- **Auto-deployment**: Triggered by pushes to main branch
- **Preview Deployments**: Automatic for all pull requests
- **Deployment Monitoring**: Use Vercel dashboard or CLI (`vercel inspect`)
- **Production Domain**: jamieson.digital

## Migration from AWS App Runner to Vercel

This project was migrated from AWS App Runner to Vercel. Key changes made:
1. **Serverless Functions**: Converted Express routes to Vercel serverless functions in `/api` directory
2. **Build Process**: Simplified to only build client-side assets (no server bundling)
3. **Development**: Now uses `vercel dev` instead of Express development server
4. **Configuration**: Added `vercel.json` and `.vercelignore` for deployment settings
5. **Old Files**: Legacy Express server files kept for reference but not used (`server/index.ts`, `server/index-simple.ts`, `server/vite.ts`)