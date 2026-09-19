import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const words = [
  { text: 'Bonjour', x: 17, y: 22, rotate: -3 },
  { text: 'مرحبا', x: 70, y: 18, rotate: 3 },
  { text: 'Hola', x: 82, y: 38, rotate: -2 },
  { text: 'ہیلو', x: 11, y: 47, rotate: 2 },
  { text: 'Ciao', x: 24, y: 73, rotate: -2 },
  { text: 'Hallo', x: 67, y: 72, rotate: 2 },
  { text: 'こんにちは', x: 46, y: 15, rotate: 0 },
  { text: 'Olá', x: 84, y: 69, rotate: 2 },
  { text: 'नमस्ते', x: 42, y: 82, rotate: -2 },
  { text: '你好', x: 6, y: 78, rotate: 2 },
  { text: 'Salut', x: 75, y: 56, rotate: -1 },
  { text: 'Merhaba', x: 27, y: 35, rotate: 2 },
  { text: 'Привет', x: 56, y: 31, rotate: -2 },
  { text: '안녕하세요', x: 88, y: 16, rotate: 1 },
  { text: 'Salam', x: 7, y: 17, rotate: -1 },
  { text: 'Hej', x: 56, y: 69, rotate: 2 },
  { text: 'Γεια', x: 34, y: 57, rotate: -2 },
  { text: 'Ahoj', x: 90, y: 87, rotate: 1 },
  { text: 'Sawubona', x: 13, y: 91, rotate: -1 },
  { text: 'Namaste', x: 67, y: 90, rotate: 2 },
];

export default function Loader({
  onRevealStart,
  onComplete,
}) {
  const loaderRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete,
      });

      /*
       * Main Hello.
       */
      tl.fromTo(
        '.loader-main-word',
        {
          opacity: 0,
          scale: 0.88,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        }
      );

      /*
       * Languages appear around Hello one-by-one.
       */
      tl.fromTo(
        '.loader-cloud-word',
        {
          opacity: 0,
          scale: 0.78,
          y: 16,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,

          duration: 0.5,

          stagger: 0.105,

          ease: 'power3.out',
        },
        '-=0.12'
      );

      /*
       * Final loaded state.
       */
      tl.to(
        '.loader-main-word',
        {
          scale: 1.07,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );

      tl.to(
        '.loader-cloud-word',
        {
          opacity: 0.48,
          scale: 1.025,

          duration: 0.5,

          ease: 'power2.out',
        },
        '<'
      );

      /*
       * CRITICAL CHANGE:
       *
       * Start hero BEFORE loader moves away.
       */
      tl.call(() => {
        onRevealStart?.();
      });

      /*
       * Give hero just enough time to begin moving
       * underneath the loader.
       */
      tl.to(
        {},
        {
          duration: 0.12,
        }
      );

      /*
       * Reveal hero.
       */
      tl.to(
        loaderRef.current,
        {
          yPercent: -100,

          borderBottomLeftRadius: '48% 8%',
          borderBottomRightRadius: '48% 8%',

          duration: 1.35,

          ease: 'power4.inOut',
        }
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [onRevealStart, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="loader-v4"
      aria-hidden="true"
    >
      <div className="loader-language-cloud">
        {words.map((item, index) => (
          <span
            key={`${item.text}-${index}`}
            className="loader-cloud-word"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="loader-center-v4">
        <span className="loader-main-word">
          Hello
        </span>

        <span className="loader-progress-copy">
          Loading portfolio
        </span>
      </div>
    </div>
  );
}