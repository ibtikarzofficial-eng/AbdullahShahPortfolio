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
  GraduationCap,
} from 'lucide-react';

import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: '01',
    company: 'CoreMint Labs',
    role: 'Website Developer & SEO Specialist',
    location: 'Remote',
    date: 'Aug 2026 — Present',
    description:
      'Building and optimizing production websites for client businesses, combining responsive implementation with technical SEO, performance, usability and ongoing site management.',
    details: [
      'WordPress / Elementor / Astra',
      'Technical & On-Page SEO',
      'Responsive Development',
      'Performance & Site Health',
    ],
  },

  {
    id: '02',
    company: 'Jupiter Advisers',
    role: 'Web Developer',
    location: 'Islamabad, Pakistan · Remote',
    date: 'Apr 2026 — Present',
    description:
      'Developed and launched a production website for a visa consultancy while supporting lead-generation, assessment, webinar and marketing workflows across the platform.',
    details: [
      'Custom WordPress',
      'Tailwind CSS / JavaScript',
      'Lead & Assessment Flows',
      'Cloudflare / DNS / cPanel',
    ],
  },

  {
    id: '03',
    company: 'DataMeld',
    role: 'Web Developer & Digital Designer',
    location: 'United Kingdom · Remote',
    date: 'Nov 2024 — Feb 2025',
    description:
      'Delivered responsive websites and digital assets for a UK-based client, translating business requirements into practical interfaces across the complete delivery cycle.',
    details: [
      'Front-End Development',
      'Responsive UI',
      'Digital Design',
      'Client Delivery',
    ],
  },
];

