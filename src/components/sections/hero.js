import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { email } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  gap: 18px;
  position: relative;
  isolation: isolate;

  &:before {
    content: '';
    position: absolute;
    inset: -8% 0 -4%;
    background: radial-gradient(circle at 10% 20%, rgba(124, 230, 212, 0.28), transparent 30%),
      radial-gradient(circle at 85% 10%, rgba(123, 195, 255, 0.22), transparent 28%),
      radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.2), transparent 32%);
    z-index: -2;
    filter: blur(4px);
  }

  &:after {
    content: '';
    position: absolute;
    inset: -6%;
    background: linear-gradient(180deg, rgba(10, 16, 36, 0.35) 0%, rgba(10, 16, 36, 0.7) 100%);
    z-index: -1;
    pointer-events: none;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-card {
    width: 100%;
    max-width: 1100px;
    padding: 48px;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 26px;
    box-shadow: var(--panel-shadow);
    backdrop-filter: blur(12px);
    overflow: hidden;
    position: relative;
    animation: float 6s ease-in-out infinite;

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    &:before {
      content: '';
      position: absolute;
      inset: -10%;
      background: radial-gradient(circle at 15% 20%, rgba(124, 230, 212, 0.18), transparent 30%),
        radial-gradient(circle at 90% 20%, rgba(123, 195, 255, 0.16), transparent 25%),
        linear-gradient(120deg, rgba(255, 255, 255, 0.03), transparent 40%);
      z-index: -1;
      animation: gradientShift 8s ease-in-out infinite;
    }

    @keyframes gradientShift {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
  }

  h1,
  h2 {
    margin: 0;
  }

  h1 {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 4vw, var(--fz-lg));
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  h2.big-heading {
    font-size: clamp(48px, 8vw, 82px);
    line-height: 1.05;

    .accent {
      background: linear-gradient(120deg, #7ce6d4 0%, #7bc3ff 40%, #a78bfa 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }
  }

  h3.big-heading {
    color: var(--light-slate);
    font-size: clamp(28px, 6vw, 38px);
    font-weight: 500;
    margin-top: 12px;
  }

  p {
    margin: 22px 0 0;
    max-width: 720px;
    color: var(--light-slate);
    font-size: clamp(var(--fz-lg), 2vw, 22px);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 34px;

    .email-link {
      ${({ theme }) => theme.mixins.bigButton};
    }

    .secondary {
      ${({ theme }) => theme.mixins.smallButton};
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;

    .pill {
      padding: 6px 14px;
      background: rgba(124, 230, 212, 0.1);
      border: 1px solid rgba(124, 230, 212, 0.2);
      border-radius: 20px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      transition: var(--transition);

      &:hover {
        background: rgba(124, 230, 212, 0.15);
        transform: translateY(-2px);
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const eyebrow = <h1>Cloud & platform software engineer</h1>;
  const heading = (
    <h2 className="big-heading">
      Hi, I'm <span className="accent">Jason Saini</span>
    </h2>
  );
  const subheading = <h3 className="big-heading">I design resilient products that ship to production.</h3>;
  const bio = (
    <p>
      I specialize in building reliable services and data products for scale. From internships at
      Amazon, Morgan Stanley, Siemens, and Southwest Airlines, I’ve led cloud-native delivery, hardened
      security, and built experiences that customers notice.
    </p>
  );
  const actions = (
    <div className="actions">
      <a className="email-link" href={`mailto:${email}`}>
        Let&apos;s collaborate
      </a>
      <a className="secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
        View resume
      </a>
    </div>
  );
  const meta = (
    <div className="meta">
      <span className="pill">Cloud platforms & IaC</span>
      <span className="pill">Data & ML products</span>
      <span className="pill">Mentorship & leadership</span>
    </div>
  );

  const items = [eyebrow, heading, subheading, bio, actions, meta];

  return (
    <StyledHeroSection>
      <div className="hero-card">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
