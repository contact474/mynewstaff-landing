
/** @type {import('postcss-load-config').Config} */
// CRITICAL: Tailwind v4 needs this to run @tailwindcss/postcss. Without it,
// `@import "tailwindcss"` is never processed and the site ships with NO
// Tailwind CSS (only next/font @font-face survives) → unstyled pages.
// This file has been lost to "pre-wipe" cycles 3+ times. It MUST stay
// committed to git. Do not delete. See memory: mynewstaff-css-postcss-fix.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

