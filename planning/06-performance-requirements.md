# Performance Requirements - AI Science Portfolio

## 🎯 Performance Targets & Metrics

### Core Web Vitals Requirements
| Metric | Target | Acceptable | Current Baseline |
|--------|--------|------------|------------------|
| **Largest Contentful Paint (LCP)** | < 2.5s | < 4.0s | TBD |
| **First Input Delay (FID)** | < 100ms | < 300ms | TBD |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.25 | TBD |
| **Time to First Byte (TTFB)** | < 600ms | < 1.3s | TBD |
| **First Contentful Paint (FCP)** | < 1.8s | < 3.0s | TBD |

### Additional Performance Metrics
| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| **Time to Interactive (TTI)** | < 5.0s | Lighthouse audit |
| **Speed Index** | < 3.4s | Lighthouse audit |
| **Total Blocking Time (TBT)** | < 200ms | Lighthouse audit |
| **Bundle Size (Initial)** | < 500KB | Webpack Bundle Analyzer |
| **Bundle Size (Total)** | < 2MB | Webpack Bundle Analyzer |
| **Image Optimization** | 90%+ optimized | Custom metrics |

### Lighthouse Performance Scores
| Page Type | Target Score | Minimum Acceptable |
|-----------|-------------|-------------------|
| **Home Page** | 95+ | 90+ |
| **Blog List** | 90+ | 85+ |
| **Blog Post** | 85+ | 80+ |
| **Project Page** | 90+ | 85+ |
| **Interactive Content** | 80+ | 75+ |

## 🚀 Optimization Strategies

### 1. Code Splitting & Bundle Optimization

#### Route-Based Code Splitting
```typescript
// Automatic with Next.js App Router
// Each page is automatically code-split

// Manual dynamic imports for heavy components
const CodeExecutor = dynamic(() => import('@/components/interactive/CodeExecutor'), {
  loading: () => <CodeExecutorSkeleton />,
  ssr: false // Client-side only for heavy interactive components
});

const DataVisualization = dynamic(() => import('@/components/charts/DataVisualization'), {
  loading: () => <ChartSkeleton />,
});
```

#### Component-Level Code Splitting
```typescript
// Split heavy libraries into separate chunks
const MathRenderer = dynamic(() => import('react-katex'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-8 rounded" />,
});

const JupyterViewer = dynamic(() => import('@/components/jupyter/JupyterViewer'), {
  loading: () => <JupyterSkeleton />,
  ssr: false,
});
```

#### Bundle Analysis Configuration
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          enforce: true,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    };
    return config;
  },
});
```

### 2. Image Optimization Strategy

#### Next.js Image Component Configuration
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
}: OptimizedImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
    />
  );
};
```

#### Image Processing Pipeline
```typescript
// lib/imageOptimization.ts
export const imageFormats = {
  webp: 'image/webp',
  avif: 'image/avif',
  jpeg: 'image/jpeg',
  png: 'image/png',
};

export const responsiveSizes = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  large: 1920,
};

export function generateSrcSet(src: string, sizes = responsiveSizes) {
  return Object.entries(sizes)
    .map(([key, width]) => `${src}?w=${width} ${width}w`)
    .join(', ');
}
```

### 3. Caching Strategy

#### Next.js Caching Configuration
```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.unsplash.com', 'github.com'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### ISR (Incremental Static Regeneration) Configuration
```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

// For dynamic content with ISR
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

