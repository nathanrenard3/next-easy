import { FadeText } from "@/components/magicui/fade-text";
import Image from "next/image";

const SocialsProofs = () => {
  const partners = [
    {
      name: "Example Tech 1",
      logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Tech+1",
    },
    {
      name: "Example Software 2",
      logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Software+2",
    },
    {
      name: "Example Dev 3",
      logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Dev+3",
    },
    {
      name: "Example Cloud 4",
      logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Cloud+4",
    },
    {
      name: "Example AI 5",
      logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+AI+5",
    },
  ];

  return (
    <div className="container py-10 lg:py-20">
      <div className="flex flex-col items-center gap-y-2 justify-center mb-3 lg:mb-5 text-center">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="Our Partners"
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="Innovating Together for the Future"
        />
      </div>
      <div className="mt-4">
        <section id="partners" className="my-7 lg:my-10">
          <div className="relative mt-4">
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((partner, idx) => (
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

export default SocialsProofs;
