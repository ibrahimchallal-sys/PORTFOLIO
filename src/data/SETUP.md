# Portfolio Data Setup Guide

This guide explains how to update your portfolio projects, certificates, and badges.

## 📁 Files to Edit

### 1. Projects Data
**File:** `src/data/projectsData.js`

Edit the `projectsData` array to add, remove, or modify projects.

**Example:**
```javascript
{
  id: 1,
  image: "CSS.png",  // Image filename or URL
  categoryKey: "portfolio.categories.webDevelopment",
  titleKey: "projects.cssbattle.title",
  descriptionKey: "projects.cssbattle.description",
  link: "https://your-project-url.com",
  tagsKey: "projects.cssbattle.tags",
  isWorkingOn: false,  // Set to true to show "WORKING ON IT" overlay
}
```

**Important Notes:**
- `categoryKey`, `titleKey`, `descriptionKey`, and `tagsKey` must match keys in your translation files (`src/locales/en/translation.json`, etc.)
- Image files should be placed in `src/assets/images/portfolio-images/` or use full URLs
- Set `isWorkingOn: true` to show a "WORKING ON IT" overlay on the project card

### 2. Certificates & Badges Data
**File:** `src/data/certificatesData.js`

Edit the `certificatesData` array to add, remove, or modify certificates and badges.

**Example Certificate:**
```javascript
{
  id: 1,
  type: "certificate",
  miniature: "https://example.com/certificate.jpg",  // Image URL or path
  title: "Web Development Certificate",
  organization: "Example Organization",
  description: "Description of the certificate...",
  issueDate: "2024-01-15",  // Format: "YYYY-MM-DD" or "Month YYYY"
  credentialId: "CERT-2024-001",  // Optional
  credentialUrl: "https://example.com/verify/CERT-2024-001"  // Optional
}
```

**Example Badge:**
```javascript
{
  id: 2,
  type: "badge",
  miniature: "https://example.com/badge.jpg",
  title: "JavaScript Master",
  organization: "Code School",
  description: "Achieved mastery level in JavaScript programming.",
  issueDate: "2024-02-10",
  credentialId: "BADGE-JS-001",  // Optional
  credentialUrl: "https://example.com/badges/JS-001"  // Optional
}
```

**Important Notes:**
- `type` must be either `"certificate"` or `"badge"`
- Badges are displayed smaller and circular
- Certificates are displayed as larger cards
- Images can be URLs or local paths

### 3. Translation Files (for Projects)
**Files:** 
- `src/locales/en/translation.json`
- `src/locales/fr/translation.json`
- `src/locales/ar/translation.json`

When adding a new project, you need to add the translation keys in all language files.

**Example in `en/translation.json`:**
```json
{
  "projects": {
    "myNewProject": {
      "title": "My New Project",
      "description": "Description of my new project...",
      "tags": ["React", "TypeScript", "Tailwind CSS"]
    }
  }
}
```

Then in `projectsData.js`, use:
```javascript
{
  titleKey: "projects.myNewProject.title",
  descriptionKey: "projects.myNewProject.description",
  tagsKey: "projects.myNewProject.tags"
}
```

## 🖼️ Adding Images

### Project Images
1. Place images in `src/assets/images/portfolio-images/`
2. Use the filename in `projectsData.js` (e.g., `"my-image.png"`)
3. Or use full URLs: `"https://example.com/image.jpg"`

### Certificate/Badge Images
1. Use full URLs: `"https://example.com/certificate.jpg"`
2. Or use local paths relative to public folder
3. For badges, use square images (recommended: 150x150px or larger)
4. For certificates, use rectangular images (recommended: 300x200px or larger)

## 🔄 After Making Changes

1. Save the files
2. The changes will automatically appear when you refresh the page
3. No need to restart the server (hot reload will handle it)

## 📝 Quick Reference

### Project Fields
- `id`: Unique number
- `image`: Image filename or URL
- `categoryKey`: Translation key for category
- `titleKey`: Translation key for title
- `descriptionKey`: Translation key for description
- `link`: Project URL
- `tagsKey`: Translation key for tags
- `isWorkingOn`: Boolean (true/false)

### Certificate/Badge Fields
- `id`: Unique number
- `type`: "certificate" or "badge"
- `miniature`: Image URL or path
- `title`: Title text
- `organization`: Organization name
- `description`: Description text
- `issueDate`: Date string
- `credentialId`: Optional credential ID
- `credentialUrl`: Optional verification URL

## ❓ Need Help?

If you need to add more fields or modify the structure, you may also need to update:
- `src/services/projectsService.js`
- `src/services/certificatesService.js`
- `src/components/sections/Portfolio.jsx`
- `src/components/sections/Certificates.jsx` (if it exists)
