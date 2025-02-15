"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";

interface PriceCardProps {
  price: {
    priceId: string;
    name: string;
    price: number;
    description: string;
    features: string[];
  };
  isPopular: boolean;
}

export default function PriceCard({ price, isPopular }: PriceCardProps) {
  const toHumanPrice = (price: number, decimals: number = 2): string => {
    return Number(price / 100).toFixed(decimals);
  };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-4 overflow-hidden rounded-xl p-4 sm:p-6",
        "border border-border bg-white dark:bg-background",
        "text-foreground shadow-sm hover:shadow-md transition-shadow duration-200",
        {
          "border-2 border-primary/75": isPopular,
        }
      )}
    >
      <div className="w-full flex items-center">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-10">{price.name}</h2>
          </div>
          <p className="h-16 text-sm leading-5 text-muted-foreground">
            {price.description}
          </p>
        </div>
      </div>

      {isPopular && (
        <span className="absolute top-3 right-3 inline-block whitespace-nowrap rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-primary-foreground">
          Most popular
        </span>
      )}

      <motion.div
        key={`${price.priceId}`}
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex flex-row items-center gap-1"
      >
        <span className="font-bold text-foreground text-2xl lg:text-4xl">
          {toHumanPrice(price.price)}$
        </span>
      </motion.div>

      <Button
        className={cn(
          "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
          "transform-gpu bg-primary hover:bg-primary ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
          !isPopular &&
            "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        )}
        asChild
      >
        <Link href={`#${price.priceId}`}>
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-foreground opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96" />
          <p>Start fast</p>
        </Link>
      </Button>

      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-muted/0 via-muted to-muted/0" />
      {price.features && price.features.length > 0 && (
        <ul className="flex flex-col gap-2 font-normal">
          {price.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-xs font-medium text-foreground"
            >
              <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-primary p-[2px] text-primary-foreground" />
              <span className="flex">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
