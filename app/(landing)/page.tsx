import HeroOne from "@/templates/landing/heros/HeroOne";
import { CallToActionOne } from "@/templates/landing/calls-to-action/CallToActionOne";
import SocialsProofsOne from "@/templates/landing/socials-proofs/SocialsProofsOne";
import { PricingsOne } from "@/templates/landing/pricings/PricingsOne";
import FeaturesOne from "@/templates/landing/features/FeaturesOne";
import StatisticsOne from "@/templates/landing/statistics/StatisticsOne";
import { TestimonialsOne } from "@/templates/landing/testimonials/TestimonialsOne";
import QuestionsOne from "@/templates/landing/questions/QuestionsOne";

async function Page() {
  return (
    <>
      <HeroOne />
      <FeaturesOne />
      <StatisticsOne />
      <TestimonialsOne />
      <PricingsOne />
      <QuestionsOne />
      <SocialsProofsOne />
      <CallToActionOne />
      <div className="h-10"></div> {/* Space between section and footer */}
    </>
  );
}

export default Page;
