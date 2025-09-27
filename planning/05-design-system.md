# Design System - AI Science Portfolio

## 🎨 Visual Identity & Brand Guidelines

### Brand Personality
- **Professional**: Academic rigor with modern aesthetics
- **Innovative**: Cutting-edge design reflecting scientific advancement
- **Accessible**: Welcoming to diverse audiences and skill levels
- **Trustworthy**: Reliable source for scientific information
- **Engaging**: Interactive and visually compelling content

### Brand Values in Design
- **Clarity**: Clean, organized layouts that prioritize readability
- **Precision**: Attention to detail reflecting scientific accuracy
- **Innovation**: Modern design patterns and technologies
- **Inclusivity**: Accessible design for all users
- **Excellence**: High-quality visuals and user experience

## 🌈 Color Palette

### Primary Colors
```css
:root {
  /* Primary Brand Colors */
  --primary-50: #eff6ff;   /* Lightest blue */
  --primary-100: #dbeafe;  /* Very light blue */
  --primary-200: #bfdbfe;  /* Light blue */
  --primary-300: #93c5fd;  /* Medium light blue */
  --primary-400: #60a5fa;  /* Medium blue */
  --primary-500: #3b82f6;  /* Main brand blue */
  --primary-600: #2563eb;  /* Medium dark blue */
  --primary-700: #1d4ed8;  /* Dark blue */
  --primary-800: #1e40af;  /* Very dark blue */
  --primary-900: #1e3a8a;  /* Darkest blue */
  --primary-950: #172554;  /* Ultra dark blue */
}
```

### Secondary Colors (Scientific Accent)
```css
:root {
  /* Teal/Cyan for data visualization and accents */
  --secondary-50: #f0fdfa;
  --secondary-100: #ccfbf1;
  --secondary-200: #99f6e4;
  --secondary-300: #5eead4;
  --secondary-400: #2dd4bf;
  --secondary-500: #14b8a6;
  --secondary-600: #0d9488;
  --secondary-700: #0f766e;
  --secondary-800: #115e59;
  --secondary-900: #134e4a;
  --secondary-950: #042f2e;
}
```

### Neutral Colors (Grayscale)
```css
:root {
  /* Neutral grays for text and backgrounds */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  --neutral-950: #0a0a0a;
}
```

### Semantic Colors
```css
:root {
  /* Status and feedback colors */
  --success-500: #10b981;
  --warning-500: #f59e0b;
  --error-500: #ef4444;
  --info-500: #3b82f6;
}
```

### Dark Mode Palette
```css
[data-theme="dark"] {
  --background: var(--neutral-950);
  --foreground: var(--neutral-100);
  --card: var(--neutral-900);
  --card-foreground: var(--neutral-100);
  --popover: var(--neutral-900);
  --popover-foreground: var(--neutral-100);
  --muted: var(--neutral-800);
  --muted-foreground: var(--neutral-400);
  --accent: var(--neutral-800);
  --accent-foreground: var(--neutral-100);
  --border: var(--neutral-800);
}
```

## 📝 Typography System

### Font Families
```css
:root {
  /* Primary font for headings and UI */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* Monospace font for code */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 
               Consolas, Monaco, 'Courier New', monospace;
  
  /* Serif font for long-form reading */
  --font-serif: 'Crimson Text', Georgia, 'Times New Roman', serif;
}
```

### Type Scale
```css
:root {
  /* Font sizes following a modular scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  --text-7xl: 4.5rem;    /* 72px */
  --text-8xl: 6rem;      /* 96px */
  --text-9xl: 8rem;      /* 128px */
}
```

### Font Weights
```css
:root {
  --font-thin: 100;
  --font-extralight: 200;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### Line Heights
```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

## 📐 Spacing System

### Spacing Scale
```css
:root {
  /* Consistent spacing using rem units */
  --spacing-px: 1px;
  --spacing-0: 0;
  --spacing-0_5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;     /* 4px */
  --spacing-1_5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;      /* 8px */
  --spacing-2_5: 0.625rem;  /* 10px */
  --spacing-3: 0.75rem;     /* 12px */
  --spacing-3_5: 0.875rem;  /* 14px */
  --spacing-4: 1rem;        /* 16px */
  --spacing-5: 1.25rem;     /* 20px */
  --spacing-6: 1.5rem;      /* 24px */
  --spacing-8: 2rem;        /* 32px */
  --spacing-10: 2.5rem;     /* 40px */
  --spacing-12: 3rem;       /* 48px */
  --spacing-16: 4rem;       /* 64px */
  --spacing-20: 5rem;       /* 80px */
  --spacing-24: 6rem;       /* 96px */
  --spacing-32: 8rem;       /* 128px */
  --spacing-40: 10rem;      /* 160px */
  --spacing-48: 12rem;      /* 192px */
  --spacing-56: 14rem;      /* 224px */
  --spacing-64: 16rem;      /* 256px */
}
```

