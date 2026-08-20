'use client';

/**
 * Defers mounting expensive/third-party children (e.g. the Calendly embed)
 * until the wrapper scrolls near the viewport. Renders `placeholder` in the
 * same spot until then so layout never shifts once the real content mounts.
 */

import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazyMount({
  children,
  placeholder = null,
  rootMargin = "300px",
  className,
}: LazyMountProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? children : placeholder}
    </div>
  );
}
