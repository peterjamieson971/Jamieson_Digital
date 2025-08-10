# Article Publishing Guide

## Overview
This comprehensive guide ensures consistency, SEO optimization, and proper search integration for all new articles published on jamieson.digital.

## 📋 Complete Publishing Checklist

### Phase 1: Content Preparation
- [ ] Article content written and reviewed
- [ ] Article title finalized (SEO-optimized)
- [ ] Article description written (150-160 characters)
- [ ] Category selected from existing categories
- [ ] Estimated read time calculated
- [ ] References compiled and formatted
- [ ] Search keywords identified
- [ ] Icon selected from available icons

### Phase 2: Article Data Setup
- [ ] Add article to `articles.ts` (positioned as first item for hero status)
- [ ] Add article content to `article.tsx`
- [ ] Create social preview HTML file
- [ ] Update `sitemap.xml`

### Phase 3: Quality Assurance
- [ ] Test article displays correctly
- [ ] Test search functionality
- [ ] Verify hero article positioning
- [ ] Check mobile responsiveness
- [ ] Validate all links work
- [ ] Test social sharing preview

### Phase 4: Go Live
- [ ] Run type checking (`npm run check`)
- [ ] Test in development server
- [ ] Commit changes to git
- [ ] Deploy to production

---

## 🎯 Step-by-Step Implementation

### Step 1: Add Article to Data File (`/client/src/data/articles.ts`)

**Location**: Add as the **first item** in the `allArticles` array to make it a hero article.

```typescript
export const allArticles: Article[] = [
  {
    // NEW ARTICLE GOES HERE AS FIRST ITEM
    title: "Your New Article Title",
    description: "Compelling description that summarizes the article in 150-160 characters for SEO and social sharing.",
    icon: businessIcon, // Choose from: businessIcon, aiIcon, seoIcon, transformationIcon, leadershipIcon
    slug: "your-article-slug", // URL-friendly slug (lowercase, hyphens)
    readTime: "X min read", // Calculate: ~200 words per minute
    category: "Strategy", // Existing categories: Strategy, Technology, Digital Marketing, Leadership, Future of Work
    publishDate: "August 2025", // Current month/year
    author: "Peter Jamieson",
    hasVideo: false,
    
    // ENHANCED SEARCH FIELDS (Recommended)
    searchKeywords: [
      "Company names mentioned",
      "Technical terms used", 
      "Important statistics",
      "Key people referenced",
      "Industry concepts",
      "Specific products/services"
    ],
    contentExcerpt: "2-3 sentence summary including key case studies, statistics, companies mentioned, and main insights that users might search for."
  },
  
  // Existing articles follow...
  {
    title: "GPT-5: What I've Learned About OpenAI's Game-Changing Release",
    // ... (this becomes the second hero article)
  }
  // ...
];
```

### Step 2: Add Article Content (`/client/src/pages/article.tsx`)

**Location**: Add as the **first entry** in the `articles` object.

```typescript
const articles: Record<string, ArticleData> = {
  "your-article-slug": {
    title: "Your New Article Title",
    category: "Strategy",
    readTime: "X min read", 
    publishDate: "August 2025",
    author: "Peter Jamieson",
    references: [
      { text: 'Source Name. (Year). "Title." Publication or Report Name.' },
      { text: 'Author Name. (Year, Month Day). "Article Title." Website/Publication Name.' },
      // Add all references in this format
    ],
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>First Major Section</h2>
        <p>Your article content with proper HTML formatting...</p>
        
        <h3>Subsection</h3>
        <p>More content...</p>
        
        <h2>Another Major Section</h2>
        <p>Continue with well-structured content...</p>
      </div>
    `
  },
  
  // Existing articles follow...
};
```

### Step 3: Create Social Preview Image

**Location**: `/public/social-images/your-article-slug-social.html`

Copy the template from any existing social preview file and update:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- Copy style section from existing social preview files -->
</head>
<body>
    <div class="pattern"></div>
    <div class="badge">jamieson.digital</div>
    <div class="container">
        <div class="logo">PJ</div>
        <h1>Your Article Title</h1>
        <p class="subtitle">Your article description for social sharing.</p>
        <p class="author">Peter Jamieson • Digital Transformation Leader</p>
    </div>
</body>
</html>
```

