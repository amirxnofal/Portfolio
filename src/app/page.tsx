import Navigation from "@/components/navigation";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import About from "@/components/about";
import TechStack from "@/components/tech-stack";
import BackendApproach from "@/components/backend-approach";
import Projects from "@/components/projects";
import GithubBand from "@/components/github-band";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navigation />

      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <TechStack />
        <BackendApproach />
        <Projects />
        <GithubBand />
        <Contact />
      </main>

      <Footer />
    </>
  );
}