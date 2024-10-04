# Updated Product Requirements Document (PRD)

## 1. Product Name

Cai's AI Startup Journey Personal Website

## 2. Product Overview

This website showcases Cai's personal brand and entrepreneurial experiences, especially emphasizing the journey achieved through the use of AI tools. It includes tutorials, project showcases, blog content, and aims to inspire and support users on how to improve work efficiency and achieve personal entrepreneurship through AI tools.

## 3. Target Users

- **AI Tool Users**: Individuals interested in AI tools and technology.
- **Entrepreneurs**: People looking to understand how to leverage AI tools for entrepreneurship.
- **Content Creators**: Users aiming to enhance work efficiency and build a personal brand.

## 4. Core Features

### 4.1 Home Page Dynamic Title

- **Title Section**:
  - A large, prominent greeting: **"Hi there! I'm Cai."**
  - Followed by a subtitle: **"I'm an indie developer exploring AI-powered entrepreneurship."**
  - A dynamic text that automatically switches every few seconds:
    - **"I'm taking a Build in Public approach, focusing on [keyword]."**
    - The [keyword] cycles through: **AI tools**, **boosting productivity**, **personal growth**, and **entrepreneurship**.
  - Each keyword slides upward in succession and is highlighted in **blue** to emphasize key points.

- **Personal Avatar**:
  - A circular avatar located on the right side of the page.
  - Reflects the personal brand image.
  - avatar image path: `/avatars/IMG_9492.JPG`

#### Implementation Details

- Use a React component to cycle through the keywords.
- Implement smooth upward sliding transitions.
- Highlight keywords in blue for emphasis.

#### Example (Conceptual Code Snippet)

```jsx
// Pseudo-code for cycling through keywords
const keywords = ['AI', 'Startup', 'Product'];
const [currentKeyword, setCurrentKeyword] = useState(keywords[0]);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentKeyword(prev => {
      const currentIndex = keywords.indexOf(prev);
      return keywords[(currentIndex + 1) % keywords.length];
    });
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

### 4.2 Project Showcase

- Display Cai's ongoing projects below the home page.
- Use a card-style design for each project.
- Each project card includes:
  - Project name
  - Brief description
  - Link to the project

#### Implementation Details

- Store project data in a JSON file: `content/projects.json`.
- Map through the JSON data to render project cards.

#### Example (Project Data Structure)

```json
[
  {
    "name": "AI Productivity App",
    "description": "An app to enhance productivity using AI.",
    "link": "/projects/ai-productivity-app"
  },
  {
    "name": "Startup Toolkit",
    "description": "Tools and resources for new entrepreneurs.",
    "link": "/projects/startup-toolkit"
  }
]
```

### 4.3 Roadmap

- Showcase Cai's entrepreneurial roadmap, including future project plans and milestones.
- Users can clearly understand the entrepreneurial progress and future plans.

#### Storage Method

- Roadmap data stored in `content/roadmap.json`.

#### Example (Roadmap Data Structure)

```json
[
  {
    "title": "Launch Personal Website",
    "status": "Completed",
    "date": "2023-10-01"
  },
  {
    "title": "Develop AI Tool",
    "status": "In Progress",
    "date": "2023-12-01"
  },
  {
    "title": "Expand to Global Market",
    "status": "Planned",
    "date": "2024-06-01"
  }
]
```

### 4.4 Timeline

- Display Cai's entrepreneurial journey, including key milestones and achievements.
- Users can understand Cai's personal development process.

#### Storage Method

- Timeline data stored in `content/timeline.json`.

#### Example (Timeline Data Structure)

```json
[
  {
    "date": "2022-01-01",
    "description": "Started exploring AI tools.",
    "icon": "🚀"
  },
  {
    "date": "2022-06-15",
    "description": "Developed first AI prototype.",
    "icon": "🛠️"
  },
  {
    "date": "2023-03-20",
    "description": "Founded the startup.",
    "icon": "🏢"
  }
]
```

## 5. Additional Features

### 5.1 About Me

- Located on a separate tab/page.
- Introduce Cai's background, entrepreneurial journey, and vision.
- Use visual interactive design to deepen user understanding.

### 5.2 Blog/Tutorials

- Share tutorials on using AI tools, productivity tips, and entrepreneurial experiences.
- Support Markdown format and code highlighting.
- Provide SEO metadata to enhance content visibility.

#### Implementation Details

- Use `next-mdx-remote` for rendering Markdown files.
- Store blog posts in `content/blog/` as `.mdx` files.

#### Example (Blog Post File Structure)

```
content/
  blog/
    how-to-use-ai-tools.mdx
    productivity-hacks.mdx