### Step 4: Update Sitemap

**Location**: `/public/sitemap.xml`

Add your article URL as the **first entry** after the main pages:

```xml
<url>
  <loc>https://jamieson.digital/article/your-article-slug</loc>
  <lastmod>2025-08-10</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 📝 Content Formatting Standards

### Article Structure
```html
<div class="prose prose-lg max-w-none">
  <h2>Major Section Title</h2>
  <p>Introduction paragraph...</p>
  
  <h3>Subsection Title</h3>
  <p>Content with proper formatting...</p>
  
  <!-- Use h2 for main sections, h3 for subsections -->
  <!-- Keep paragraphs concise and readable -->
  <!-- Use <strong> for emphasis, <em> for emphasis -->
</div>
```

### References Format
Always include properly formatted references:

```typescript
references: [
  { text: 'Company Name. (Year). "Report Title." Official Source Name.' },
  { text: 'Author. (Year, Month Day). "Article Title." Publication Name.' },
  { text: 'Organization. (Year). "Study Name." Research Institution.' }
]
```

**Reference Examples:**
- `{ text: 'OpenAI. (2025). "GPT-5 Technical Report." OpenAI Research Publications.' }`
- `{ text: 'McKinsey & Company. (2025, August). "AI Adoption in Enterprise." McKinsey Digital.' }`
- `{ text: 'Gartner, Inc. (2025). "Magic Quadrant for AI Platforms." Gartner Research.' }`

---

## 🏆 Hero Article Management

### Making Articles Hero Articles
1. **Position as First Item**: Add new article as the first entry in `allArticles` array
2. **Automatic Hero Status**: The `featuredArticles` array automatically takes the first 3 articles
3. **Reordering**: Existing hero articles automatically move to positions 2 and 3

### Hero Article Flow
```
New Article (Position 1) → Hero Article #1 ✨
GPT-5 Article (Position 2) → Hero Article #2  
MCP Article (Position 3) → Hero Article #3
All Other Articles → Full Articles Page Only
```

---

## 🔍 Search Integration Guide

### Enhanced Search Fields (Recommended)

```typescript
searchKeywords: [
  "OpenAI",           // Company names
  "GPT-5",            // Product names  
  "Sam Altman",       // People names
  "162 million",      // Specific numbers
  "security breach",  // Technical concepts
  "HVAC vendor",      // Specific details
  "Target",           // Case study companies
  "network segmentation" // Technical terms
],
contentExcerpt: "Brief summary mentioning key companies like Target and Equifax, important statistics like 40 million stolen records, and technical concepts like network segmentation that readers might search for."
```

### Search Best Practices

**✅ DO Include in Keywords:**
- Company names mentioned in article
- Specific statistics and numbers  
- Technical terms and concepts
- People names (CEOs, experts, etc.)
- Product/service names
- Geographic locations
- Industry-specific terminology

**❌ DON'T Include:**
- Generic words like "business", "technology"
- Words already in the title
- Common articles (the, and, with)
- Overly broad terms

### Testing Search
After publishing, test these searches:
1. Company names mentioned in your article
2. Key statistics or numbers referenced
3. Technical terms you discuss
4. People names you mention
5. Main concepts covered

---

## 🌍 SEO and Technical Setup

### URL Slug Guidelines
- Use lowercase letters only
- Replace spaces with hyphens
- Keep under 60 characters
- Make it descriptive and readable
- Examples: `"enterprise-architecture-roi-goldmine"`, `"ai-board-communication-guide"`

### Category Selection
Choose from existing categories to maintain consistency:
- `"Strategy"` - Business strategy, ROI, planning
- `"Technology"` - AI, development, technical topics  
- `"Digital Marketing"` - SEO, search, marketing
- `"Leadership"` - Skills, communication, management
- `"Future of Work"` - Industry trends, workforce

### Icon Selection
Available icons in `/public/`:
- `businessIcon` - For business/strategy articles
- `aiIcon` - For AI/technology articles  
- `seoIcon` - For marketing/search articles
- `transformationIcon` - For transformation/change articles
- `leadershipIcon` - For leadership/skills articles

### Read Time Calculation
- **Formula**: Word count ÷ 200 = minutes
- **Examples**: 
  - 2000 words = "10 min read"
  - 3600 words = "18 min read" 
  - 4400 words = "22 min read"

---

## ✅ Quality Assurance Checklist

### Pre-Publication Testing
- [ ] **Article Display**: Article renders correctly with proper formatting
- [ ] **Hero Status**: New article appears as first hero article on homepage
- [ ] **Search Functionality**: Article found when searching for key terms
- [ ] **Navigation**: Article accessible via articles page
- [ ] **References**: References section displays properly
- [ ] **Mobile**: Article readable on mobile devices
- [ ] **Links**: All internal/external links work correctly
- [ ] **Social Preview**: Social sharing shows correct preview

### Development Testing
```bash
# Run type checking
npm run check

