import Background from '@/components/Background';
import LoadingScreen from '@/components/LoadingScreen';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Experience from '@/sections/Experience';
import Footer from '@/sections/Footer';
import Hero from '@/sections/Hero';
import Navbar from '@/sections/Navbar';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import HeroV2 from '@/sections/HeroV2';
import { HERO_VERSION } from '@/constants';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Background />
      <div className="content-layer">
        <Navbar />
        <main>
          {HERO_VERSION === 'v2' ? <HeroV2 /> : <Hero />}
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
