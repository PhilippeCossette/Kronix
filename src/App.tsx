import "./App.css";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import TimeLine from "./components/TimeLine";
import scrollToSection from "./utils/scrollToSection";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Header
          subtitle="How we work"
          title="Get a dedicated design team at a fraction of the cost"
          description="Grow your brand with high-quality design for a flat monthly fee. Work with senior designers. Subscribe and make as many requests as you need - no limits."
          buttonText="See Pricing"
          onClick={() => scrollToSection("pricing")}
        />
        <TimeLine
          items={[
            {
              title: "Subscribe & get started",
              description:
                "Submit as many design tasks as you need without worrying about individual project fees.",
              icon: "/icons/Rocket.svg",
            },
            {
              title: "Polished designs - on time",
              description:
                "Our designers get to work to deliver your request. Receive your design within a few days.",
              icon: "/icons/Pencil.svg",
            },
            {
              title: "Revisions made simple",
              description:
                "Custom designs, prompt replies and as many revisions as you need.",
              icon: "/icons/Refresh.svg",
              isLastItem: true,
            },
          ]}
        />
        <Portfolio />
        <Services />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
