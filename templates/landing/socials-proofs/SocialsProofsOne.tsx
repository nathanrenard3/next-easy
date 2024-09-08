import { FadeText } from "@/components/magicui/fade-text";
import Image from "next/image";
import { config } from "@/config";

const SocialsProofsOne = () => {
  const { title, description, list } = config.landing.socialsProofs;

  return (
    <div className="container lg:pt-24 lg:pb-12 pt-12">
      <div className="flex flex-col items-center gap-y-2 justify-center mb-3 lg:mb-5 text-center">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={title}
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={description}
        />
      </div>
      <div className="mt-4">
        <section id="partners" className="my-7 lg:my-10">
          <div className="relative mt-4">
            <div className="flex flex-wrap justify-center gap-8">
              {list.map((partner, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Image
                    className="w-[130px] md:w-[200px] h-auto object-contain"
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={100}
                  />
                  <p className="mt-2 text-sm text-gray-600">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SocialsProofsOne;
