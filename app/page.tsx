import Image from "next/image";
import AboutContent from "./components/AboutContent";
import ScrollSection from "./components/ScrollSection";
import CardSlider from "./components/CardSlider";
import NavBar from "./components/NavBar";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <ScrollSection />
      <AboutContent />
      <div className="py-16">
        <CardSlider 
          autoPlay={true}
          showArrows={true}
          showDots={true}
        />
      </div>
      <FAQ />
    </div>
  );
}
