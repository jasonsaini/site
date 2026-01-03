import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) {
      return;
    }

    const element = elementRef.current;
    const {
      threshold = 0.1,
      rootMargin = '0px 0px -100px 0px',
      animationClass = 'revealed',
      dataAttribute = 'scroll-reveal',
    } = options;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [prefersReducedMotion, options]);

  return elementRef;
};

export default useScrollReveal;

