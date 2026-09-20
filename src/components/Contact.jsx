import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';

import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const markRef = useRef(null);

  const [time, setTime] =
    useState('');

  const [
    formStatus,
    setFormStatus,
  ] = useState('idle');

  /* ========================================================
     LOCAL TIME
  ======================================================== */

  useEffect(() => {
    const formatter =
      new Intl.DateTimeFormat(
        'en-US',
        {
          timeZone:
            'Asia/Karachi',

          hour:
            '2-digit',

          minute:
            '2-digit',

          hour12:
            true,
        }
      );

    const updateTime = () => {
      setTime(
        formatter.format(
          new Date()
        )
      );
    };

    updateTime();

    const interval =
      window.setInterval(
        updateTime,
        30000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, []);

  /* ========================================================
     ABOUT -> CONTACT REVEAL
  ======================================================== */

  useLayoutEffect(() => {
    const stage =
      stageRef.current;

    const section =
      sectionRef.current;

    const about =
      document.querySelector(
        '.about-v1'
      );

    if (
      !stage ||
      !section ||
      !about
    ) {
      return;
    }

    const ctx =
      gsap.context(() => {
        gsap.fromTo(
          stage,
          {
            opacity: 0.18,

            scale: 0.985,

            filter:
              'blur(7px)',
          },
          {
            opacity: 1,

            scale: 1,

            filter:
              'blur(0px)',

            ease: 'none',

            immediateRender:
              false,

            scrollTrigger: {
              trigger: about,

              start:
                'bottom bottom',

              end:
                'bottom top',

              scrub: 0.8,

              invalidateOnRefresh:
                true,
            },
          }
        );

        if (markRef.current) {
          gsap.fromTo(
            markRef.current,
            {
              yPercent: 8,
            },
            {
              yPercent: -3,

              ease: 'none',

              immediateRender:
                false,

              scrollTrigger: {
                trigger: about,

                start:
                  'bottom bottom',

                end:
                  'bottom top',

                scrub: 1.2,
              },
            }
          );
        }
      }, section);

    const frame =
      requestAnimationFrame(
        () => {
          ScrollTrigger.refresh();
        }
      );

    return () => {
      cancelAnimationFrame(
        frame
      );

      ctx.revert();
    };
  }, []);

  /* ========================================================
     BACKGROUND DEPTH
  ======================================================== */

  useEffect(() => {
    const stage =
      stageRef.current;

    const mark =
      markRef.current;

    if (!stage || !mark) {
      return;
    }

    const moveX =
      gsap.quickTo(
        mark,
        'x',
        {
          duration: 1.4,

          ease: 'power3.out',
        }
      );

    const moveY =
      gsap.quickTo(
        mark,
        'y',
        {
          duration: 1.4,

          ease: 'power3.out',
        }
      );

    const handleMove = (
      event
    ) => {
      if (
        window.innerWidth <=
        900
      ) {
        return;
      }

      const rect =
        stage.getBoundingClientRect();

      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;

      moveX(x * 15);

      moveY(y * 8);
    };

    const reset = () => {
      moveX(0);
      moveY(0);
    };

    stage.addEventListener(
      'pointermove',
      handleMove
    );

    stage.addEventListener(
      'pointerleave',
      reset
    );

    return () => {
      stage.removeEventListener(
        'pointermove',
        handleMove
      );

      stage.removeEventListener(
        'pointerleave',
        reset
      );
    };
  }, []);

  /* ========================================================
     FORMSPREE SUBMISSION
  ======================================================== */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (
        formStatus ===
        'submitting'
      ) {
        return;
      }

      const form =
        event.currentTarget;

      const formData =
        new FormData(form);

      setFormStatus(
        'submitting'
      );

      try {
        const response =
          await fetch(
            'https://formspree.io/f/xppwwgoe',
            {
              method: 'POST',
              body: formData,
              headers: {
                Accept: 'application/json',
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            `Formspree returned ${response.status}`
          );
        }

        form.reset();

        setFormStatus(
          'success'
        );
      } catch (error) {
        console.error(
          'Formspree submission failed:',
          error
        );

        setFormStatus(
          'error'
        );
      }
    };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-final"
    >

      <div
        ref={stageRef}
        className="contact-final__stage"
      >

        {/* ================================================
            BACKGROUND
        ================================================= */}

        <div className="contact-final__lines">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div
          ref={markRef}
          className="contact-final__mark"
          aria-hidden="true"
        >
          AS
        </div>


        {/* ================================================
            SHELL
        ================================================= */}

        <div className="contact-final__shell">


          {/* ==============================================
              TOP
          =============================================== */}

          <div className="contact-final__top">

            <div className="contact-final__availability">

              <span className="contact-final__status" />

              <span>
                Available for selected projects
              </span>

            </div>

            <span className="contact-final__location">
              Pakistan / Worldwide
            </span>

          </div>


          {/* ==============================================
              MAIN
          =============================================== */}

          <div className="contact-final__main">


            {/* LEFT */}

            <div className="contact-final__intro">

              <span className="contact-final__label">
                Contact / Start a project
              </span>

              <h2>

                Have something
                <br />

                <span>
                  worth building?
                </span>

              </h2>

              <p>
                Tell me what you&apos;re
                working on. Whether it&apos;s
                a production website,
                redesign, portfolio or
                interactive experience,
                we can figure out the right
                way to build it.
              </p>


              {/* DIRECT CONTACT */}

              <div className="contact-final__direct">

                <a
                  href="mailto:m.Abdullah.tech.dev@gmail.com"
                >

                  <Mail
                    strokeWidth={1.3}
                  />

                  <span>
                    m.Abdullah.tech.dev@gmail.com
                  </span>

                </a>


                <a
                  href="https://wa.me/923247556451"
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <MessageCircle
                    strokeWidth={1.3}
                  />

                  <span>
                    WhatsApp
                  </span>

                </a>


                <a
                  href="tel:+923247556451"
                >

                  <Phone
                    strokeWidth={1.3}
                  />

                  <span>
                    +92 324 7556451
                  </span>

                </a>

              </div>

            </div>


            {/* ==============================================
                FORM
            =============================================== */}

            <div className="contact-final__form-area">

              <div className="contact-final__form-heading">

                <span>
                  Project enquiry
                </span>

                <span>
                  01 — 04
                </span>

              </div>


              {formStatus ===
              'success' ? (

                /* ==========================================
                   SUCCESS
                ========================================== */

                <div className="contact-final__success">

                  <span className="contact-final__success-icon">

                    <Check
                      strokeWidth={1.4}
                    />

                  </span>

                  <span>
                    Message received
                  </span>

                  <h3>

                    Thanks.
                    <br />

                    I&apos;ll be in touch.

                  </h3>

                  <p>
                    Your project enquiry
                    has been sent
                    successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus(
                        'idle'
                      );
                    }}
                  >
                    Send another message
                  </button>

                </div>

              ) : (

                /* ==========================================
                   FORM
                ========================================== */

                <form
                  action="https://formspree.io/f/xppwwgoe"
                  method="POST"
                  className="contact-final__form"
                  onSubmit={
                    handleSubmit
                  }
                >


                  {/* NAME */}

                  <div className="contact-final__field">

                    <label
                      htmlFor="contact-name"
                    >
                      Your name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      autoComplete="name"
                      required
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="contact-final__field">

                    <label
                      htmlFor="contact-email"
                    >
                      Your email
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      autoComplete="email"
                      required
                    />

                  </div>


                  {/* PROJECT TYPE */}

                  <div className="contact-final__field">

                    <label
                      htmlFor="contact-project"
                    >
                      What are we building?
                    </label>

                    <select
                      id="contact-project"
                      name="projectType"
                      defaultValue=""
                      required
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select project type
                      </option>

                      <option value="Website">
                        Website
                      </option>

                      <option value="Website Redesign">
                        Website redesign
                      </option>

                      <option value="Interactive / 3D">
                        Interactive / 3D
                      </option>

                      <option value="Portfolio">
                        Portfolio
                      </option>

                      <option value="SEO / Performance">
                        SEO / Performance
                      </option>

                      <option value="Other">
                        Something else
                      </option>

                    </select>

                  </div>


                  {/* MESSAGE */}

                  <div className="contact-final__field contact-final__field--message">

                    <label
                      htmlFor="contact-message"
                    >
                      Tell me about it
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="A few details about the project, goals and what you need."
                      rows="3"
                      required
                    />

                  </div>


                  {/* ERROR */}

                  {formStatus ===
                    'error' && (

                    <p
                      className="contact-final__error"
                      role="alert"
                    >
                      Something went
                      wrong. Please try
                      again or contact me
                      directly by email.
                    </p>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="contact-final__submit"
                    disabled={
                      formStatus ===
                      'submitting'
                    }
                  >

                    <span>

                      {formStatus ===
                      'submitting'
                        ? 'Sending...'
                        : 'Send enquiry'}

                    </span>

                    <span className="contact-final__submit-icon">

                      <ArrowUpRight
                        strokeWidth={1.4}
                      />

                    </span>

                  </button>

                </form>

              )}

            </div>

          </div>


          {/* ==============================================
              FOOTER
          =============================================== */}

          <div className="contact-final__rule" />

          <div className="contact-final__footer">

            <div className="contact-final__footer-group">

              <span>
                Local time
              </span>

              <strong>
                {time} PKT
              </strong>

            </div>


            <div className="contact-final__footer-group">

              <span>
                Socials
              </span>

              <nav>

                <a
                  href="https://www.linkedin.com/in/mabdullahshahd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/ibtikarzofficial-eng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>

                <a
                  href="https://www.instagram.com/abdullah_shahg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>

              </nav>

            </div>


            <div className="contact-final__footer-signature">

              <span>
                © 2026
              </span>

              <strong>
                Abdullah Shah
              </strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
