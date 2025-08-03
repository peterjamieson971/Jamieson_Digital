# Overview

This is a personal brand portfolio website built as a full-stack application showcasing a professional's expertise as an Applied Futurist and Innovation Leader. The application presents a modern, Apple-inspired design with sections for about, core expertise, experience, and contact information. It serves as both a marketing tool and a platform for potential premium content access.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool and development server
- **Styling**: Tailwind CSS with a custom Apple-inspired design system featuring CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives for consistent, accessible components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Validation**: Zod schemas for request/response validation
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement and error handling via Vite integration

## Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL with connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current Implementation**: Memory-based storage for development with database interface ready for production

## Database Schema
The application defines three main entities:
- **Users**: Authentication system with username/password (prepared for future admin features)
- **Profiles**: Professional information including bio, expertise areas, roles, and contact details
- **Contact Submissions**: Form submissions from website visitors with name, email, message, and timestamp

## API Structure
- `GET /api/profile` - Retrieve profile information
- `PUT /api/profile` - Update profile data (for future admin panel)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve contact submissions (for future admin features)

## Authentication and Authorization
Currently implements a basic foundation with user schema and password storage. The system is prepared for session-based authentication using connect-pg-simple for PostgreSQL session storage, though authentication flows are not yet implemented in the current version.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with automatic scaling and connection pooling
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect

## Development Tools
- **Replit Integration**: Development environment integration with cartographer plugin for enhanced debugging
- **Vite**: Fast development server with HMR and optimized production builds

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility and flexibility
- **Tailwind CSS**: Utility-first CSS framework with custom Apple-inspired design tokens
- **Lucide React**: Icon library for consistent iconography

## Form and Data Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation for type safety across client and server
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates

## Build and Development
- **TypeScript**: Type safety across the full stack
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer