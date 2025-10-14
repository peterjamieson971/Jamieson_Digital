# Jamieson Digital - Professional Portfolio

A modern, serverless portfolio and thought leadership platform for Peter Jamieson, built with React, TypeScript, and Vercel.

## 🚀 Live Site

- **Production**: [www.jamieson.digital](https://www.jamieson.digital)
- **Alternate**: [jamieson.digital](https://jamieson.digital) (redirects to www)
- **Vercel Default**: [jamieson-digital.vercel.app](https://jamieson-digital.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Vercel Serverless Functions
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with Apple-inspired design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Email**: Resend API
- **Deployment**: Vercel with automatic deployments

## 📁 Project Structure

```
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route components
│   │   ├── data/             # Static content (articles, podcasts)
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utilities
├── api/                      # Vercel serverless functions
│   ├── profile.ts           # GET /api/profile
│   └── contact.ts           # POST /api/contact
├── server/                   # Shared server utilities
│   ├── storage.ts           # In-memory data storage
│   └── email.ts             # Email service (Resend)
├── shared/                   # Shared types and schemas
│   └── schema.ts            # Zod validation schemas
├── public/                   # Static assets
└── vercel.json              # Vercel configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Vercel CLI (for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/peterjamieson971/Jamieson_Digital.git
cd Jamieson_Digital

# Install dependencies
npm install

# Install Vercel CLI globally (if not already installed)
npm install -g vercel
```

### Development

```bash
# Start Vercel development server
vercel dev

# Opens at http://localhost:3000
# Includes hot reload and serverless functions
```

### Building

```bash
# TypeScript check + Vite build
npm run build

# Output: dist/public/
```

## 📝 Adding Content

### Adding a New Article

1. **Add metadata** to `client/src/data/articles.ts`:
```typescript
export const allArticles = [
  {
    slug: "your-article-slug",
    title: "Your Article Title",
    description: "Brief description",
    category: "Strategy", // or Technology, Digital Marketing, etc.
    readTime: "8 min read",
    publishDate: "2025-10-15",
    author: "Peter Jamieson",
    keywords: ["keyword1", "keyword2"],
    contentExcerpt: "First paragraph for search...",
  },
  // ... existing articles
];
```

2. **Add content** to `client/src/pages/article.tsx`:
```typescript
const articles: { [key: string]: ArticleContent } = {
  "your-article-slug": {
    content: `
      <div class="article-content">
        <p>Your article content in HTML...</p>
      </div>
    `,
    references: [
      "Reference 1",
      "Reference 2",
    ],
  },
  // ... existing articles
};
```

3. **Update sitemap**: Add new URL to `public/sitemap.xml`

4. **Test locally**: Run `vercel dev` and navigate to `/article/your-article-slug`

### Adding a New Podcast

1. **Add metadata** to `client/src/data/podcasts.ts`:
```typescript
export const allPodcasts = [
  {
    id: "unique-id",
    title: "Podcast Title",
    description: "Episode description",
    videoId: "YouTube_Video_ID",
    embedRestricted: false, // Set to true if embedding is blocked
    category: "episode",
    publishDate: "2025-10-15",
    topics: ["Topic 1", "Topic 2"],
    keywords: ["keyword1", "keyword2"],
  },
  // ... existing podcasts
];
```

2. **Update sitemap**: Add new URL to `public/sitemap.xml`

3. **Test locally**: Verify YouTube embedding works

### Adding PDF Downloads

1. Place PDF file in `public/downloads/`
2. In article metadata, set:
```typescript
{
  hasDownload: true,
  downloadUrl: "/downloads/your-file.pdf",
  downloadTitle: "Download Guide",
  downloadSize: "2.5 MB", // optional
}
```

## 🚢 Deployment

### Automatic Deployment

Pushes to `vercel-migration` branch automatically deploy to production:

```bash
git add .
git commit -m "Add new article about AI strategy"
git push origin vercel-migration
```

Vercel will automatically:
1. Build the project
2. Run tests
3. Deploy to production
4. Provide deployment URL

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🔐 Environment Variables

Required in Vercel dashboard:

- `RESEND_API_KEY` - Email service API key
- `EMAIL_FROM_DOMAIN` - Email sender domain (qstore24.com)
- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking ID

## 🔗 Key Features

- **Articles System**: Comprehensive article publishing with PDF downloads
- **Podcasts System**: YouTube-integrated podcast platform
- **Search**: Advanced search across all content
- **Contact Form**: Email notifications via Resend
- **SEO Optimized**: Complete meta tags, structured data, sitemap
- **Responsive Design**: Mobile-first, Apple-inspired UI
- **Performance**: Serverless, edge-cached, optimized builds

## 📚 Additional Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete development guide for AI assistants
- **[vercel.json](vercel.json)** - Vercel deployment configuration
- **Vercel Dashboard**: [View deployments](https://vercel.com/peter-jamiesons-projects/jamieson-digital)

## 🤝 Contributing

This is a personal portfolio project. For questions or suggestions, contact peter@jamieson.digital.

## 📄 License

MIT License - See LICENSE file for details

---

**Built with** ❤️ **by Peter Jamieson**