const skillGroups = [
  {
    id: '01',
    title: 'Front-End Development',
    description:
      'Production interfaces built around responsiveness, maintainability and interaction.',
    skills: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'GSAP',
    ],
  },

  {
    id: '02',
    title: 'Creative & 3D Web',
    description:
      'Interactive browser experiences that use motion and real-time graphics with purpose.',
    skills: [
      'Three.js',
      'React Three Fiber',
      'WebGL',
      'Interactive UI',
      'Motion',
    ],
  },

  {
    id: '03',
    title: 'CMS & Production',
    description:
      'Real client websites built, maintained and shipped across practical production platforms.',
    skills: [
      'WordPress',
      'Elementor',
      'Astra',
      'Duda',
      'Custom Themes',
    ],
  },

  {
    id: '04',
    title: 'SEO & Performance',
    description:
      'Technical foundations that improve discovery, speed, structure and long-term site health.',
    skills: [
      'Technical SEO',
      'On-Page SEO',
      'Page Speed',
      'Metadata',
      'Internal Linking',
      'Search Console',
    ],
  },

  {
    id: '05',
    title: 'Web Operations',
    description:
      'The infrastructure work required to keep production websites available, secure and maintainable.',
    skills: [
      'Cloudflare',
      'DNS',
      'cPanel',
      'GoDaddy',
      'Deployments',
      'Backups',
    ],
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const progressRef = useRef(null);

  const experienceRefs = useRef([]);
  const skillRefs = useRef([]);

  const [activeExperience, setActiveExperience] =
    useState(0);

  /* ========================================================
     INTRO + GENERAL REVEALS
  ======================================================== */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-v1-reveal',
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
            trigger: '.about-v1-intro',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.about-v1-education',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 1,

          ease: 'power4.out',

          scrollTrigger: {
            trigger: '.about-v1-education',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.about-v1-skills-heading > *',
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 0.9,

          stagger: 0.08,

          ease: 'power4.out',

          scrollTrigger: {
            trigger: '.about-v1-skills',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ========================================================
     EXPERIENCE ACTIVATION
  ======================================================== */

  useEffect(() => {
    const triggers = [];

    experienceRefs.current.forEach(
      (element, index) => {
        if (!element) return;

        const trigger = ScrollTrigger.create({
          trigger: element,

          start: 'top 55%',
          end: 'bottom 45%',

          onEnter: () =>
            setActiveExperience(index),

          onEnterBack: () =>
            setActiveExperience(index),
        });

        triggers.push(trigger);

        gsap.fromTo(
          element,
          {
            y: 45,
            opacity: 0.35,
          },
          {
            y: 0,
            opacity: 1,

            duration: 1,

            ease: 'power3.out',

            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
            },
          }
        );
      }
    );

    return () => {
      triggers.forEach((trigger) =>
        trigger.kill()
      );
    };
  }, []);

  /* ========================================================
     STICKY PROGRESS
  ======================================================== */

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.fromTo(
      progressRef.current,
      {
        y: 10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,

        duration: 0.35,

        ease: 'power3.out',
      }
    );
  }, [activeExperience]);

  /* ========================================================
     PORTRAIT PARALLAX
  ======================================================== */

  useEffect(() => {
    if (!portraitRef.current) return;

    const tween = gsap.fromTo(
      portraitRef.current,
      {
        yPercent: -4,
      },
      {
        yPercent: 7,

        ease: 'none',

        scrollTrigger: {
          trigger: '.about-v1-experience',
          start: 'top bottom',
          end: 'bottom top',

          scrub: 1.5,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  /* ========================================================
     SKILLS REVEAL
  ======================================================== */

  useEffect(() => {
    const animations = [];

    skillRefs.current.forEach(
      (element, index) => {
        if (!element) return;

        const animation = gsap.fromTo(
          element,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,

            duration: 0.85,

            delay: index * 0.03,

            ease: 'power3.out',

            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );

        animations.push(animation);
      }
    );

    return () => {
      animations.forEach((animation) =>
        animation.kill()
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-v1"
    >
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="about-v1-intro">

        <div className="about-v1-intro-meta about-v1-reveal">

          <span>
            About / Experience
          </span>

          <span>
            2024 — Present
          </span>

        </div>

        <div className="about-v1-intro-grid">

          <h2 className="about-v1-reveal">
            I work where
            <br />
            <span>
              design, code
            </span>
            <br />
            and execution meet.
          </h2>

          <div className="about-v1-intro-copy about-v1-reveal">

            <ArrowDownRight
              strokeWidth={1.25}
            />

            <p>
              I&apos;m Abdullah Shah, a developer
              focused on building digital experiences
              that are visually considered,
              technically reliable and ready for
              production.
            </p>

            <p>
              My work moves between creative
              front-end development, WordPress,
              interactive 3D, technical SEO,
              performance and the infrastructure
              behind real websites.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <div className="about-v1-experience">

        {/* STICKY SIDE */}

        <aside className="about-v1-profile">

          <div className="about-v1-profile-sticky">

            <div className="about-v1-profile-image">

              <div
                ref={portraitRef}
                className="about-v1-profile-image-inner"
              >
                <img
                  src="/abdullah-hero.png"
                  alt="Abdullah Shah"
                />
              </div>

            </div>

            <div className="about-v1-profile-bottom">

              <div className="about-v1-profile-name">

                <strong>
                  Abdullah Shah
                </strong>

                <span>
                  Creative Developer
                </span>

              </div>

              <div className="about-v1-profile-index">

                <span
                  ref={progressRef}
                  key={activeExperience}
                >
                  {experiences[
                    activeExperience
                  ].id}
                </span>

                <span>
                  / {String(
                    experiences.length
                  ).padStart(2, '0')}
                </span>

              </div>

            </div>

          </div>

        </aside>

        {/* EXPERIENCE LIST */}

        <div className="about-v1-experience-list">

          <div className="about-v1-section-heading">

            <span>
              Experience
            </span>

            <span>
              Selected professional work
            </span>

          </div>

          {experiences.map(
            (experience, index) => (
              <article
                key={experience.company}
                ref={(element) => {
                  experienceRefs.current[
                    index
                  ] = element;
                }}
                className={`about-v1-role ${
                  activeExperience === index
                    ? 'is-active'
                    : ''
                }`}
              >

                <div className="about-v1-role-top">

                  <span className="about-v1-role-number">
                    {experience.id}
                  </span>

                  <span className="about-v1-role-date">
                    {experience.date}
                  </span>

                </div>

                <h3>
                  {experience.company}
                </h3>

                <div className="about-v1-role-position">

                  <span>
                    {experience.role}
                  </span>

                  <span>
                    {experience.location}
                  </span>

                </div>

                <p>
                  {experience.description}
                </p>

                <div className="about-v1-role-details">

                  {experience.details.map(
                    (detail) => (
                      <span key={detail}>
                        {detail}
                      </span>
                    )
                  )}

                </div>

              </article>
            )
          )}

        </div>

      </div>

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <div className="about-v1-education">

        <div className="about-v1-education-icon">

          <GraduationCap
            strokeWidth={1.25}
          />

        </div>

        <div className="about-v1-education-main">

          <span className="about-v1-education-label">
            Education
          </span>

          <h3>
            Bachelor of Science in
            <br />
            Information Technology
          </h3>

          <div className="about-v1-education-university">

            <strong>
              University of Mianwali
            </strong>

            <span>
              2021 — 2025
            </span>

          </div>

        </div>

        <div className="about-v1-education-result">

          <span>
            CGPA
          </span>

          <strong>
            3.85
          </strong>

          <small>
            / 4.00
          </small>

        </div>

        <div className="about-v1-education-award">

          <span>
            Recognition
          </span>

          <strong>
            University Gold Medalist
          </strong>

        </div>

      </div>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <div className="about-v1-skills">

        <div className="about-v1-skills-heading">

          <span>
            Capabilities / Stack
          </span>

          <h2>
            Tools change.
            <br />
            <span>
              The standard doesn&apos;t.
            </span>
          </h2>

          <p>
            I choose technology around the
            experience, the business problem and
            what needs to survive in production.
          </p>

        </div>

        <div className="about-v1-skills-list">

          {skillGroups.map(
            (group, index) => (
              <article
                key={group.title}
                ref={(element) => {
                  skillRefs.current[
                    index
                  ] = element;
                }}
                className="about-v1-skill"
              >

                <span className="about-v1-skill-number">
                  {group.id}
                </span>

                <div className="about-v1-skill-title">

                  <h3>
                    {group.title}
                  </h3>

                  <ArrowUpRight
                    strokeWidth={1.2}
                  />

                </div>

                <p>
                  {group.description}
                </p>

                <div className="about-v1-skill-stack">

                  {group.skills.map(
                    (skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </article>
            )
          )}

        </div>

      </div>

      {/* =====================================================
          END STATEMENT
      ===================================================== */}

      <div className="about-v1-ending">

        <span>
          Approach
        </span>

        <p>
          Make it distinctive.
          <br />
          Make it useful.
          <br />
          <strong>
            Make it work.
          </strong>
        </p>

      </div>

    </section>
  );
}