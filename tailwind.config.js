/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro Variable', 'Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

