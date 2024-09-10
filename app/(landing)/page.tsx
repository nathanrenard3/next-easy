import HeroOne from "@/templates/landing/heros/HeroOne";
import SocialsProofsOne from "@/templates/landing/socials-proofs/SocialsProofsOne";
import { PricingsOne } from "@/templates/landing/pricings/PricingsOne";
import StatisticsOne from "@/templates/landing/statistics/StatisticsOne";
import { TestimonialsOne } from "@/templates/landing/testimonials/TestimonialsOne";
import QuestionsOne from "@/templates/landing/questions/QuestionsOne";
import FeaturesTwo from "@/templates/landing/features/FeaturesTwo";
import { CallToActionTwo } from "@/templates/landing/calls-to-action/CallToActionTwo";

async function Page() {
  return (
    <div className="-my-24">
      <HeroOne />
      <FeaturesTwo />
      <StatisticsOne />
      <TestimonialsOne />
      <PricingsOne />
      <QuestionsOne />
      <SocialsProofsOne />
      <CallToActionTwo />
    </div>
  );
}

export default Page;
