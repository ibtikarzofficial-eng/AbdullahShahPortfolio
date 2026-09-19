import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

import '../styles/work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    type: 'Production Work',
    title: 'Jupiter Advisers',
    eyebrow: 'Visa & Immigration / Pakistan',
    year: '2026',
    context: 'Under Jupiter Advisers',

    services: [
      'WordPress',
      'Custom UI',
      'Lead Systems',
      'Technical SEO',
    ],

    description:
      'A production digital platform for a visa consultancy, combining service discovery, lead generation, eligibility journeys, webinar flows and responsive customer experiences.',

    image: '/projects/jupiter-advisers.webp',

    liveUrl: 'https://jupiteradviser.com/',

    layout: 'wide',
    media: 'jupiter',
  },

  {
    id: '02',
    type: 'Client Work',
    title: "Picazo's Flowers",
    eyebrow: 'Floral Design / California',
    year: '2026',
    context: 'Under CoreMint Labs',

    services: [
      'Web Development',
      'Responsive UI',
      'UX Implementation',
    ],

    description:
      'A modern digital presence for a California floral business, designed around weddings, events, floral services and a cleaner customer journey.',

    image: '/projects/picazos.webp',

    liveUrl: 'https://www.picazosflowers.com/',

    layout: 'offset-right',
    media: 'picazos',
  },

  {
    id: '03',
    type: 'Founder / Studio',
    title: 'IbtikarZ',
    eyebrow: 'Digital Studio / Worldwide',
    year: '2026',
    context: 'Founder Project',

    services: [
      'Creative Direction',
      'Web Development',
      'SEO',
      '3D Web',
    ],

    description:
      'A founder-led digital studio positioned around two sides of modern web development: growth-focused websites and immersive interactive experiences.',

    image: '/projects/ibtikarz.webp',

    liveUrl: 'https://ibtikarz.com/',

    layout: 'offset-left',
    media: 'ibtikarz',
  },

  {
    id: '04',
    type: 'Interactive Experiment',
    title: 'Photography in 3D',
    eyebrow: 'Creative Development / WebGL',
    year: '2026',
    context: 'IbtikarZ / Saad Jameel',

    services: [
      'React',
      'Three.js',
      'React Three Fiber',
      'Interaction Design',
    ],

    description:
      'An interactive photography portfolio that transforms image browsing into a spatial experience through real-time 3D, camera movement and direct manipulation.',

    image: '/projects/photography-3d.webp',

    liveUrl: 'https://portfolio.ibtikarz.com/',

    layout: 'wide',
    media: 'photography',
  },
];

