"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from "../components/lenisProvider";

// Hook for scroll-progress-based animations
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      const currentProgress = lenis.progress;
      const currentVelocity = lenis.velocity;
      const currentDirection = lenis.direction === 1 ? "down" : "up";
      
      setProgress(currentProgress);
      setVelocity(currentVelocity);
      setDirection(currentDirection);
    };

    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  return { progress, velocity, direction };
}

// Hook for element-specific scroll progress (0-1 as element enters and leaves viewport)
export function useElementScrollProgress(offset: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const elementTop = rect.top - windowHeight;
      const elementBottom = rect.bottom;
      const totalDistance = windowHeight + rect.height;
      
      const currentProgress = Math.max(0, Math.min(1, -elementTop / totalDistance));
      setProgress(currentProgress + offset);
    };

    lenis.on("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, offset]);

  return { ref, progress };
}

// Parallax effect with Lenis
export function useLenisParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      setTransform(distance * speed);
    };

    lenis.on("scroll", handleScroll);
    handleScroll();
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, speed]);

  return { ref, transform };
}

// Velocity-based skew effect
export function useVelocitySkew(intensity: number = 2) {
  const [skew, setSkew] = useState(0);
  const { lenis } = useLenis();
  const targetSkew = useRef(0);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      targetSkew.current = lenis.velocity * intensity;
    };

    // Smooth interpolation
    const animate = () => {
      setSkew(prev => prev + (targetSkew.current - prev) * 0.1);
      requestAnimationFrame(animate);
    };

    lenis.on("scroll", handleScroll);
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      lenis.off("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [lenis, intensity]);

  return skew;
}

// Horizontal scroll section hook
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !containerRef.current || !scrollRef.current) return;

    const handleScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      // Calculate how far into the sticky section we are
      const scrollProgress = Math.max(0, Math.min(1, -containerRect.top / containerHeight));
      
      setTranslateX(-scrollProgress * scrollWidth);
    };

    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  return { containerRef, scrollRef, translateX };
}

// Scale on scroll hook
export function useScrollScale(minScale: number = 0.8, maxScale: number = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(minScale);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      
      // Scale from minScale to maxScale as element approaches center
      const distanceFromCenter = Math.abs(elementCenter - windowHeight / 2);
      const maxDistance = windowHeight / 2;
      const progress = 1 - Math.min(1, distanceFromCenter / maxDistance);
      
      setScale(minScale + progress * (maxScale - minScale));
    };

    lenis.on("scroll", handleScroll);
    handleScroll();
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, minScale, maxScale]);

  return { ref, scale };
}

// Rotate on scroll hook
export function useScrollRotate(maxRotation: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      setRotation((progress - 0.5) * maxRotation * 2);
    };

    lenis.on("scroll", handleScroll);
    handleScroll();
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, maxRotation]);

  return { ref, rotation };
}

// Opacity fade based on scroll position
export function useScrollOpacity() {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Fade in as element enters, stay visible in middle, fade out as it leaves
      const enterProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.3)));
      const exitProgress = Math.max(0, Math.min(1, rect.bottom / (windowHeight * 0.3)));
      
      setOpacity(Math.min(enterProgress, exitProgress));
    };

    lenis.on("scroll", handleScroll);
    handleScroll();
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  return { ref, opacity };
}

// Text reveal on scroll
export function useTextReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState("inset(0 100% 0 0)");
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.5)));
      
      setClipPath(`inset(0 ${(1 - progress) * 100}% 0 0)`);
    };

    lenis.on("scroll", handleScroll);
    handleScroll();
    
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  return { ref, clipPath };
}
