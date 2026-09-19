import {
  useCallback,
  useState,
} from 'react';

import Loader from './components/Loader.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [heroReady, setHeroReady] =
    useState(false);

  const [
    loaderFinished,
    setLoaderFinished,
  ] = useState(false);

  const startHero =
    useCallback(() => {
      setHeroReady(true);
    }, []);

  const finishLoader =
    useCallback(() => {
      setLoaderFinished(true);
    }, []);

  return (
    <main className="site-shell">

      <Hero
        ready={heroReady}
      />

      <Work />

      <About />

      <Contact />

      {!loaderFinished && (
        <Loader
          onRevealStart={
            startHero
          }
          onComplete={
            finishLoader
          }
        />
      )}

    </main>
  );
}