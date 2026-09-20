import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ ready }) {
  const heroRef = useRef(null);

  const portraitRef = useRef(null);
  const portraitInnerRef = useRef(null);

  const blockRef = useRef(null);
  const headlineRef = useRef(null);
  const infoRef = useRef(null);

  const heroPlayedRef = useRef(false);

  /*
  ============================================================
  SET INITIAL HERO STATE BEFORE BROWSER PAINTS
  ============================================================
  */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /*
      NAV
      */

      gsap.set(
        '.hero-modern-nav > *',
        {
          y: 18,
          opacity: 0,
        }
      );

      /*
      CENTER PANEL
      */

      if (blockRef.current) {
        gsap.set(
          blockRef.current,
          {
            scaleY: 0,
            transformOrigin: 'bottom center',
          }
        );
      }

      /*
      PORTRAIT
      */

      if (portraitRef.current) {
        gsap.set(
          portraitRef.current,
          {
            y: 70,
            opacity: 0,
          }
        );
      }

      /*
      HEADLINE
      */

      if (headlineRef.current) {
        gsap.set(
          headlineRef.current.children,
          {
            yPercent: 115,
          }
        );
      }

      /*
      SIDE CONTENT
      */

      if (infoRef.current) {
        gsap.set(
          infoRef.current,
          {
            y: 20,
            opacity: 0,
          }
        );
      }

      gsap.set(
        '.hero-modern-availability',
        {
          y: 20,
          opacity: 0,
        }
      );

      gsap.set(
        '.hero-modern-footer',
        {
          y: 20,
          opacity: 0,
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
  ============================================================
  HERO ENTRANCE
  ============================================================
  */

  useLayoutEffect(() => {
    if (!ready) return;

    /*
    Prevent entrance from playing twice.
    */

    if (heroPlayedRef.current) return;

    heroPlayedRef.current = true;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      /*
      NAVIGATION
      */

      timeline.to(
        '.hero-modern-nav > *',
        {
          y: 0,
          opacity: 1,

          duration: 0.72,

          stagger: 0.07,

          ease: 'power3.out',
        }
      );

      /*
      GREY VISUAL PANEL
      */

      timeline.to(
        blockRef.current,
        {
          scaleY: 1,

          duration: 1.05,

          ease: 'power4.out',
        },
        '-=0.5'
      );

      /*
      PORTRAIT ENTERS
      */

      timeline.to(
        portraitRef.current,
        {
          y: 0,
          opacity: 1,

          duration: 1.05,

          ease: 'power4.out',
        },
        '-=0.85'
      );

      /*
      HEADLINE LINES
      */

      timeline.to(
        headlineRef.current.children,
        {
          yPercent: 0,

          duration: 1,

          stagger: 0.08,

          ease: 'power4.out',
        },
        '-=0.9'
      );

      /*
      RIGHT DESCRIPTION
      */

      timeline.to(
        infoRef.current,
        {
          y: 0,
          opacity: 1,

          duration: 0.75,

          ease: 'power3.out',
        },
        '-=0.62'
      );

      /*
      AVAILABILITY
      */

      timeline.to(
        '.hero-modern-availability',
        {
          y: 0,
          opacity: 1,

          duration: 0.7,

          ease: 'power3.out',
        },
        '-=0.55'
      );

      /*
      BOTTOM BAR
      */

      timeline.to(
        '.hero-modern-footer',
        {
          y: 0,
          opacity: 1,

          duration: 0.7,

          ease: 'power3.out',
        },
        '-=0.5'
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [ready]);

  /*
  ============================================================
  MOUSE PARALLAX
  ============================================================
  */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    if (
      !portraitInnerRef.current ||
      !blockRef.current ||
      !infoRef.current
    ) {
      return;
    }

    /*
    Very gentle movements.

    Your portrait remains visually centered.
    */

    const portraitX = gsap.quickTo(
      portraitInnerRef.current,
      'x',
      {
        duration: 1.1,
        ease: 'power3.out',
      }
    );

    const portraitY = gsap.quickTo(
      portraitInnerRef.current,
      'y',
      {
        duration: 1.1,
        ease: 'power3.out',
      }
    );

    const blockX = gsap.quickTo(
      blockRef.current,
      'x',
      {
        duration: 1.7,
        ease: 'power3.out',
      }
    );

    const blockY = gsap.quickTo(
      blockRef.current,
      'y',
      {
        duration: 1.7,
        ease: 'power3.out',
      }
    );

    const infoX = gsap.quickTo(
      infoRef.current,
      'x',
      {
        duration: 1.5,
        ease: 'power3.out',
      }
    );

    const handlePointerMove = (event) => {
      /*
      Disable mouse parallax on touch-like devices.
      */

      if (window.innerWidth <= 720) return;

      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      /*
      Portrait barely moves.
      Background panel moves opposite direction.
      */

      portraitX(x * 14);
      portraitY(y * 8);

      blockX(x * -22);
      blockY(y * -14);

      infoX(x * -7);
    };

    const resetParallax = () => {
      portraitX(0);
      portraitY(0);

      blockX(0);
      blockY(0);

      infoX(0);
    };

    hero.addEventListener(
      'pointermove',
      handlePointerMove
    );

    hero.addEventListener(
      'pointerleave',
      resetParallax
    );

    return () => {
      hero.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      hero.removeEventListener(
        'pointerleave',
        resetParallax
      );
    };
  }, []);

  /*
  ============================================================
  SCROLL PARALLAX
  ============================================================
  */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /*
      PORTRAIT

      Moves slower than the page.
      */

      gsap.to(
        portraitRef.current,
        {
          yPercent: -9,

          ease: 'none',

          scrollTrigger: {
            trigger: heroRef.current,

            start: 'top top',
            end: 'bottom top',

            scrub: 1.2,
          },
        }
      );

      /*
      BACK PANEL

      Moves in opposite direction slightly.
      */

      gsap.to(
        blockRef.current,
        {
          yPercent: 11,

          ease: 'none',

          scrollTrigger: {
            trigger: heroRef.current,

            start: 'top top',
            end: 'bottom top',

            scrub: 1.5,
          },
        }
      );

      /*
      LEFT HEADLINE

      Moves upward slightly faster.
      */

      gsap.to(
        headlineRef.current,
        {
          yPercent: -14,

          ease: 'none',

          scrollTrigger: {
            trigger: heroRef.current,

            start: 'top top',
            end: 'bottom top',

            scrub: 1.1,
          },
        }
      );

      /*
      RIGHT DESCRIPTION
      */

      gsap.to(
        infoRef.current,
        {
          yPercent: -20,

          ease: 'none',

          scrollTrigger: {
            trigger: heroRef.current,

            start: 'top top',
            end: 'bottom top',

            scrub: 1.35,
          },
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-modern"
    >
      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="hero-modern-nav">
        <a
          href="#top"
          className="hero-modern-logo"
        >
          <span>
            AS
          </span>

          <div>
            Abdullah Shah

            <small>
              Creative Developer
            </small>
          </div>
        </a>

        <nav>
          <a href="#work">
            Work
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>
        </nav>
      </header>

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div className="hero-modern-content">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="hero-modern-left">

          <span className="hero-modern-kicker">
            Muhammad Abdullah Shah / 2026
          </span>

          <div
            ref={headlineRef}
            className="hero-modern-heading"
          >
            <div>
              <h1>
                Websites
              </h1>
            </div>

            <div>
              <h1>
                built to feel
              </h1>
            </div>

            <div>
              <h1>
                <span>
                  alive.
                </span>
              </h1>
            </div>
          </div>

          <div className="hero-modern-availability">
            <span className="hero-status-dot" />

            <span>
              Available for selected projects
            </span>
          </div>

        </div>

        {/* ===================================================
            CENTER — YOU
        =================================================== */}

        <div className="hero-modern-visual">

          {/* BACKGROUND PANEL */}

          <div
            ref={blockRef}
            className="hero-modern-block"
          >
            <span className="hero-block-code">
              01
            </span>

            <span className="hero-block-label">
              CREATIVE DEVELOPMENT
            </span>
          </div>

          {/* PORTRAIT */}

          <div
            ref={portraitRef}
            className="hero-modern-portrait"
          >
            <div
              ref={portraitInnerRef}
              className="hero-modern-portrait-inner"
            >
              <img
                src="/abdullah-hero.webp"
                alt="Muhammad Abdullah Shah — Creative Web Developer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

        </div>

        {/* ===================================================
            RIGHT CONTENT
        =================================================== */}

        <aside
          ref={infoRef}
          className="hero-modern-info"
        >
          <ArrowDownRight
            strokeWidth={1.3}
          />

          <p>
            I design and build modern
            digital experiences using
            <strong>
              {' '}
              code, interaction and 3D.
            </strong>
          </p>

          <p className="hero-modern-info-secondary">
            From production websites to
            interactive experiences, every
            project is built around usability,
            performance and a distinct visual
            identity.
          </p>

          <a href="#work">
            Explore my work

            <ArrowUpRight
              strokeWidth={1.4}
            />
          </a>
        </aside>

      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="hero-modern-footer">

        <div className="hero-modern-services">
          <span>
            React
          </span>

          <span>
            Creative Development
          </span>

          <span>
            Three.js
          </span>

          <span>
            WordPress
          </span>
        </div>

        <a
          href="#work"
          className="hero-modern-scroll"
        >
          <span>
            Scroll
          </span>

          <span className="hero-modern-scroll-circle">
            <ArrowDown
              strokeWidth={1.4}
            />
          </span>
        </a>

      </div>

    </section>
  );
}
