import { css } from 'styled-components';

const baseButton = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.2rem;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  text-decoration: none;
  line-height: 1;
  color: var(--lightest-slate);
  background: linear-gradient(140deg, rgba(124, 230, 212, 0.12), rgba(123, 195, 255, 0.08));
  box-shadow: 0 14px 40px -24px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
  isolation: isolate;
  transition: var(--transition);

  &:before {
    content: '';
    position: absolute;
    inset: -40%;
    background: radial-gradient(circle at 20% 20%, rgba(124, 230, 212, 0.4), transparent 50%),
      radial-gradient(circle at 80% 0%, rgba(123, 195, 255, 0.26), transparent 45%),
      radial-gradient(circle at 50% 80%, rgba(167, 139, 250, 0.3), transparent 40%);
    opacity: 0;
    transform: translateY(8px);
    transition: var(--transition);
    z-index: -1;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 18px 55px -22px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  &:hover:before,
  &:focus-visible:before {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }
`;

const button = css`
  ${baseButton};
  padding: 1rem 1.4rem;
  font-size: var(--fz-xs);
  font-weight: 700;
  color: #041018;
  background: linear-gradient(120deg, #7ce6d4 0%, #7bc3ff 45%, #a78bfa 100%);
  box-shadow: 0 16px 45px -20px rgba(123, 195, 255, 0.9);

  &:before {
    inset: -20%;
    opacity: 0.85;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--green) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--green);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  smallButton: css`
    ${baseButton};
    padding: 0.8rem 1.05rem;
    font-size: var(--fz-xxs);
    background: rgba(255, 255, 255, 0.02);
    color: var(--lightest-slate);
    box-shadow: 0 12px 32px -22px rgba(0, 0, 0, 0.8);
  `,

  bigButton: css`
    ${baseButton};
    padding: 1.1rem 1.65rem;
    font-size: var(--fz-sm);
    font-weight: 700;
    color: #041018;
    background: linear-gradient(125deg, #7ce6d4 0%, #7bc3ff 50%, #a78bfa 100%);
    box-shadow: 0 18px 52px -20px rgba(123, 195, 255, 0.9);
  `,

  boxShadow: css`
    box-shadow: 0 18px 50px -28px var(--navy-shadow), 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
