import { useEffect, useRef, useState } from 'react';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ScrollBackground from './ScrollBackground';
import FixedVideoBg from './FixedVideoBg';
import HeroReveal from './HeroReveal';
import Hero from './Hero';
import FeaturedWorks from './FeaturedWorks';
import DiveIntro from './DiveIntro';
import Roles from './Roles';
import ScrollCurve from './ScrollCurve';

import Experience from './Experience';
import Skills from './Skills';

import Contact from './Contact';
import Footer from './Footer';
import IntroLoader from './IntroLoader';

import './IntroLoader.css';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [showIntro, setShowIntro] = useState(!prefersReducedMotion);
  const [studioReached, setStudioReached] = useState(false);

  const studioRef = useRef(null);
  const lenisRef = useRef(null);
  const curveRegionRef = useRef(null);

  /* ---------------------------------------------
     Always start the portfolio from the top
  --------------------------------------------- */
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  /* ---------------------------------------------
     Lock page while intro animation is showing
  --------------------------------------------- */
  useEffect(() => {
    if (!showIntro) return;

    window.scrollTo(0, 0);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  /* ---------------------------------------------
     Detect when the Roles / Studio area is reached
  --------------------------------------------- */
  useEffect(() => {
    const element = studioRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStudioReached(
          entry.isIntersecting || entry.boundingClientRect.top < 0
        );
      },
      {
        rootMargin: '-35% 0px -35% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------
     Lenis smooth scrolling
  --------------------------------------------- */
  useEffect(() => {
    if (showIntro) return;

    const lenis = new Lenis({
      duration: 0.8,

      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,

      anchors: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.scrollTo(0, {
      immediate: true,
    });

    /* Keep GSAP ScrollTrigger synced with Lenis */
    lenis.on('scroll', ScrollTrigger.update);

    let animationFrameId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);

      animationFrameId = requestAnimationFrame(raf);
    });

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(animationFrameId);

      lenis.off('scroll', ScrollTrigger.update);

      lenis.destroy();

      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [showIntro]);

  return (
    <>
      {/* -----------------------------------------
          INTRO LOADER
      ----------------------------------------- */}
      {showIntro && (
        <IntroLoader
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* -----------------------------------------
          GLOBAL BACKGROUNDS
      ----------------------------------------- */}
      <ScrollBackground zoomed={studioReached} />

      <FixedVideoBg />

      <div
        className="reveal-bg"
        aria-hidden="true"
      />

      {/* -----------------------------------------
          MAIN PORTFOLIO
      ----------------------------------------- */}
      <main
        className="site-main"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* HERO REVEAL */}
        <div className="hero-shift">
          <HeroReveal />
        </div>

        {/* DIVE INTRO */}
        <DiveIntro />

        {/* ---------------------------------------
            HERO + ROLES CURVE REGION
        --------------------------------------- */}
        <div
          className="curve-region"
          ref={curveRegionRef}
        >
          <ScrollCurve
            regionRef={curveRegionRef}
          />

          <Hero />

          <Roles
            ref={studioRef}
          />
        </div>

        {/* ---------------------------------------
            FEATURED WORKS
        --------------------------------------- */}
        <FeaturedWorks />

        {/* ---------------------------------------
            EXPERIENCE
        --------------------------------------- */}
        <Experience />

        {/* ---------------------------------------
            SKILLS
        --------------------------------------- */}
        <Skills />

        {/* ---------------------------------------
            CONTACT
        --------------------------------------- */}
        <Contact />
      </main>

      {/* -----------------------------------------
          FOOTER
          Kept outside site-main so sticky
          positioning continues to work correctly.
      ----------------------------------------- */}
      <Footer />
    </>
  );
}