export default function Work() {
  const sectionRef = useRef(null);

  const projectRefs = useRef([]);
  const visualRefs = useRef([]);
  const imageRefs = useRef([]);
  const infoRefs = useRef([]);

  const cursorRef = useRef(null);

  const [activeProject, setActiveProject] =
    useState(0);

  const [hoveringProject, setHoveringProject] =
    useState(false);

  /* ========================================================
     INTRO
  ======================================================== */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-v8-reveal',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',

          scrollTrigger: {
            trigger: '.work-v8-intro',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ========================================================
     PROJECT SCROLL SYSTEM
  ======================================================== */

  useEffect(() => {
    const animations = [];
    const triggers = [];

    projectRefs.current.forEach(
      (project, index) => {
        if (!project) return;

        const visual =
          visualRefs.current[index];

        const image =
          imageRefs.current[index];

        const info =
          infoRefs.current[index];

        /* ACTIVE PROJECT */

        const activeTrigger =
          ScrollTrigger.create({
            trigger: project,

            start: 'top 55%',
            end: 'bottom 45%',

            onEnter: () =>
              setActiveProject(index),

            onEnterBack: () =>
              setActiveProject(index),
          });

        triggers.push(activeTrigger);

        /* VISUAL ENTRANCE */

        if (visual) {
          const animation =
            gsap.fromTo(
              visual,
              {
                y: 70,
                scale: 0.98,
              },
              {
                y: 0,
                scale: 1,

                ease: 'none',

                scrollTrigger: {
                  trigger: project,

                  start: 'top 92%',
                  end: 'top 62%',

                  scrub: 1,
                },
              }
            );

          animations.push(animation);
        }

        /* IMAGE PARALLAX */

        if (image) {
          const animation =
            gsap.fromTo(
              image,
              {
                yPercent: -3,
                scale: 1.045,
              },
              {
                yPercent: 3,
                scale: 1.02,

                ease: 'none',

                scrollTrigger: {
                  trigger: visual,

                  start: 'top bottom',
                  end: 'bottom top',

                  scrub: 1.3,
                },
              }
            );

          animations.push(animation);
        }

        /* INFORMATION */

        if (info) {
          const animation =
            gsap.fromTo(
              info,
              {
                y: 35,
                opacity: 0.25,
              },
              {
                y: 0,
                opacity: 1,

                ease: 'none',

                scrollTrigger: {
                  trigger: project,

                  start: 'top 79%',
                  end: 'top 52%',

                  scrub: 1,
                },
              }
            );

          animations.push(animation);
        }
      }
    );

    ScrollTrigger.refresh();

    return () => {
      animations.forEach(
        (animation) =>
          animation?.kill?.()
      );

      triggers.forEach(
        (trigger) =>
          trigger?.kill?.()
      );
    };
  }, []);

  /* ========================================================
     CUSTOM PROJECT CURSOR
  ======================================================== */

  useEffect(() => {
    const cursor =
      cursorRef.current;

    if (!cursor) return;

    const xTo =
      gsap.quickTo(cursor, 'x', {
        duration: 0.32,
        ease: 'power3.out',
      });

    const yTo =
      gsap.quickTo(cursor, 'y', {
        duration: 0.32,
        ease: 'power3.out',
      });

    const handleMove = (event) => {
      if (
        !hoveringProject ||
        window.innerWidth <= 800
      ) {
        return;
      }

      xTo(event.clientX);
      yTo(event.clientY);
    };

    window.addEventListener(
      'pointermove',
      handleMove
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handleMove
      );
    };
  }, [hoveringProject]);

  /* ========================================================
     POINTER DEPTH
  ======================================================== */

  const handleProjectMove = (
    event,
    index
  ) => {
    if (window.innerWidth <= 800) {
      return;
    }

    const visual =
      visualRefs.current[index];

    const image =
      imageRefs.current[index];

    if (!visual || !image) return;

    const rect =
      visual.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    gsap.to(visual, {
      rotateY: x * 0.7,
      rotateX: y * -0.45,

      duration: 0.8,

      ease: 'power3.out',

      transformPerspective: 1600,

      overwrite: true,
    });

    gsap.to(image, {
      x: x * 6,
      y: y * 4,

      duration: 1,

      ease: 'power3.out',

      overwrite: true,
    });
  };

  const resetProject = (index) => {
    const visual =
      visualRefs.current[index];

    const image =
      imageRefs.current[index];

    if (visual) {
      gsap.to(visual, {
        rotateX: 0,
        rotateY: 0,

        duration: 0.9,

        ease: 'power3.out',
      });
    }

    if (image) {
      gsap.to(image, {
        x: 0,
        y: 0,

        duration: 1,

        ease: 'power3.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-v8"
    >
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="work-v8-intro">

        <div className="work-v8-intro-top">

          <span className="work-v8-reveal">
            Selected Work
          </span>

          <span className="work-v8-reveal">
            04 Projects / 2026
          </span>

        </div>

        <div className="work-v8-intro-grid">

          <h2 className="work-v8-reveal">

            Built for
            <br />

            <span>
              the real world.
            </span>

          </h2>

          <div className="work-v8-intro-copy work-v8-reveal">

            <ArrowDownRight
              strokeWidth={1.2}
            />

            <p>
              Production websites, client
              projects and interactive
              experiments representing the
              different sides of how I build
              for the web.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          PROJECT COUNTER
      ===================================================== */}

      <div className="work-v8-counter">

        <span>
          Project
        </span>

        <strong
          key={
            projects[
              activeProject
            ].id
          }
        >
          {
            projects[
              activeProject
            ].id
          }
        </strong>

        <small>
          / 04
        </small>

      </div>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <div className="work-v8-projects">

        {projects.map(
          (project, index) => (

            <article
              key={project.id}
              ref={(element) => {
                projectRefs.current[
                  index
                ] = element;
              }}
              className={`
                work-v8-project
                work-v8-project--${project.layout}
                work-v8-project--${project.media}
              `}
            >

              {/* =============================================
                  VISUAL
              ============================================= */}

              <a
                ref={(element) => {
                  visualRefs.current[
                    index
                  ] = element;
                }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="work-v8-visual"
                aria-label={`Visit ${project.title} live website`}
                onPointerEnter={() =>
                  setHoveringProject(true)
                }
                onPointerMove={(event) =>
                  handleProjectMove(
                    event,
                    index
                  )
                }
                onPointerLeave={() => {
                  setHoveringProject(false);
                  resetProject(index);
                }}
              >

                <div className="work-v8-image">

                  <img
                    ref={(element) => {
                      imageRefs.current[
                        index
                      ] = element;
                    }}
                    src={project.image}
                    alt={`${project.title} project presentation`}
                    loading="lazy"
                    decoding="async"
                  />

                </div>

                <div className="work-v8-image-overlay" />

                <div className="work-v8-visual-meta">

                  <span>
                    {project.type}
                  </span>

                  <span>
                    {project.year}
                  </span>

                </div>

                <div className="work-v8-live">

                  <span className="work-v8-live-dot" />

                  Live website

                </div>

                <span className="work-v8-number">
                  {project.id}
                </span>

              </a>

              {/* =============================================
                  INFO
              ============================================= */}

              <div
                ref={(element) => {
                  infoRefs.current[
                    index
                  ] = element;
                }}
                className="work-v8-info"
              >

                <div className="work-v8-title">

                  <span className="work-v8-eyebrow">
                    {project.eyebrow}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <span className="work-v8-context">
                    {project.context}
                  </span>

                </div>

                <div className="work-v8-details">

                  <p>
                    {project.description}
                  </p>

                  <div className="work-v8-services">

                    {project.services.map(
                      (service) => (

                        <span key={service}>
                          {service}
                        </span>

                      )
                    )}

                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-v8-link"
                  >

                    Visit live website

                    <ArrowUpRight
                      strokeWidth={1.35}
                    />

                  </a>

                </div>

              </div>

            </article>

          )
        )}

      </div>

      {/* =====================================================
          END
      ===================================================== */}

      <div className="work-v8-end">

        <div className="work-v8-end-line" />

        <div className="work-v8-end-grid">

          <div>

            <span>
              Selected archive
            </span>

            <p>
              More commercial work,
              experimental builds and case
              studies will be added to the
              full archive.
            </p>

          </div>

          <a href="#about">

            About the developer

            <ArrowUpRight
              strokeWidth={1.2}
            />

          </a>

        </div>

      </div>

      {/* =====================================================
          CURSOR
      ===================================================== */}

      <div
        ref={cursorRef}
        className={`
          work-v8-cursor
          ${
            hoveringProject
              ? 'is-visible'
              : ''
          }
        `}
        aria-hidden="true"
      >

        <span>
          Visit
        </span>

        <ExternalLink
          strokeWidth={1.35}
        />

      </div>

    </section>
  );
}