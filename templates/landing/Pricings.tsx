import PriceCard from "@/components/ui/price-card";
import { FadeText } from "@/components/magicui/fade-text";
import { config } from "@/config";

export function Pricings() {
  const { products } = config.stripe;
  return (
    <section id="pricing" className="relative container my-10 lg:my-20">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 md:gap-8 px-4 py-14 md:px-8">
        <div className="flex flex-col items-center gap-y-2 justify-center text-center">
          <FadeText
            className="font-bold text-primary uppercase text-base lg:text-lg"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="Pricing"
          />
          <FadeText
            className="font-extrabold tracking-tight text-2xl lg:text-5xl text-foreground"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="Choose the plan that best suits your needs"
          />
        </div>

        <div className="mt-8 w-full">
          <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((price) => (
              <PriceCard
                key={price.priceId}
                price={price}
                isPopular={price.mostPopular}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-36 md:top-24 -end-20 -z-10 w-48 h-48 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent p-px rounded-lg opacity-20">
          <div className="w-48 h-48 rounded-lg bg-background/10 dark:bg-background/20" />
        </div>
        <div className="absolute bottom-12 -start-20 -z-10 w-48 h-48 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent p-px rounded-full opacity-20">
          <div className="w-48 h-48 rounded-full bg-background/10 dark:bg-background/20" />
        </div>
      </div>
    </section>
  );
}
