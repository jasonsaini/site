import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 22px;
  box-shadow: var(--panel-shadow);
  backdrop-filter: blur(10px);
  padding: 48px;
  position: relative;
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 30px 90px -30px rgba(0, 0, 0, 0.75);
  }

  &:before {
    content: '';
    position: absolute;
    inset: -8%;
    background: radial-gradient(circle at 12% 18%, rgba(124, 230, 212, 0.15), transparent 32%),
      radial-gradient(circle at 88% 8%, rgba(123, 195, 255, 0.12), transparent 30%);
    z-index: -1;
    animation: gradientPulse 10s ease-in-out infinite;
  }

  @keyframes gradientPulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  p {
    color: var(--lightest-slate);
    line-height: 1.7;
    margin-bottom: 18px;

    a {
      color: var(--green);
      transition: var(--transition);

      &:hover {
        color: var(--blue);
      }
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background: linear-gradient(140deg, rgba(124, 230, 212, 0.25), rgba(123, 195, 255, 0.18));

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--lightest-slate);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--blue);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Java',
    'JavaScript',
    'AWS',
    'Terraform',
    'Serverless',
    'Kafka',
    'SQL',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm Jason, a software engineer specializing in cloud platforms, backend systems, and
              data products. I'm currently a Software Engineer at Southwest Airlines, building
              serverless microservices and automation systems.
            </p>

            <p>
              I've had the privilege of working at{' '}
              <a href="https://aws.amazon.com/">Amazon Web Services</a>,{' '}
              <a href="https://www.morganstanley.com/">Morgan Stanley</a>,{' '}
              <a href="https://www.sw.siemens.com/en-US/">Siemens</a>, and{' '}
              <a href="https://www.optum.com/">Optum</a>, where I've delivered scalable cloud
              infrastructure, automated deployment pipelines, and data-driven solutions.
            </p>

            <p>
              I'm passionate about building resilient systems, automating workflows, and mentoring
              teammates. I hold AWS Cloud Practitioner, Solutions Architect Associate, and Developer
              Associate certifications.
            </p>

            <p>Here are a few tools and platforms I’ve leaned on lately:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
