"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "flip-up" | "flip-left";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };

    const hiddenStyles: Record<AnimationType, React.CSSProperties> = {
      "fade-up": { opacity: 0, transform: "translateY(60px)" },
      "fade-down": { opacity: 0, transform: "translateY(-60px)" },
      "fade-left": { opacity: 0, transform: "translateX(60px)" },
      "fade-right": { opacity: 0, transform: "translateX(-60px)" },
      "zoom-in": { opacity: 0, transform: "scale(0.9)" },
      "zoom-out": { opacity: 0, transform: "scale(1.1)" },
      "flip-up": { opacity: 0, transform: "perspective(1000px) rotateX(20deg) translateY(40px)" },
      "flip-left": { opacity: 0, transform: "perspective(1000px) rotateY(20deg) translateX(40px)" },
    };

    const visibleStyles: React.CSSProperties = {
      opacity: 1,
      transform: "translateY(0) translateX(0) scale(1) rotateX(0deg) rotateY(0deg)",
    };

    return {
      ...baseStyles,
      ...(isVisible ? visibleStyles : hiddenStyles[animation]),
    };
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {staggerChildren ? (
        <StaggeredChildren isVisible={isVisible} staggerDelay={staggerDelay} duration={duration}>
          {children}
        </StaggeredChildren>
      ) : (
        children
      )}
    </div>
  );
}

interface StaggeredChildrenProps {
  children: React.ReactNode;
  isVisible: boolean;
  staggerDelay: number;
  duration: number;
}

function StaggeredChildren({ children, isVisible, staggerDelay, duration }: StaggeredChildrenProps) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <>
      {childArray.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
}

// Parallax scroll effect hook
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
