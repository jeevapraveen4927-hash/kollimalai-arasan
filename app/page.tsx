import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FlavoursGrid from "@/components/FlavoursGrid";
import TrustBadges from "@/components/TrustBadges";
import LowestPrice from "@/components/LowestPrice";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <FlavoursGrid />
      <TrustBadges />
      <LowestPrice />
      <WhyChooseUs />
      <Newsletter />
      <Testimonials />
      <Footer />
    </main>
  );
}
