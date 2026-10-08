import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Smooth scrolling, scroll-linked GSAP and reveal-on-scroll for the whole site. */
export function initMotion() {
  if (!prefersReducedMotion()) {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -80 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  }

  initReveal();

  // Images that load late change layout height; keep triggers accurate.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );

  items.forEach((el) => io.observe(el));
}

export { gsap, ScrollTrigger };
