import PriceCard from "@/components/customs/PriceCard";
import { FadeText } from "@/components/magicui/fade-text";
import { config } from "@/config";

export function PricingsOne() {
  const pricing = config.stripe.products;
  const { title, description } = config.landing.pricings;

  return (
    <section id="pricing" className="container relative w-full">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 md:gap-8 px-4 py-14 md:px-8">
        <div className="flex flex-col items-center gap-y-2 justify-center text-center">
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

        <div className="mt-8 w-full">
          <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pricing.map((price) => (
              <PriceCard
                key={price.priceId}
                price={price}
                isPopular={price.mostPopular}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-36 md:top-24 -end-20 -z-10 w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
          <div className="w-48 h-48 rounded-lg bg-background/10" />
        </div>
        <div className="absolute bottom-12 -start-20 -z-10 w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-full">
          <div className="w-48 h-48 rounded-full bg-background/10" />
        </div>
      </div>
    </section>
  );
}
