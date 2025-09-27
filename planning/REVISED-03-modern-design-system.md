# 🎨 MODERN DESIGN SYSTEM
## Cutting-Edge Academic Portfolio Aesthetic

## 🎯 DESIGN PHILOSOPHY

### Core Principles
1. **Academic Elegance**: Professional yet approachable
2. **Performance-First**: Beautiful but blazing fast
3. **Content-Focused**: Design serves the content, not the other way around
4. **Progressive Enhancement**: Works beautifully at every level of capability
5. **Inclusive Design**: Accessible to all users and devices

### Visual Hierarchy
```
Information Architecture:
Content > Navigation > Branding > Decoration
```

---

## 🌈 COLOR SYSTEM

### Primary Palette - "Academic Excellence"
```css
:root {
  /* Primary Academic Blue */
  --color-primary-50: #eff6ff;   /* Lightest - backgrounds */
  --color-primary-100: #dbeafe;  /* Light - hover states */
  --color-primary-200: #bfdbfe;  /* Medium light - borders */
  --color-primary-300: #93c5fd;  /* Medium - secondary elements */
  --color-primary-400: #60a5fa;  /* Medium dark - interactive */
  --color-primary-500: #3b82f6;  /* Base - primary actions */
  --color-primary-600: #2563eb;  /* Dark - focus states */
  --color-primary-700: #1d4ed8;  /* Darker - pressed states */
  --color-primary-800: #1e40af;  /* Very dark - headings */
  --color-primary-900: #1e3a8a;  /* Darkest - text */
  --color-primary-950: #172554;  /* Ultra dark - emphasis */
}
```

### Secondary Palette - "Scientific Precision"
```css
:root {
  /* Emerald for success/completion */
  --color-secondary-50: #ecfdf5;
  --color-secondary-500: #10b981;
  --color-secondary-600: #059669;
  --color-secondary-700: #047857;

  /* Amber for highlights/warnings */
  --color-accent-50: #fffbeb;
  --color-accent-500: #f59e0b;
  --color-accent-600: #d97706;

  /* Rose for errors/important */
  --color-danger-50: #fef2f2;
  --color-danger-500: #ef4444;
  --color-danger-600: #dc2626;
}
```

### Neutral System - "Sophisticated Grays"
```css
:root {
  /* Warm grays for better readability */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #fafaf9;
  --color-neutral-100: #f5f5f4;
  --color-neutral-200: #e7e5e4;
  --color-neutral-300: #d6d3d1;
  --color-neutral-400: #a8a29e;
  --color-neutral-500: #78716c;
  --color-neutral-600: #57534e;
  --color-neutral-700: #44403c;
  --color-neutral-800: #292524;
  --color-neutral-900: #1c1917;
  --color-neutral-950: #0c0a09;
}
```

### Semantic Colors
```css
:root {
  --color-success: var(--color-secondary-500);
  --color-warning: var(--color-accent-500);
  --color-error: var(--color-danger-500);
  --color-info: var(--color-primary-500);
}
```

### Dark Mode Palette
```css
[data-theme="dark"] {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-100);
  --muted: var(--color-neutral-800);
  --muted-foreground: var(--color-neutral-400);
  --border: var(--color-neutral-800);
  --card: var(--color-neutral-900);
  --card-foreground: var(--color-neutral-100);
}
```

---

## 📝 TYPOGRAPHY SYSTEM

### Font Stack - "Academic Readability"
```css
:root {
  /* Primary font for UI and headings */
  --font-sans: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 
               'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* Secondary font for body text */
  --font-serif: 'Crimson Pro Variable', 'Crimson Pro', Georgia, 
                'Times New Roman', serif;
  
  /* Monospace for code */
  --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', 'Fira Code', 
               'Cascadia Code', Consolas, Monaco, 'Courier New', monospace;
  
  /* Mathematical expressions */
  --font-math: 'KaTeX_Main', 'Latin Modern Math', 'STIX Two Math', 
               'Times New Roman', serif;
}
```

### Type Scale - "Harmonious Proportions"
```css
:root {
  /* Major Third scale (1.25) for better hierarchy */
  --text-xs: 0.75rem;      /* 12px - captions, fine print */
  --text-sm: 0.875rem;     /* 14px - small text, metadata */
  --text-base: 1rem;       /* 16px - body text */
  --text-lg: 1.125rem;     /* 18px - large body, lead */
  --text-xl: 1.25rem;      /* 20px - small headings */
  --text-2xl: 1.5rem;      /* 24px - section headers */
  --text-3xl: 1.875rem;    /* 30px - page headers */
  --text-4xl: 2.25rem;     /* 36px - large headers */
  --text-5xl: 3rem;        /* 48px - hero headers */
  --text-6xl: 3.75rem;     /* 60px - display text */
}
```

