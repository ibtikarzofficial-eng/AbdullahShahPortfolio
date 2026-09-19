import {
  useEffect,
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
  const stageRef = useRef(null);
  const markRef = useRef(null);
  const submitButtonRef = useRef(null);

  const [time, setTime] = useState('');

  const [formStatus, setFormStatus] =
    useState('idle');

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

    const update = () => {
      setTime(
        formatter.format(
          new Date()
        )
      );
    };

    update();

    const interval =
      window.setInterval(
        update,
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

  useEffect(() => {
    const previousSection =
      document.querySelector(
        '.about-v1'
      );

    const stage =
      stageRef.current;

    if (
      !previousSection ||
      !stage
    ) {
      return;
    }

    gsap.set(stage, {
      opacity: 0,

      scale: 0.985,

      filter:
        'blur(10px)',

      transformOrigin:
        'center center',
    });

    const reveal =
      gsap.to(stage, {
        opacity: 1,

        scale: 1,

        filter:
          'blur(0px)',

        ease: 'none',

        scrollTrigger: {
          trigger:
            previousSection,

          start:
            'bottom bottom',

          end:
            'bottom top',

          scrub: 1,

          invalidateOnRefresh:
            true,
        },
      });

    const markAnimation =
      gsap.fromTo(
        markRef.current,
        {
          yPercent: 10,
        },
        {
          yPercent: -4,

          ease: 'none',

          scrollTrigger: {
            trigger:
              previousSection,

            start:
              'bottom bottom',

            end:
              'bottom top',

            scrub: 1.5,
          },
        }
      );

    ScrollTrigger.refresh();

    return () => {
      reveal.kill();

      markAnimation.kill();
    };
  }, []);

  /* ========================================================
     SUBTLE BACKGROUND DEPTH
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
          duration: 1.5,
          ease: 'power3.out',
        }
      );

    const moveY =
      gsap.quickTo(
        mark,
        'y',
        {
          duration: 1.5,
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

      moveX(x * 18);

      moveY(y * 10);
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
     NETLIFY FORM SUBMIT
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

      const encoded =
        new URLSearchParams();

      formData.forEach(
        (value, key) => {
          encoded.append(
            key,
            String(value)
          );
        }
      );

      setFormStatus(
        'submitting'
      );

      try {
        const response =
          await fetch('/', {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded',
            },

            body:
              encoded.toString(),
          });

        if (!response.ok) {
          throw new Error(
            'Form submission failed.'
          );
        }

        form.reset();

        setFormStatus(
          'success'
        );
      } catch (error) {
        console.error(error);

        setFormStatus(
          'error'
        );
      }
    };

  return (
    <section
      id="contact"
      className="contact-final"
    >
      <div
        ref={stageRef}
        className="contact-final__stage"
      >
        {/* BACKGROUND */}

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

        {/* SHELL */}

        <div className="contact-final__shell">

          {/* TOP */}

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

          {/* MAIN */}

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

              <div className="contact-final__direct">

                <a
                  href="mailto:m.Abdullah.tech.dev@gmail.com"
                >
                  <Mail
                    strokeWidth={
                      1.3
                    }
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
                    strokeWidth={
                      1.3
                    }
                  />

                  <span>
                    WhatsApp
                  </span>
                </a>

                <a
                  href="tel:+923247556451"
                >
                  <Phone
                    strokeWidth={
                      1.3
                    }
                  />

                  <span>
                    +92 324 7556451
                  </span>
                </a>

              </div>

            </div>

            {/* FORM */}

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

                <div className="contact-final__success">

                  <span className="contact-final__success-icon">

                    <Check
                      strokeWidth={
                        1.4
                      }
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
                    onClick={() =>
                      setFormStatus(
                        'idle'
                      )
                    }
                  >
                    Send another message
                  </button>

                </div>

              ) : (

                <form
                  name="project-enquiry"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="contact-final__form"
                  onSubmit={
                    handleSubmit
                  }
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="project-enquiry"
                  />

                  <p className="contact-final__honeypot">

                    <label>
                      Do not fill this
                      field

                      <input
                        name="bot-field"
                      />
                    </label>

                  </p>

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

                  <button
                    ref={
                      submitButtonRef
                    }
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
                        strokeWidth={
                          1.4
                        }
                      />

                    </span>

                  </button>

                </form>

              )}

            </div>

          </div>

          {/* FOOTER */}

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