```

### 5.3 Learning Logs and Inspiration Records

- Regularly update blog with English learning, inspirations, and news.
- Categories: "AI Tool Learning", "Entrepreneurial Ideas", "English Learning".
- Allow users to filter content based on interests.

#### Tags

- Add dynamic tags to each post (e.g., "Technical Learning", "Market Observation").
- Helps users quickly find related content.

### 5.4 Product Page

- Introduce current applications or tools being developed.
- Users can pre-order or purchase applications.

#### Implementation Details

- Integrate with Stripe for secure payment processing.
- Ensure compliance with payment regulations.

### 5.5 Subscription Feature

- Users can subscribe via email for the latest updates.
- Receive notifications about new blog posts and project updates.

#### Subscription Options

- Allow users to choose topics of interest to subscribe to.
- Implement subscription form with email validation.

#### Implementation Details

- Use services like Mailchimp or SendGrid for email management.
- API route at `app/api/subscribe.ts` to handle subscription requests.

### 5.6 Social Media Links and Sharing

- Provide links to Cai's social media accounts (e.g., Twitter, LinkedIn).
- Add sharing buttons for articles and projects.
- Encourage users to share content on social platforms.

## 6. Design Requirements

### 6.1 Overall Style

- **Minimalist and Modern**: Emphasize a sleek and clean design.
- **Color Scheme**: Primarily black and white, with blue accents.
- **Typography**: Use clear and legible fonts.
- **Imagery**: High-quality images that align with the technology and innovation theme.

### 6.2 Animation Effects

- Implement smooth transitions for dynamic elements.
- Use animations for the home page title and project cards.
- Ensure animations are responsive and do not hinder performance.

### 6.3 Responsive Design

- Optimize for desktop, tablet, and mobile devices.
- Use responsive layouts and media queries.
- Ensure touch-friendly interactions on mobile devices.

## 7. Technical Stack

### 7.1 Front-end

- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **Shadcn/UI**: Component library for consistent UI elements.
- **Lucide Icons**: Icon library for intuitive visuals.
- **TypeScript**: Adds static typing for better developer experience.

### 7.2 Back-end

- Use Next.js API routes for serverless functions.
- Implement functionalities like subscription handling and content fetching.

### 7.3 Storage

- **Content Files**:
  - Roadmap and Timeline data in `content/roadmap.json` and `content/timeline.json`.
  - Blog posts in `content/blog/` directory as `.mdx` files.

### 7.4 Payment Integration

- **Stripe**: For handling payments on the product page.
- Ensure secure and PCI-compliant payment processing.

### 7.5 Deployment

- **Vercel**: For automated deployment and hosting.
- **GitHub**: For version control and collaboration.

## 8. File Structure

The project files are organized as follows:

```
caiyongji-com/
├── app/
│   ├── favicon.ico
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx                // Main layout component
│   ├── page.tsx                  // Home page
│   ├── about/
│   │   └── page.tsx              // About Me page
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx          // Dynamic blog post pages
│   ├── product/
│   │   └── page.tsx              // Product page
│   ├── api/
│   │   └── subscribe.ts          // API route for subscriptions
├── components/                   // Reusable components
│   ├── Navbar.tsx                // Navigation bar
│   ├── Footer.tsx                // Footer section
│   ├── DynamicTitle.tsx          // Home page dynamic title
│   ├── ProjectCard.tsx           // Component for project showcase
│   ├── RoadmapItem.tsx           // Component for roadmap items
│   ├── TimelineItem.tsx          // Component for timeline entries
├── content/                      // Content files
│   ├── roadmap.json              // Roadmap data
│   ├── timeline.json             // Timeline data
│   └── blog/                     // Blog posts in .mdx format
│       ├── post1.mdx
│       └── post2.mdx
├── lib/
│   └── utils.ts                  // Utility functions
├── public/
│   ├── images/
│   │   ├── avatar.jpg            // Personal avatar image
│   │   ├── project1.jpg          // Project images
│   │   └── icons/                // Icon images if needed
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 9. Documentation and Context

