import { FadeText } from "@/components/magicui/fade-text";
import { FeatureOne } from "@/features/landing/home/features/FeatureOne";
import { FeatureTwo } from "@/features/landing/home/features/FeatureTwo";
import { FeatureThree } from "./features/FeatureThree";

const Features = () => {
  return (
    <section id="features" className="container grid gap-12">
      <div className="flex flex-col items-center gap-y-2 justify-center text-center">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="Features"
        />
        <FadeText
          className="scroll-m-96 font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="All you need to start your own project"
        />
      </div>
      <FeatureOne />
      <FeatureTwo />
      <FeatureThree />
    </section>
  );
};

export default Features;