### Container Sizes
```css
:root {
  --container-sm: 640px;    /* Small screens */
  --container-md: 768px;    /* Medium screens */
  --container-lg: 1024px;   /* Large screens */
  --container-xl: 1280px;   /* Extra large screens */
  --container-2xl: 1536px;  /* 2X extra large screens */
}
```

## 🧩 Component Design Tokens

### Border Radius
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius: 0.25rem;        /* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-3xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;    /* Fully rounded */
}
```

### Shadows
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Transitions & Animations
```css
:root {
  --transition-none: none;
  --transition-all: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-colors: color, background-color, border-color, 
                       text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-opacity: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-shadow: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-transform: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🎭 Component Specifications

### Button Variants
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
}
```

#### Button Styles
```css
/* Primary Button */
.btn-primary {
  background-color: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: var(--transition-colors);
}

.btn-primary:hover {
  background-color: var(--primary-700);
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--secondary-600);
  color: white;
  border: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: var(--transition-colors);
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  color: var(--primary-600);
  border: 1px solid var(--primary-600);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: var(--transition-all);
}

.btn-outline:hover {
  background-color: var(--primary-600);
  color: white;
}
```

### Card Components
```css
.card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition-shadow);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--border);
}

.card-content {
  padding: var(--spacing-6);
}

.card-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--border);
  background-color: var(--muted);
}
```

### Form Elements
```css
.input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--background);
  color: var(--foreground);
  font-size: var(--text-sm);
  transition: var(--transition-colors);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 2px var(--primary-500) / 0.2;
}

.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--foreground);
  margin-bottom: var(--spacing-2);
}
```

## 📱 Responsive Design System

### Breakpoint Strategy
```css
/* Mobile First Approach */
@media (min-width: 640px) {  /* sm */
  /* Small tablets and large phones */
}

@media (min-width: 768px) {  /* md */
  /* Tablets */
}

@media (min-width: 1024px) { /* lg */
  /* Laptops and small desktops */
}

@media (min-width: 1280px) { /* xl */
  /* Large desktops */
}

@media (min-width: 1536px) { /* 2xl */
  /* Extra large screens */
}
```

### Grid System
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 🎨 Scientific Visualization Guidelines

### Color Palettes for Data Visualization
```javascript
// Categorical color palette (colorblind-friendly)
const categoricalColors = [
  '#3b82f6', // Primary blue
  '#14b8a6', // Teal
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
];

// Sequential color palette for continuous data
const sequentialColors = {
  blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'],
  teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'],
};

// Diverging color palette for data with meaningful center
const divergingColors = ['#1e40af', '#3b82f6', '#93c5fd', '#f3f4f6', '#fca5a5', '#ef4444', '#b91c1c'];
```

### Chart Styling Guidelines
```css
.chart-container {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  margin: var(--spacing-6) 0;
}

.chart-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--foreground);
  margin-bottom: var(--spacing-4);
}

.chart-axis {
  color: var(--muted-foreground);
  font-size: var(--text-sm);
}

.chart-grid {
  stroke: var(--border);
  stroke-width: 1;
  stroke-dasharray: 2,2;
}
```

## 🧪 Interactive Component Guidelines

### Code Block Styling
```css
.code-block {
  background-color: var(--neutral-900);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--spacing-6) 0;
}

.code-header {
  background-color: var(--neutral-800);
  padding: var(--spacing-3) var(--spacing-4);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-content {
  padding: var(--spacing-4);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.code-line-numbers {
  color: var(--neutral-400);
  margin-right: var(--spacing-4);
  user-select: none;
}
```

### Mathematical Formula Styling
```css
.math-block {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--spacing-4);
  margin: var(--spacing-4) 0;
  text-align: center;
  overflow-x: auto;
}

.math-inline {
  background-color: var(--muted);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-family: 'KaTeX_Main', serif;
}
```

## ♿ Accessibility Guidelines

### Color Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

### Focus Indicators
```css
.focus-ring {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Screen Reader Support
- All interactive elements have proper ARIA labels
- Images include descriptive alt text
- Form elements have associated labels
- Complex UI patterns use ARIA attributes appropriately

## 🎬 Animation & Motion Guidelines

### Easing Functions
```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Animation Durations
```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

**Design Tools**:
- **Figma**: Design mockups and component library
- **Tailwind CSS**: Utility-first styling framework
- **Shadcn/ui**: High-quality React component library
- **Lucide**: Consistent icon system
- **Framer Motion**: Animation library for React