### 9.1 Dynamic Title Implementation

- **Purpose**: Create an engaging home page with a dynamic title that cycles through keywords.
- **Approach**:
  - Use React hooks (`useState`, `useEffect`) to manage state and timing.
  - Implement CSS transitions for smooth sliding effects.

#### Example (Conceptual Implementation)

```jsx
// components/DynamicTitle.tsx
const keywords = ['AI', 'Startup', 'Product'];
const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex(prevIndex => (prevIndex + 1) % keywords.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);

return (
  <h1>
    Hello, I'm Cai. I talk about{' '}
    <span className="text-blue-500 transition-all duration-500">
      {keywords[index]}
    </span>
  </h1>
);
```

### 9.2 Rendering Markdown Blog Posts

- **Purpose**: Allow content to be written in Markdown for ease of editing and readability.
- **Approach**:
  - Use `next-mdx-remote` to render `.mdx` files.
  - Fetch the Markdown content during build time.

#### Example (Conceptual Implementation)

```tsx
// app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote';

export default function BlogPost({ mdxSource }) {
  return (
    <article>
      <MDXRemote {...mdxSource} />
    </article>
  );
}

export async function getStaticPaths() {
  // Read filenames in content/blog/
}

export async function getStaticProps({ params }) {
  // Read the .mdx file based on params.slug
  // Use next-mdx-remote to serialize the content
}
```

### 9.3 Handling Subscriptions

- **Purpose**: Collect user emails for updates and newsletters.
- **Approach**:
  - Create an API route to handle POST requests with email data.
  - Integrate with an email service provider's API.

#### Example (Conceptual Implementation)

```tsx
// app/api/subscribe.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Validate email format
  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Integrate with email service provider
  await addToMailingList(email);

  return NextResponse.json({ message: 'Subscription successful' });
}
```

### 9.4 Content Organization

- **Roadmap and Timeline**:
  - Stored as JSON for easy editing and parsing.
  - Allows for dynamic rendering on the website.

- **Blog Content**:
  - Written in Markdown (`.mdx`) to support rich text and code snippets.
  - Facilitates collaboration and version control.

### 9.5 Example Responses

- **Subscription Success**:
  ```json
  {
    "message": "Subscription successful"
  }
  ```

- **Subscription Error**:
  ```json
  {
    "error": "Invalid email"
  }
  ```

## 10. Multi-language Support

- **Objective**: Cater to a global audience by providing content in multiple languages, primarily English and Chinese.
- **Implementation**:
  - Use internationalization libraries like `next-i18next`.
  - Organize translations in `public/locales/` directory.

#### File Structure

```
public/
  locales/
    en/
      common.json
    zh/
      common.json
```

- **Usage**:
  - Wrap components with translation hooks or higher-order components.
  - Provide a language switcher in the UI.

## 11. Developer Alignment Notes

- **Keep Components Reusable**: Create components that can be reused across different pages to reduce code duplication.
- **Minimize File Count**: Structure the project to use as few files as possible without sacrificing readability or maintainability.
- **Follow Coding Standards**: Use consistent naming conventions, code formatting, and commenting for clarity.
- **Documentation**: Include inline comments and documentation where necessary to explain complex logic.
- **Version Control**: Use GitHub for collaboration and maintain clean commit histories with clear messages.
- **Testing**: Implement basic testing to ensure components function as expected.

## 12. Summary

This PRD provides a comprehensive guide for developers to implement Cai's personal website efficiently. It includes detailed descriptions of features, implementation details, file structures, and examples to ensure clear alignment among the development team. By following this document, developers should have a clear understanding of the project requirements and the context needed for successful execution.

---

**Note to Developers**: All code snippets provided are conceptual and meant to illustrate the intended functionality. Actual implementation may vary based on the project's specific needs and best practices.