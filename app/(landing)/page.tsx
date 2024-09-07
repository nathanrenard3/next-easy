import HeroSection from "@/features/landing/home/HeroSection";
import Features from "@/features/landing/home/Features";
import { Testimonials } from "@/features/landing/home/Testimonials";
import { Pricing } from "@/features/landing/home/Pricing";
import Questions from "@/features/landing/home/Questions";
import { CallToAction } from "@/features/landing/home/CallToAction";
import Partners from "@/features/landing/home/Partners";
import Statistics from "@/features/landing/home/Statistics";

async function Page() {
  return (
    <>
      <HeroSection />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricing />
      <Questions />
      <Partners />
      <CallToAction />
      <div className="h-10"></div> {/* Space between section and footer */}
    </>
  );
}

export default Page;