#### Client-Side Caching with SWR
```typescript
// lib/swr.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGitHubStats(username: string) {
  const { data, error, isLoading } = useSWR(
    `/api/github/${username}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1000 * 60 * 10, // 10 minutes
    }
  );

  return { stats: data, isLoading, isError: error };
}
```

### 4. Font Optimization

#### Google Fonts Optimization
```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono, Crimson_Text } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const crimsonText = Crimson_Text({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${crimsonText.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### 5. JavaScript Optimization

#### Tree Shaking Configuration
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns', 'recharts'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

#### Selective Imports
```typescript
// Instead of importing entire libraries
import { format } from 'date-fns'; // ✅ Good
import { debounce } from 'lodash'; // ✅ Good

// Avoid default imports of large libraries
import * as _ from 'lodash'; // ❌ Bad
import moment from 'moment'; // ❌ Bad (use date-fns instead)
```

## 📊 Performance Monitoring

### 1. Real User Monitoring (RUM)

#### Vercel Analytics Integration
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### Custom Performance Metrics
```typescript
// lib/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name,
      value: Math.round(end - start),
    });
  }
}

export function reportWebVitals(metric: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

### 2. Automated Performance Testing

#### Lighthouse CI Configuration
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Audit URLs using Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

```json
{
  "ci": {
    "collect": {
      "url": [
        "https://your-site.com",
        "https://your-site.com/blog",
        "https://your-site.com/projects"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.8}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 3. Performance Budget

#### Bundle Size Limits
```json
{
  "bundlewatch": {
    "files": [
      {
        "path": ".next/static/js/*.js",
        "maxSize": "500kb"
      },
      {
        "path": ".next/static/css/*.css",
        "maxSize": "50kb"
      }
    ],
    "ci": {
      "trackBranches": ["main", "develop"]
    }
  }
}
```

## ⚡ Interactive Content Performance

### 1. Code Execution Optimization

#### Pyodide Worker Implementation
```typescript
// workers/pyodide-worker.ts
import { loadPyodide } from 'pyodide';

let pyodide: any = null;

self.onmessage = async (event) => {
  const { id, code, packages } = event.data;
  
  try {
    if (!pyodide) {
      pyodide = await loadPyodide();
      await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib']);
    }
    
    // Install additional packages if needed
    if (packages && packages.length > 0) {
      await pyodide.loadPackage(packages);
    }
    
    const result = pyodide.runPython(code);
    
    self.postMessage({ id, result, error: null });
  } catch (error) {
    self.postMessage({ id, result: null, error: error.message });
  }
};
```

#### Virtual Scrolling for Large Datasets
```typescript
// components/VirtualizedList.tsx
import { FixedSizeList as List } from 'react-window';

interface VirtualizedListProps {
  items: any[];
  height: number;
  itemHeight: number;
  renderItem: (props: any) => React.ReactNode;
}

export const VirtualizedList = ({ 
  items, 
  height, 
  itemHeight, 
  renderItem 
}: VirtualizedListProps) => {
  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      itemData={items}
    >
      {renderItem}
    </List>
  );
};
```

### 2. Chart Performance Optimization

#### Canvas-Based Rendering for Large Datasets
```typescript
// components/PerformantChart.tsx
import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

interface PerformantChartProps {
  data: any[];
  threshold?: number;
}

export const PerformantChart = ({ 
  data, 
  threshold = 1000 
}: PerformantChartProps) => {
  const optimizedData = useMemo(() => {
    if (data.length <= threshold) return data;
    
    // Sample data for better performance
    const step = Math.ceil(data.length / threshold);
    return data.filter((_, index) => index % step === 0);
  }, [data, threshold]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={optimizedData}>
        <XAxis dataKey="x" />
        <YAxis />
        <Line type="monotone" dataKey="y" stroke="#3b82f6" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
```

## 🔧 Development Performance Tools

### 1. Build-Time Optimization

#### Webpack Bundle Analysis
```bash
# Package.json scripts
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "dev:turbo": "next dev --turbo",
    "build:profile": "next build --profile",
    "build:debug": "next build --debug"
  }
}
```

### 2. Development Server Optimization

#### Next.js Development Configuration
```javascript
// next.config.js (development)
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  swcMinify: true,
  experimental: {
    swcTraceProfiling: isDev,
    cpus: Math.max(1, require('os').cpus().length - 1),
  },
  compiler: {
    // Remove console logs in production
    removeConsole: !isDev,
  },
};
```

## 📈 Performance Regression Prevention

### 1. Continuous Integration Checks

#### Performance Budget GitHub Action
```yaml
# .github/workflows/performance.yml
name: Performance Budget
on:
  pull_request:
    branches: [main]

jobs:
  performance-budget:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run bundle analysis
        run: npm run analyze
      
      - name: Check bundle size
        run: npx bundlewatch
```

### 2. Performance Monitoring Alerts

#### Vercel Edge Config for Performance Thresholds
```typescript
// lib/performance-alerts.ts
export const performanceThresholds = {
  lcp: 2500, // ms
  fid: 100,  // ms
  cls: 0.1,  // score
  ttfb: 600, // ms
};

export function checkPerformanceThresholds(metrics: WebVitalsMetric[]) {
  const alerts = [];
  
  metrics.forEach((metric) => {
    const threshold = performanceThresholds[metric.name.toLowerCase()];
    if (threshold && metric.value > threshold) {
      alerts.push({
        metric: metric.name,
        value: metric.value,
        threshold,
        severity: metric.value > threshold * 1.5 ? 'critical' : 'warning',
      });
    }
  });
  
  return alerts;
}
```

---

**Performance Testing Stack**:
- **Lighthouse CI**: Automated performance auditing
- **Vercel Analytics**: Real user monitoring
- **Bundle Analyzer**: Bundle size analysis
- **React Profiler**: Component performance analysis
- **Web Vitals**: Core performance metrics tracking