### Font Weights - "Academic Emphasis"
```css
:root {
  --font-light: 300;       /* Light emphasis */
  --font-normal: 400;      /* Body text */
  --font-medium: 500;      /* UI elements */
  --font-semibold: 600;    /* Subheadings */
  --font-bold: 700;        /* Headings */
  --font-extrabold: 800;   /* Strong emphasis */
}
```

### Line Heights - "Optimal Readability"
```css
:root {
  --leading-none: 1;        /* Tight headings */
  --leading-tight: 1.25;    /* Headings */
  --leading-snug: 1.375;    /* UI text */
  --leading-normal: 1.5;    /* Body text */
  --leading-relaxed: 1.625; /* Long-form content */
  --leading-loose: 2;       /* Poetry, emphasis */
}
```

### Typography Classes
```css
/* Academic article typography */
.prose {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-700);
  max-width: 70ch;
}

.prose h1 {
  font-family: var(--font-sans);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-neutral-900);
  margin-top: 0;
  margin-bottom: 1rem;
}

.prose h2 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--color-neutral-800);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Code typography */
.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-neutral-100);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-neutral-200);
}

.prose pre {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}
```

---

## 📐 SPACING SYSTEM

### Spatial Scale - "Consistent Rhythm"
```css
:root {
  /* Base spacing unit: 0.25rem (4px) */
  --space-px: 1px;
  --space-0: 0;
  --space-0_5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1_5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2_5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-3_5: 0.875rem;   /* 14px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-8: 2rem;         /* 32px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  --space-32: 8rem;        /* 128px */
}
```

### Container System - "Content-Focused Widths"
```css
:root {
  --container-xs: 20rem;     /* 320px - mobile */
  --container-sm: 24rem;     /* 384px - mobile landscape */
  --container-md: 28rem;     /* 448px - tablet */
  --container-lg: 32rem;     /* 512px - tablet landscape */
  --container-xl: 36rem;     /* 576px - small desktop */
  --container-2xl: 42rem;    /* 672px - reading width */
  --container-3xl: 48rem;    /* 768px - content width */
  --container-4xl: 56rem;    /* 896px - wide content */
  --container-5xl: 64rem;    /* 1024px - max width */
  --container-6xl: 72rem;    /* 1152px - ultra wide */
  --container-7xl: 80rem;    /* 1280px - full width */
}
```

---

## 🎨 COMPONENT DESIGN TOKENS

