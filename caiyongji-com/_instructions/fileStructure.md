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
