import { CallToAction } from "@/templates/landing/CallToAction";
import Features from "@/templates/landing/Features";
import Hero from "@/templates/landing/Hero";
import { Pricings } from "@/templates/landing/Pricings";
import Questions from "@/templates/landing/Questions";
import SocialsProofs from "@/templates/landing/SocialsProofs";
import Statistics from "@/templates/landing/Statistics";
import { Testimonials } from "@/templates/landing/Testimonials";

async function Page() {
  return (
    <div className="-my-24">
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricings />
      <Questions />
      <SocialsProofs />
      <CallToAction />
    </div>
  );
}

export default Page;