# Start development server  
npm run dev

# Test at http://localhost:3000
```

### Search Testing Procedure
1. Open command palette (⌘K/Ctrl+K)
2. Search for article title - should find article
3. Search for company names mentioned - should find article
4. Search for technical terms used - should find article
5. Test on articles page search bar
6. Test on homepage quick search

### Content Review
- [ ] **Grammar**: Proofread for errors
- [ ] **Links**: Verify all external links work
- [ ] **Facts**: Double-check statistics and claims
- [ ] **Consistency**: Matches site's tone and style
- [ ] **SEO**: Title and description optimized
- [ ] **Accessibility**: Proper heading structure (h2, h3)

---

## 🚀 Go-Live Process

### Final Steps
1. **Type Check**: Run `npm run check` - must pass
2. **Development Test**: Test full functionality on dev server
3. **Git Commit**: Commit all changes with descriptive message
4. **Production Deploy**: Deploy to production environment

### Git Commit Message Template
```
Add [Article Title] as hero article

- Add comprehensive article with [X] references
- Position as primary hero article on homepage  
- Include enhanced search keywords: [key terms]
- Update sitemap.xml and create social preview
- Article covers [brief summary of main topics]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 📁 File Locations Quick Reference

| Task | File Location | Purpose |
|------|---------------|---------|
| Add article data | `/client/src/data/articles.ts` | Article metadata and search fields |
| Add article content | `/client/src/pages/article.tsx` | Full article HTML content |
| Create social preview | `/public/social-images/[slug]-social.html` | Social sharing image |
| Update sitemap | `/public/sitemap.xml` | SEO and search indexing |

---

## ⚠️ Common Mistakes to Avoid

1. **Wrong Position**: Not adding as first item in arrays (won't be hero article)
2. **Mismatched Slugs**: Different slugs in `articles.ts` vs `article.tsx` 
3. **Missing References**: Forgetting to format references properly
4. **No Search Keywords**: Missing enhanced search fields
5. **Broken HTML**: Malformed HTML in content section
6. **Wrong Category**: Using non-existent category
7. **Forgot Sitemap**: Not updating sitemap.xml
8. **No Social Preview**: Missing social sharing image

---

## 🔄 Maintenance and Updates

### Updating Existing Articles
- Edit content in `article.tsx`
- Update metadata in `articles.ts` if needed
- Add enhanced search fields to older articles when updating
- Update references if sources change

### Reordering Hero Articles
To change hero article order, simply reorder the first 3 items in the `allArticles` array.

### Adding New Categories
1. Add category to articles as needed
2. Categories auto-populate in filtering system
3. Maintain consistency across articles

---

This guide ensures every new article meets the highest standards for user experience, SEO, and discoverability while maintaining consistency across your professional website.