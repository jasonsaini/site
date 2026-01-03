import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition

const TransitionStyles = css`
  /* Fade up with scale */
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(30px) scale(0.95);
    transition: opacity 400ms var(--easing), transform 400ms var(--easing);
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px) scale(1);
    transition: opacity 400ms var(--easing), transform 400ms var(--easing);
  }

  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-30px) scale(0.95);
    transition: opacity 400ms var(--easing), transform 400ms var(--easing);
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px) scale(1);
    transition: opacity 400ms var(--easing), transform 400ms var(--easing);
  }

  /* Fade */
  .fade-enter {
    opacity: 0;
    transform: scale(0.98);
  }
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  .fade-exit {
    opacity: 1;
    transform: scale(1);
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.98);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }

  /* Scroll reveal animations */
  [data-scroll-reveal] {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  [data-scroll-reveal].revealed {
    opacity: 1;
    transform: translateY(0);
  }

  [data-scroll-reveal-left] {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  [data-scroll-reveal-left].revealed {
    opacity: 1;
    transform: translateX(0);
  }

  [data-scroll-reveal-right] {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  [data-scroll-reveal-right].revealed {
    opacity: 1;
    transform: translateX(0);
  }

  [data-scroll-reveal-scale] {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  [data-scroll-reveal-scale].revealed {
    opacity: 1;
    transform: scale(1);
  }
`;

export default TransitionStyles;
