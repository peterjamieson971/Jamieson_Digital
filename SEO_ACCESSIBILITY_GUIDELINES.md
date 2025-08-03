# SEO & Accessibility Guidelines
## Complete Implementation Guide for Peter Jamieson Portfolio

*Last Updated: August 2025*

---

## Table of Contents
1. [SEO Implementation](#seo-implementation)
2. [Accessibility Implementation](#accessibility-implementation)
3. [Technical Standards](#technical-standards)
4. [Content Guidelines](#content-guidelines)
5. [Future Article Requirements](#future-article-requirements)
6. [Deployment Considerations](#deployment-considerations)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## SEO Implementation

### Core HTML Structure

#### Meta Tags (Applied to all pages)
```html
<!-- Language Declaration -->
<html lang="en">

<!-- Viewport & Mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

<!-- Core SEO Meta Tags -->
<title>Page Title | Peter Jamieson</title>
<meta name="description" content="Compelling 150-160 character description" />
<meta name="author" content="Peter Jamieson, Fellow BCS, CIO50 Middle East" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<!-- Canonical URL (Critical for all pages) -->
<link rel="canonical" href="https://jamieson.digital/page-path" />

<!-- Geographic Meta Tags -->
<meta name="geo.region" content="AE-DU" />
<meta name="geo.placename" content="Dubai, UAE" />
<meta name="geo.position" content="25.2048;55.2708" />
<meta name="ICBM" content="25.2048, 55.2708" />
```

#### Open Graph Implementation
```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Page Title | Peter Jamieson" />
<meta property="og:description" content="Compelling description matching meta description" />
<meta property="og:type" content="website" /> <!-- or "article" for blog posts -->
<meta property="og:url" content="https://jamieson.digital/page-path" />
<meta property="og:site_name" content="Peter Jamieson" />
<meta property="og:image" content="https://jamieson.digital/professional-headshot.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Descriptive alt text for image" />
<meta property="og:locale" content="en_US" />
```

#### Twitter Cards
```html
<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@digitaljamieson" />
<meta name="twitter:creator" content="@digitaljamieson" />
<meta name="twitter:title" content="Page Title | Peter Jamieson" />
<meta name="twitter:description" content="Twitter-optimized description" />
<meta name="twitter:image" content="https://jamieson.digital/professional-headshot.jpg" />
<meta name="twitter:image:alt" content="Descriptive alt text" />
```

### Structured Data Implementation

#### Person Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Peter Jamieson",
  "jobTitle": "Chief Information Officer",
  "description": "Digital Transformation Leader with 15+ years of experience",
  "url": "https://jamieson.digital",
  "image": "https://jamieson.digital/professional-headshot.jpg",
  "sameAs": [
    "https://linkedin.com/in/pjamieson",
    "https://twitter.com/digitaljamieson",
    "https://instagram.com/peterjamieson"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Seddiqi Holding",
    "description": "Senior Director Group Technology"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "alumniOf": [{
    "@type": "Organization",
    "name": "BCS, The Chartered Institute for IT",
    "description": "Fellow BCS (2022)"
  }],
  "award": [
    "CIO50 Middle East (IDC, 2021)",
    "Fellow BCS (2022)"
  ],
  "knowsAbout": [
    "Digital Transformation",
    "Enterprise Architecture",
    "Cloud Strategy",
    "Artificial Intelligence",
    "IT Governance",
    "Technology Leadership"
  ]
}
```

#### Article Schema (For all blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Peter Jamieson",
    "jobTitle": "Chief Information Officer",
    "url": "https://jamieson.digital"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Peter Jamieson",
    "url": "https://jamieson.digital"
  },
  "datePublished": "2025-08-01T00:00:00Z",
  "dateModified": "2025-08-01T00:00:00Z",
  "image": "https://jamieson.digital/article-image.jpg",
  "url": "https://jamieson.digital/article/slug",
  "wordCount": "2500",
  "keywords": ["AI", "Digital Transformation", "Technology"],
  "articleSection": "Technology",
  "inLanguage": "en-US"
}
```

#### Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://jamieson.digital/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Articles",
      "item": "https://jamieson.digital/#articles"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Article Title",
      "item": "https://jamieson.digital/article/slug"
    }
  ]
}
```

### Performance Optimization
```html
<!-- Performance Meta Tags -->
<meta name="theme-color" content="#007AFF" />

<!-- DNS Prefetch & Preconnect -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Critical Resource Preload -->
<link rel="preload" href="/favicon.ico" as="image" />
```

### Technical SEO Files

#### robots.txt
```
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://jamieson.digital/sitemap.xml

# Block access to development files
Disallow: /src/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /server/

# Allow important pages
Allow: /
Allow: /article/*

# Crawl-delay for respectful crawling
Crawl-delay: 1
```

#### sitemap.xml Structure
- Homepage (priority: 1.0, changefreq: weekly)
- Main sections (priority: 0.8-0.9, changefreq: monthly)
- Articles (priority: 0.7, changefreq: monthly)
- All URLs must include lastmod date

---

## Accessibility Implementation

### WCAG 2.2 Level AA Compliance

#### Navigation Structure
```jsx
// Skip Link Implementation
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-apple-blue text-white px-4 py-2 z-[60] rounded-br transition-all"
>
  Skip to main content
</a>

// Navigation with ARIA
<nav 
  className="navigation-class"
  role="navigation"
  aria-label="Main navigation"
>
  <div className="menu-container" role="menubar">
    <a href="#section" 
       className="focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1" 
       role="menuitem">
      Section Name
    </a>
  </div>
</nav>
```

#### Semantic HTML Structure
```jsx
// Main Content Structure
<main id="main-content" role="main">
  <article itemScope itemType="https://schema.org/Article">
    <header>
      <h1>Article Title</h1>
    </header>
    <section>
      <h2>Section Heading</h2>
      <p>Content</p>
    </section>
  </article>
</main>
```

#### Form Accessibility
```jsx
// Accessible Form Implementation
<section aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact Form</h2>
  <form>
    <FormField>
      <FormLabel>Field Label</FormLabel>
      <FormControl>
        <Input
          aria-describedby="field-help"
          className="focus:ring-apple-blue focus:border-apple-blue"
        />
      </FormControl>
      <FormMessage id="field-help" />
    </FormField>
  </form>
</section>
```

#### Breadcrumb Navigation
```jsx
// Accessible Breadcrumbs
<nav aria-label="Breadcrumb">
  <ol className="breadcrumb-list">
    <li>
      <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-apple-blue">
        Home
      </Link>
    </li>
    <li>
      <span aria-hidden="true">/</span>
    </li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

### CSS Accessibility Utilities
```css
/* Screen Reader Only Content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Focus Management */
.focus\:outline-none:focus {
  outline: none;
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px var(--apple-blue);
}
```

---

## Technical Standards

### React Component Requirements

#### Helmet Implementation (All Pages)
```jsx
import { Helmet } from "react-helmet-async";

function PageComponent() {
  return (
    <>
      <Helmet>
        <title>Page Title | Peter Jamieson</title>
        <link rel="canonical" href="page-url" />
        <meta name="description" content="page-description" />
        {/* Additional meta tags */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

#### Image Optimization Standards
```jsx
// All images must include:
<img 
  src="image-url" 
  alt="Descriptive alternative text" 
  className="responsive-class"
  loading="lazy" // For non-critical images
  width="actual-width"
  height="actual-height"
/>
```

### Color Contrast Requirements
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18pt+): 3:1 minimum contrast ratio
- Interactive elements: 3:1 minimum contrast ratio
- Current implementation exceeds these requirements

### Keyboard Navigation Standards
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Tab order must be logical
- Skip links implemented for main navigation

---

## Content Guidelines

### Article Content Requirements

#### Title Optimization
- 50-60 characters for optimal search display
- Include primary keyword naturally
- Unique across all articles
- Format: "Primary Topic: Descriptive Subtitle"

#### Meta Description Standards
- 150-160 characters maximum
- Include primary keyword
- Compelling call-to-action
- Unique for each article
- Format: "Article summary - Expert insights from Peter Jamieson. [Reading time]."

#### Heading Structure (Critical for SEO & Accessibility)
```html
<h1>Article Title (Only one H1 per page)</h1>
<h2>Main Section Headings</h2>
<h3>Subsection Headings</h3>
<h4>Sub-subsection Headings</h4>
<!-- No skipping heading levels -->
```

#### Content Structure Best Practices
- Introduction paragraph summarizing key points
- Clear section breaks with descriptive headings
- Bullet points for easy scanning
- Internal links to related content
- Author bio section at end
- Call-to-action for engagement

### Image Guidelines
- All images require descriptive alt text
- File names should be descriptive (no generic names)
- Optimize for web performance
- Include structured data for featured images
- Social media images: 1200x630px minimum

---

## Future Article Requirements

### Mandatory Implementation Checklist

For every new article, ensure:

#### SEO Requirements
- [ ] Unique title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL configured
- [ ] Article structured data implemented
- [ ] Breadcrumb navigation added
- [ ] Internal linking strategy
- [ ] Keyword optimization (natural integration)
- [ ] Image optimization with alt text
- [ ] Social media meta tags
- [ ] Reading time calculation

#### Accessibility Requirements
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Semantic HTML structure
- [ ] Alternative text for all images
- [ ] Descriptive link text
- [ ] Form labels if applicable
- [ ] Color contrast compliance
- [ ] Keyboard navigation testing
- [ ] Screen reader testing

#### Technical Requirements
- [ ] react-helmet-async implementation
- [ ] Mobile responsive design
- [ ] Performance optimization
- [ ] Error-free code validation
- [ ] Cross-browser testing

### Article Template Structure
```jsx
export default function NewArticle() {
  const article = articles["article-slug"];
  
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        {/* All required meta tags */}
      </Helmet>
      
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        {/* Breadcrumb implementation */}
      </nav>
      
      <main id="main-content" role="main">
        <article itemScope itemType="https://schema.org/Article">
          <header>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span className="category">{article.category}</span>
              <span className="read-time">{article.readTime}</span>
              <span className="publish-date">{article.publishDate}</span>
            </div>
          </header>
          
          <div className="article-content">
            {/* Article content with proper heading structure */}
          </div>
          
          <footer className="article-footer">
            {/* Author bio and CTA */}
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
```

---

## Deployment Considerations

### Pre-Deployment Checklist
- [ ] All SEO meta tags implemented
- [ ] Accessibility testing completed
- [ ] Performance optimization verified
- [ ] Cross-browser compatibility tested
- [ ] Mobile responsiveness confirmed
- [ ] Error-free code validation
- [ ] Structured data validation
- [ ] Internal link auditing
- [ ] Image optimization completed
- [ ] Security headers configured

### Production Environment
- **Deployment Type**: Autoscale (recommended for variable traffic)
- **Custom Domain**: jamieson.digital
- **SSL**: Automatic (provided by Replit)
- **Performance Monitoring**: Enable Replit Analytics
- **Error Tracking**: Configure for production issues

### Environment Variables Required
```
REPLIT_DOMAINS=jamieson.digital
NODE_ENV=production
```

---

## Monitoring & Maintenance

### Regular Audit Schedule

#### Monthly Reviews
- Check Core Web Vitals performance
- Verify structured data validation
- Test accessibility compliance
- Review internal link structure
- Monitor search console errors

#### Quarterly Reviews
- Complete SEO audit
- Accessibility compliance review
- Content freshness audit
- Technical performance review
- Competitive analysis update

#### Annual Reviews
- Full website redesign considerations
- Technology stack updates
- Accessibility standard updates (WCAG)
- SEO strategy refinement

### Key Performance Indicators

#### SEO Metrics
- Search console impressions/clicks
- Core Web Vitals scores
- Page speed insights ratings
- Structured data validation
- Mobile usability scores

#### Accessibility Metrics
- Lighthouse accessibility score (target: 90+)
- Keyboard navigation functionality
- Screen reader compatibility
- Color contrast compliance
- Error-free validation

### Tools for Ongoing Monitoring
- Google Search Console
- Google PageSpeed Insights
- Lighthouse audits
- WAVE accessibility checker
- axe DevTools
- Screaming Frog SEO Spider

---

## Implementation Notes

### Current Status
- ✅ All core SEO optimizations implemented
- ✅ WCAG 2.2 Level AA compliance achieved
- ✅ Performance optimizations applied
- ✅ Structured data comprehensive
- ✅ Mobile optimization complete
- ✅ Accessibility testing verified

### Future Enhancements
- Service worker implementation
- PWA manifest.json
- Advanced analytics integration
- RSS feed generation
- Social sharing functionality
- Dark mode accessibility testing

---

*This document serves as the definitive guide for maintaining SEO and accessibility standards across the Peter Jamieson portfolio website. All future updates and content additions must adhere to these guidelines.*

**Contact for Updates**: Reference this document for all future development work and ensure compliance with established standards.