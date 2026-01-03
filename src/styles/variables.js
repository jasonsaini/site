import { css } from 'styled-components';

// change green to #36eeff for blue
// yellow #fcc603

const variables = css`
  :root {
    --dark-navy: #050915;
    --navy: #0a1024;
    --light-navy: #0f1c36;
    --lightest-navy: #1a2745;
    --navy-shadow: rgba(5, 9, 21, 0.68);
    --dark-slate: #5b6783;
    --slate: #9aa6c4;
    --light-slate: #c4cce4;
    --lightest-slate: #e7ecff;
    --white: #f9fbff;
    --green: #7ce6d4;
    --green-tint: rgba(124, 230, 212, 0.1);
    --pink: #f59ad6;
    --blue: #7bc3ff;
    --purple: #a78bfa;
    --gradient-01: radial-gradient(circle at 15% 20%, rgba(124, 230, 212, 0.18), transparent 30%),
      radial-gradient(circle at 80% 0%, rgba(123, 195, 255, 0.18), transparent 26%),
      radial-gradient(circle at 90% 60%, rgba(167, 139, 250, 0.18), transparent 24%),
      linear-gradient(135deg, #050915 0%, #0d1935 55%, #0b1226 100%);
    --card-bg: rgba(255, 255, 255, 0.03);
    --card-border: rgba(255, 255, 255, 0.08);
    --panel-shadow: 0 25px 80px -30px rgba(0, 0, 0, 0.65);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;