### Border Radius - "Modern Softness"
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;     /* 2px - subtle */
  --radius: 0.25rem;         /* 4px - default */
  --radius-md: 0.375rem;     /* 6px - cards */
  --radius-lg: 0.5rem;       /* 8px - prominent */
  --radius-xl: 0.75rem;      /* 12px - hero elements */
  --radius-2xl: 1rem;        /* 16px - large cards */
  --radius-3xl: 1.5rem;      /* 24px - very prominent */
  --radius-full: 9999px;     /* Fully rounded */
}
```

### Shadows - "Subtle Depth"
```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* Colored shadows for interactive elements */
  --shadow-primary: 0 10px 15px -3px rgb(59 130 246 / 0.1), 
                    0 4px 6px -4px rgb(59 130 246 / 0.1);
  --shadow-secondary: 0 10px 15px -3px rgb(16 185 129 / 0.1), 
                      0 4px 6px -4px rgb(16 185 129 / 0.1);
}
```

### Transitions - "Smooth Interactions"
```css
:root {
  --transition-all: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-colors: color, background-color, border-color, 
                       text-decoration-color, fill, stroke 
                       150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-opacity: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-shadow: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-transform: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom easing functions */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 🧩 COMPONENT SPECIFICATIONS

### Button System
```css
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: var(--font-medium);
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition-all);
  border-radius: var(--radius);
  
  /* Focus styles */
  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Button variants */
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
  
  &:hover {
    background: var(--color-primary-600);
    border-color: var(--color-primary-600);
    box-shadow: var(--shadow-primary);
  }
}

.btn-secondary {
  background: white;
  color: var(--color-primary-600);
  border-color: var(--color-primary-200);
  
  &:hover {
    background: var(--color-primary-50);
    border-color: var(--color-primary-300);
  }
}

.btn-ghost {
  background: transparent;
  color: var(--color-neutral-600);
  
  &:hover {
    background: var(--color-neutral-100);
    color: var(--color-neutral-900);
  }
}

/* Button sizes */
.btn-sm {
  padding: var(--space-1_5) var(--space-3);
  font-size: var(--text-sm);
  min-height: 2rem;
}

.btn-md {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
  min-height: 2.5rem;
}

.btn-lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-lg);
  min-height: 3rem;
}
```

### Card System
```css
.card {
  background: var(--color-neutral-0);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-all);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-neutral-200);
}

.card-content {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  background: var(--color-neutral-50);
  border-top: 1px solid var(--color-neutral-200);
}

/* Card variants */
.card-elevated {
  box-shadow: var(--shadow-lg);
  border: none;
}

.card-interactive {
  cursor: pointer;
  
  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-2px);
  }
}
```

### Form Elements
```css
.input {
  width: 100%;
  padding: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  background: var(--color-neutral-0);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius);
  transition: var(--transition-colors);
  
  &::placeholder {
    color: var(--color-neutral-400);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 1px var(--color-primary-500);
  }
  
  &:invalid {
    border-color: var(--color-danger-500);
  }
}

.label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-neutral-700);
  margin-bottom: var(--space-2);
}
```

---

## 🎭 ACADEMIC-SPECIFIC COMPONENTS

### Code Block Styling
```css
.code-block {
  background: var(--color-neutral-900);
  border: 1px solid var(--color-neutral-800);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-6) 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: var(--color-neutral-800);
  border-bottom: 1px solid var(--color-neutral-700);
  
  .code-lang {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-neutral-300);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .code-actions {
    display: flex;
    gap: var(--space-2);
  }
}

.code-content {
  padding: var(--space-4);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-neutral-100);
  
  /* Line numbers */
  .line-numbers {
    color: var(--color-neutral-500);
    margin-right: var(--space-4);
    user-select: none;
  }
}
```

### Mathematical Formula Styling
```css
.math-display {
  background: var(--color-neutral-50);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius);
  padding: var(--space-4);
  margin: var(--space-4) 0;
  text-align: center;
  overflow-x: auto;
  
  .katex-display {
    margin: 0;
  }
}

.math-inline {
  background: var(--color-neutral-100);
  padding: var(--space-1) var(--space-1_5);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-neutral-200);
}
```

### Publication Styling
```css
.publication-card {
  background: var(--color-neutral-0);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  transition: var(--transition-all);
  
  &:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-200);
  }
  
  .pub-title {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-900);
    margin-bottom: var(--space-2);
  }
  
  .pub-authors {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--color-neutral-600);
    margin-bottom: var(--space-3);
  }
  
  .pub-venue {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--color-neutral-700);
    margin-bottom: var(--space-3);
  }
  
  .pub-metrics {
    display: flex;
    gap: var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-neutral-500);
  }
}
```

---

## 📱 RESPONSIVE DESIGN SYSTEM

### Breakpoint Strategy
```css
/* Mobile-first breakpoints */
@custom-media --mobile (width < 48rem);        /* < 768px */
@custom-media --tablet (width >= 48rem);       /* 768px+ */
@custom-media --desktop (width >= 64rem);      /* 1024px+ */
@custom-media --wide (width >= 80rem);         /* 1280px+ */
@custom-media --ultra-wide (width >= 96rem);   /* 1536px+ */
```

### Responsive Typography
```css
/* Fluid typography using clamp() */
:root {
  --text-fluid-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --text-fluid-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --text-fluid-lg: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --text-fluid-xl: clamp(1.56rem, 1.06vw + 1.31rem, 2.11rem);
  --text-fluid-2xl: clamp(1.95rem, 1.74vw + 1.56rem, 2.81rem);
  --text-fluid-3xl: clamp(2.44rem, 2.79vw + 1.85rem, 3.75rem);
}

/* Apply fluid typography to headings */
h1 { font-size: var(--text-fluid-3xl); }
h2 { font-size: var(--text-fluid-2xl); }
h3 { font-size: var(--text-fluid-xl); }
h4 { font-size: var(--text-fluid-lg); }
```

### Container Queries (Future-Ready)
```css
.component {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .component {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## ♿ ACCESSIBILITY SPECIFICATIONS

### Focus Management
```css
/* Focus-visible for better keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -100px;
  left: var(--space-4);
  background: var(--color-primary-600);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: var(--font-medium);
  z-index: 1000;
  
  &:focus {
    top: var(--space-4);
  }
}
```

### Screen Reader Support
```css
/* Visually hidden but available to screen readers */
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
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  :root {
    --color-neutral-300: var(--color-neutral-600);
    --color-neutral-400: var(--color-neutral-700);
  }
  
  .btn-ghost {
    border: 1px solid currentColor;
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🎨 IMPLEMENTATION GUIDE

### CSS Custom Properties Setup
```css
/* Load design tokens first */
@import 'tokens/colors.css';
@import 'tokens/typography.css';
@import 'tokens/spacing.css';
@import 'tokens/shadows.css';

/* Then load component styles */
@import 'components/buttons.css';
@import 'components/cards.css';
@import 'components/forms.css';
@import 'components/academic.css';
```

### Tailwind CSS Integration
```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(from var(--color-primary-50) r g b)',
          // ... all primary colors
        },
        neutral: {
          50: 'rgb(from var(--color-neutral-50) r g b)',
          // ... all neutral colors
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)']
      },
      spacing: {
        '0.5': 'var(--space-0_5)',
        '1.5': 'var(--space-1_5)',
        // ... all spacing values
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}
```

This design system provides a comprehensive foundation for building a modern, accessible, and performant academic portfolio while maintaining flexibility for future enhancements.