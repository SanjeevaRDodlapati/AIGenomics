# Practical Implementation Guide: Aleksa-Style Blog Setup

## Quick Start: Essential Tools and Workflow

### 1. Immediate Setup (Next 30 minutes)

**Typography Implementation**:
```bash
# Install Google Fonts
npm install @next/font google-fonts
```

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono, Source_Serif_Pro } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const sourceSerif = Source_Serif_Pro({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-serif' 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${sourceSerif.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**Tailwind Configuration**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-mono)', 'Monaco', 'monospace'],
        'serif': ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        'aleksa': {
          'text': '#1a1a1a',
          'accent': '#3b82f6',
          'secondary': '#6b7280',
          'background': '#ffffff',
          'code-bg': '#1a1a1a',
        }
      },
      typography: {
        'aleksa': {
          css: {
            '--tw-prose-body': '#1a1a1a',
            '--tw-prose-headings': '#1a1a1a',
            '--tw-prose-links': '#3b82f6',
            '--tw-prose-code': '#e5e5e5',
            '--tw-prose-pre-code': '#e5e5e5',
            '--tw-prose-pre-bg': '#1a1a1a',
            'code': {
              backgroundColor: '#1a1a1a',
              color: '#e5e5e5',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'pre': {
              backgroundColor: '#1a1a1a',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            },
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
            },
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### 2. Excalidraw Workflow Setup (Next 15 minutes)

**Option 1: Web-based (Recommended for beginners)**
- Go to [excalidraw.com](https://excalidraw.com)
- Create diagrams directly in browser
- Export as SVG for best quality

**Option 2: VS Code Extension (For developers)**
```bash
# Install Excalidraw extension in VS Code
# Search "Excalidraw" by Excalidraw Inc.
```

**Option 3: Desktop App**
```bash
# Download from GitHub releases
# https://github.com/excalidraw/excalidraw/releases
```

**Excalidraw Template Setup**:
Create a standard template with Aleksa's color scheme:
- Background: Transparent
- Stroke Color: #1a1a1a (dark gray)
- Stroke Width: 2px
- Font Size: 16px minimum
- Accent Color: #3b82f6 (blue)

### 3. Code Block Component (Next 45 minutes)

**Install Syntax Highlighting**:
```bash
npm install react-syntax-highlighter
npm install @types/react-syntax-highlighter
```

**Enhanced Code Block Component**:
```typescript
// components/blog/CodeBlock.tsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  copyable?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  showLineNumbers = false,
  highlightLines = [],
  copyable = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      backgroundColor: '#1a1a1a',
      fontFamily: 'var(--font-mono)',
      fontSize: '14px',
      lineHeight: '1.6',
      borderRadius: '8px',
    },
  };

  return (
    <div className="relative my-6 rounded-lg border border-gray-200 overflow-hidden">
      {filename && (
        <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b">
          {filename}
        </div>
      )}
      
      <div className="relative">
        {copyable && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </button>
        )}
        
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={highlightLines.length > 0}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlightLines.includes(lineNumber) 
                ? 'rgba(59, 130, 246, 0.1)' 
                : 'transparent',
            },
          })}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
```

### 4. Diagram Component (Next 30 minutes)

**Diagram Display Component**:
```typescript
// components/blog/DiagramImage.tsx
import React from 'react';
import Image from 'next/image';

interface DiagramImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  maxWidth?: string;
  border?: boolean;
}

export const DiagramImage: React.FC<DiagramImageProps> = ({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
  maxWidth = "100%",
  border = true,
}) => (
  <figure className="my-8 text-center">
    <div className="inline-block">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`mx-auto rounded-lg ${border ? 'border border-gray-200' : ''}`}
        style={{ maxWidth }}
        quality={95}
        priority={false}
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-sm text-gray-600 italic font-serif max-w-2xl mx-auto">
        {caption}
      </figcaption>
    )}
  </figure>
);
```

### 5. Blog Layout Component (Next 30 minutes)

**Main Blog Layout**:
```typescript
// components/blog/BlogLayout.tsx
import React from 'react';
import { TableOfContents } from './TableOfContents';
import { BlogHeader } from './BlogHeader';

interface BlogLayoutProps {
  title: string;
  subtitle?: string;
  date: string;
  readingTime: number;
  children: React.ReactNode;
  tableOfContents?: TOCItem[];
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  title,
  subtitle,
  date,
  readingTime,
  children,
  tableOfContents = [],
}) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-8 xl:col-span-9">
            <article className="prose prose-aleksa prose-lg max-w-none">
              <BlogHeader 
                title={title}
                subtitle={subtitle}
                date={date}
                readingTime={readingTime}
              />
              
              <div className="mt-8">
                {children}
              </div>
            </article>
          </main>
          
          {/* Table of Contents Sidebar */}
          {tableOfContents.length > 0 && (
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8">
                <TableOfContents items={tableOfContents} />
              </div>
            </aside>
          )}
          
        </div>
      </div>
    </div>
  );
};
```

### 6. Content Creation Workflow

**Step-by-Step Blog Post Creation**:

1. **Content Planning** (10 minutes):
   ```markdown
   # Blog Post Title
   ## Outline
   - [ ] Introduction with hook
   - [ ] Main concepts (3-5 sections)
   - [ ] Code examples with explanations
   - [ ] Visual diagrams for complex ideas
   - [ ] Conclusion with key takeaways
   
   ## Diagram Requirements
   - [ ] System architecture overview
   - [ ] Data flow diagram
   - [ ] Algorithm visualization
   ```

2. **Draft Writing** (30-60 minutes):
   - Write in Markdown with placeholder diagrams
   - Use clear, concise language
   - Include code examples inline
   - Mark diagram locations: `[DIAGRAM: Description of what to show]`

3. **Diagram Creation** (15-30 minutes per diagram):
   - Open Excalidraw
   - Use consistent color scheme (#1a1a1a, #3b82f6)
   - Keep it simple but informative
   - Export as SVG, save in `/public/images/diagrams/`

4. **Integration** (15 minutes):
   - Replace diagram placeholders with `<DiagramImage>` components
   - Add proper alt text and captions
   - Test responsive behavior
   - Verify all code blocks render correctly

### 7. Example Blog Post Structure

**Template File**: `/content/blog/example-post.mdx`
```markdown
---
title: "Understanding Neural Network Architectures"
subtitle: "From basic perceptrons to transformer models"
date: "2024-01-15"
readingTime: 12
author: "Your Name"
tags: ["machine-learning", "neural-networks", "deep-learning"]
---

import { DiagramImage } from '@/components/blog/DiagramImage';
import { CodeBlock } from '@/components/blog/CodeBlock';

# Understanding Neural Network Architectures

## From basic perceptrons to transformer models

*January 15, 2024*

In this post, I'll walk you through the evolution of neural network architectures, explaining the key concepts that make each approach unique and powerful.

## The Foundation: Perceptron

The journey begins with the simple perceptron, the building block of all neural networks.

<DiagramImage
  src="/images/diagrams/perceptron-architecture.svg"
  alt="Simple perceptron architecture showing inputs, weights, and activation function"
  caption="Basic perceptron structure with weighted inputs and activation function"
/>

Here's how we can implement a basic perceptron:

<CodeBlock
  language="python"
  filename="perceptron.py"
  code={`
import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        
    def fit(self, X, y):
        # Initialize weights
        self.weights = np.zeros(1 + X.shape[1])
        
        for _ in range(self.n_iterations):
            for xi, target in zip(X, y):
                update = self.learning_rate * (target - self.predict(xi))
                self.weights[1:] += update * xi
                self.weights[0] += update
                
    def predict(self, X):
        return np.where(self.net_input(X) >= 0.0, 1, -1)
        
    def net_input(self, X):
        return np.dot(X, self.weights[1:]) + self.weights[0]
  `}
/>

This implementation shows the core learning algorithm...

[Continue with more sections, diagrams, and code examples]
```

### 8. Performance Optimization

**Image Optimization Checklist**:
- ✅ Use SVG for diagrams (scalable, small file size)
- ✅ Optimize SVGs with SVGO
- ✅ Use Next.js Image component with proper sizing
- ✅ Implement lazy loading for below-fold images
- ✅ Add proper alt text for accessibility

**Code Loading Optimization**:
```typescript
// Lazy load syntax highlighter for better performance
import dynamic from 'next/dynamic';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  loading: () => <div className="animate-pulse bg-gray-100 h-32 rounded-lg" />,
});
```

### 9. Content Migration from Existing Notebooks

**Jupyter to Blog Conversion Script**:
```python
# scripts/convert_notebook.py
import nbformat
from nbconvert import MarkdownExporter
import re

def convert_notebook_to_blog(notebook_path, output_path):
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = nbformat.read(f, as_version=4)
    
    # Convert to markdown
    exporter = MarkdownExporter()
    (body, resources) = exporter.from_notebook_node(nb)
    
    # Process the markdown to match our blog format
    # Add diagram placeholders
    # Format code blocks properly
    # Extract metadata
    
    processed_content = process_markdown_for_blog(body)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(processed_content)

def process_markdown_for_blog(content):
    # Add proper frontmatter
    # Convert code blocks to our format
    # Add diagram placeholders where appropriate
    # Clean up formatting
    pass
```

### 10. Quality Checklist

**Before Publishing**:
- [ ] Typography renders correctly across devices
- [ ] All diagrams have proper alt text
- [ ] Code blocks are syntax highlighted
- [ ] Images are optimized and load quickly
- [ ] Mobile responsive design works
- [ ] Reading flow is logical and engaging
- [ ] All links work properly
- [ ] SEO metadata is complete

**Performance Targets**:
- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

This practical guide gives you everything needed to start creating Aleksa-style technical content immediately. The key is consistent application of the design principles while leveraging modern web technologies for enhanced interactivity and performance.