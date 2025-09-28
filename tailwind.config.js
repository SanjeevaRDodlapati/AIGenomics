/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro Variable', 'Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1f2937',
            fontSize: '16px',
            lineHeight: '1.7',
            fontFamily: 'Inter, system-ui, sans-serif',
            'h1, h2, h3, h4, h5, h6': {
              color: '#111827',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            h1: {
              fontSize: '2.5rem',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1.5rem',
            },
            h2: {
              fontSize: '1.875rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.4',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              fontFamily: 'JetBrains Mono, Consolas, monospace',
              fontSize: '0.875rem',
              fontWeight: '400',
              backgroundColor: '#f3f4f6',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
            },
            pre: {
              fontFamily: 'JetBrains Mono, Consolas, monospace',
              fontSize: '0.875rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontWeight: '400',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              color: '#4b5563',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            'ul, ol': {
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

