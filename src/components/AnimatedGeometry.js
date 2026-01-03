import React, { useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const GeometryStyles = createGlobalStyle`
  @keyframes geometry-float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }

  @keyframes geometry-drift {
    0%, 100% {
      transform: translateX(0px) translateY(0px);
    }
    33% {
      transform: translateX(30px) translateY(-15px);
    }
    66% {
      transform: translateX(-20px) translateY(20px);
    }
  }

  @keyframes geometry-pulse {
    0%, 100% {
      opacity: 0.08;
      transform: scale(1);
    }
    50% {
      opacity: 0.15;
      transform: scale(1.1);
    }
  }

  .geometry-shape {
    position: absolute;
    opacity: 0.08;
    pointer-events: none;
  }

  .geometry-shape.circle {
    border-radius: 50%;
    border: 1px solid;
    background: radial-gradient(circle, currentColor, transparent);
  }

  .geometry-shape.triangle {
    width: 0;
    height: 0;
    border-left: solid transparent;
    border-right: solid transparent;
    border-bottom: solid;
    background: none;
    border-top: none;
  }

  .geometry-shape.square {
    border-radius: 4px;
    border: 1px solid;
    background: linear-gradient(135deg, currentColor, transparent);
  }

  .geometry-shape.hexagon {
    border: 1px solid;
    background: currentColor;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .geometry-shape.animate-float {
    animation: geometry-float 8s ease-in-out infinite;
  }

  .geometry-shape.animate-drift {
    animation: geometry-drift 12s ease-in-out infinite;
  }

  .geometry-shape.animate-pulse {
    animation: geometry-pulse 4s ease-in-out infinite;
  }
`;

const StyledGeometry = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AnimatedGeometry = () => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const colors = ['#7ce6d4', '#7bc3ff', '#a78bfa'];
    const shapes = ['circle', 'triangle', 'square', 'hexagon'];
    const animations = ['float', 'drift', 'pulse'];

    // Create geometric shapes positioned on sides
    const createShape = (side, index) => {
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 40 + Math.random() * 60;
      const top = 10 + (index * 15) + Math.random() * 5;
      const animation = animations[Math.floor(Math.random() * animations.length)];
      const duration = 6 + Math.random() * 6;
      const delay = Math.random() * 3;

      shape.className = `geometry-shape ${shapeType} animate-${animation}`;
      shape.style.color = color;
      shape.style.width = shapeType === 'triangle' ? '0' : `${size}px`;
      shape.style.height = shapeType === 'triangle' ? '0' : `${size}px`;
      shape.style.left = side === 'left' ? `${5 + Math.random() * 3}%` : `${92 + Math.random() * 3}%`;
      shape.style.top = `${top}%`;
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `${delay}s`;

      if (shapeType === 'triangle') {
        shape.style.borderLeftWidth = `${size}px`;
        shape.style.borderRightWidth = `${size}px`;
        shape.style.borderBottomWidth = `${size * 1.73}px`;
      }

      return shape;
    };

    // Create left side shapes
    for (let i = 0; i < 8; i++) {
      const shape = createShape('left', i);
      container.appendChild(shape);
      shapesRef.current.push(shape);
    }

    // Create right side shapes
    for (let i = 0; i < 8; i++) {
      const shape = createShape('right', i);
      container.appendChild(shape);
      shapesRef.current.push(shape);
    }

    // Update shapes on scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const maxScroll = document.documentElement.scrollHeight - windowHeight;
          const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

          shapesRef.current.forEach((shape, index) => {
            if (shape) {
              const scrollOffset = scrollProgress * 100 * (index % 2 === 0 ? 1 : -1);
              const baseTop = parseFloat(shape.style.top);
              shape.style.transform = `translateY(${scrollOffset}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      shapesRef.current.forEach(shape => {
        if (shape && shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
      shapesRef.current = [];
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <GeometryStyles />
      <StyledGeometry ref={containerRef} />
    </>
  );
};

export default AnimatedGeometry;
