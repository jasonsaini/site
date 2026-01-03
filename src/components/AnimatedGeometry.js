import React, { useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const GeometryStyles = createGlobalStyle`
  @keyframes node-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.9;
    }
  }

  @keyframes node-float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  @keyframes connection-flow {
    0% {
      stroke-dashoffset: 0;
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      stroke-dashoffset: -20;
      opacity: 0.3;
    }
  }

  .network-node {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, currentColor, transparent);
    border: 2px solid currentColor;
    pointer-events: none;
    animation: node-pulse 3s ease-in-out infinite;
  }

  .network-node.animate-float {
    animation: node-pulse 3s ease-in-out infinite, node-float 6s ease-in-out infinite;
  }
`;

const StyledNetwork = styled.div`
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

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .connection-line {
    stroke: currentColor;
    stroke-width: 1;
    fill: none;
    opacity: 0.2;
    stroke-dasharray: 5, 5;
    animation: connection-flow 4s linear infinite;
  }
`;

const AnimatedGeometry = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const colors = ['#7ce6d4', '#7bc3ff', '#a78bfa'];
    
    // Create SVG for connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'network-svg');
    container.appendChild(svg);
    svgRef.current = svg;

    // Create symmetrical node grid
    const createSymmetricalNodes = () => {
      const nodes = [];
      const gridCols = 8;
      const gridRows = 6;
      const paddingX = 8;
      const paddingY = 10;
      
      // Calculate spacing
      const widthPercent = 100 - (paddingX * 2);
      const heightPercent = 100 - (paddingY * 2);
      const colSpacing = widthPercent / (gridCols - 1);
      const rowSpacing = heightPercent / (gridRows - 1);

      // Create nodes in grid pattern
      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const x = paddingX + (col * colSpacing);
          const y = paddingY + (row * rowSpacing);
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = 8 + Math.random() * 6;
          const delay = Math.random() * 2;
          const shouldFloat = Math.random() > 0.5;

          const node = document.createElement('div');
          node.className = `network-node ${shouldFloat ? 'animate-float' : ''}`;
          node.style.width = `${size}px`;
          node.style.height = `${size}px`;
          node.style.left = `${x}%`;
          node.style.top = `${y}%`;
          node.style.color = color;
          node.style.animationDelay = `${delay}s`;
          node.setAttribute('data-x', x);
          node.setAttribute('data-y', y);
          node.setAttribute('data-color', color);

          container.appendChild(node);
          nodes.push({
            element: node,
            x,
            y,
            color,
            size,
          });
        }
      }

      return nodes;
    };

    // Create connections between nearby nodes
    const createConnections = (nodes) => {
      const connections = [];
      const maxDistance = 15; // percentage

      nodes.forEach((node, i) => {
        // Find nearby nodes
        const nearbyNodes = nodes.filter((otherNode, j) => {
          if (i === j) return false;
          const dx = Math.abs(node.x - otherNode.x);
          const dy = Math.abs(node.y - otherNode.y);
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < maxDistance;
        });

        // Connect to 2-3 nearest nodes
        nearbyNodes
          .sort((a, b) => {
            const distA = Math.sqrt(
              Math.pow(node.x - a.x, 2) + Math.pow(node.y - a.y, 2)
            );
            const distB = Math.sqrt(
              Math.pow(node.x - b.x, 2) + Math.pow(node.y - b.y, 2)
            );
            return distA - distB;
          })
          .slice(0, Math.floor(2 + Math.random() * 2))
          .forEach(targetNode => {
            // Check if connection already exists
            const exists = connections.some(
              conn =>
                (conn.from === node && conn.to === targetNode) ||
                (conn.from === targetNode && conn.to === node)
            );

            if (!exists) {
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              const color = node.color;
              const opacity = 0.15 + Math.random() * 0.1;

              line.setAttribute('class', 'connection-line');
              line.setAttribute('x1', `${node.x}%`);
              line.setAttribute('y1', `${node.y}%`);
              line.setAttribute('x2', `${targetNode.x}%`);
              line.setAttribute('y2', `${targetNode.y}%`);
              line.setAttribute('stroke', color);
              line.setAttribute('opacity', opacity);
              line.style.animationDelay = `${Math.random() * 2}s`;

              svg.appendChild(line);
              connections.push({
                from: node,
                to: targetNode,
                element: line,
              });
            }
          });
      });

      return connections;
    };

    // Initialize network
    const nodes = createSymmetricalNodes();
    nodesRef.current = nodes;
    const connections = createConnections(nodes);
    connectionsRef.current = connections;

    // Update network on scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const maxScroll = document.documentElement.scrollHeight - windowHeight;
          const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

          // Animate nodes based on scroll
          nodes.forEach((node, index) => {
            if (node.element) {
              const scrollOffset = Math.sin(scrollProgress * Math.PI * 2 + index) * 10;
              const baseTop = parseFloat(node.element.style.top);
              node.element.style.transform = `translateY(${scrollOffset}px)`;
            }
          });

          // Update connection opacity based on scroll
          connections.forEach((conn, index) => {
            if (conn.element) {
              const pulse = Math.sin(scrollProgress * Math.PI * 4 + index) * 0.1 + 0.2;
              conn.element.setAttribute('opacity', pulse);
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
      nodes.forEach(node => {
        if (node.element && node.element.parentNode) {
          node.element.parentNode.removeChild(node.element);
        }
      });
      connections.forEach(conn => {
        if (conn.element && conn.element.parentNode) {
          conn.element.parentNode.removeChild(conn.element);
        }
      });
      if (svg && svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
      nodesRef.current = [];
      connectionsRef.current = [];
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <GeometryStyles />
      <StyledNetwork ref={containerRef} />
    </>
  );
};

export default AnimatedGeometry;
