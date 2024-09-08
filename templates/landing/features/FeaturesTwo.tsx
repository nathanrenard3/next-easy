"use client";

import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { config } from "@/config";
import { FadeText } from "@/components/magicui/fade-text";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cn(
        "mt-px overflow-hidden focus-within:relative focus-within:z-10",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          "group flex h-[45px] flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = {
  children: ReactNode;
  className?: string;
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cn(
        "overflow-hidden text-[15px] font-medium data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-5 py-2">{children}</div>
    </Accordion.Content>
  )
);
AccordionContent.displayName = "AccordionContent";

type CardDataProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  callToAction: {
    label: string;
    href: string;
  } | null;
};

const cardData: CardDataProps[] = config.landing.features.list.map(
  (feature, index) => ({
    id: index + 1,
    title: feature.title,
    description: feature.description,
    image: feature.image,
    callToAction: feature.callToAction || null,
  })
);

type FeatureProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: "left" | "right";
};

const Feature = ({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
}: FeatureProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const carouselRef = useRef<HTMLUListElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex !== undefined ? (prevIndex + 1) % cardData.length : 0
      );
    }, collapseDelay);

    return () => clearInterval(timer);
  }, [currentIndex, collapseDelay]);

  useEffect(() => {
    const handleAutoScroll = () => {
      const nextIndex = (currentIndex + 1) % cardData.length;
      if (carouselRef.current) {
        const card = carouselRef.current.querySelectorAll(".card")[nextIndex];
        if (card) {
          card.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
      }
    };

    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

    return () => clearInterval(autoScrollTimer);
  }, [currentIndex, collapseDelay]);

  return (
    <section ref={ref} id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <FadeText
            className="font-bold text-primary uppercase text-base lg:text-lg"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={config.landing.features.title}
          />
          <FadeText
            className="scroll-m-96 font-extrabold tracking-tight text-2xl lg:text-5xl"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={config.landing.features.description}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className={`md:col-span-2 ${ltr ? "md:order-2" : "md:order-1"}`}>
            <Accordion.Root
              className="w-full"
              type="single"
              defaultValue={`item-${currentIndex}`}
              value={`item-${currentIndex}`}
              onValueChange={(value) =>
                setCurrentIndex(Number(value.split("-")[1]))
              }
            >
              {cardData.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  className="relative mb-8 last:mb-0"
                  value={`item-${index}`}
                >
                  <div
                    className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30 ${
                      linePosition === "right"
                        ? "left-auto right-0"
                        : "left-0 right-auto"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 w-full ${
                        currentIndex === index ? "h-full" : "h-0"
                      } origin-top bg-neutral-500 transition-all ease-linear dark:bg-white`}
                      style={{
                        transitionDuration:
                          currentIndex === index ? `${collapseDelay}ms` : "0s",
                      }}
                    ></div>
                  </div>
                  <AccordionTrigger className="text-xl font-bold">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.description}
                    {item.callToAction && (
                      <Link
                        href={item.callToAction.href}
                        className={cn(
                          "bg-primary text-muted my-3",
                          "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-6 py-5 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",
                          "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                          "text-base lg:text-lg"
                        )}
                      >
                        {item.callToAction.label}
                        <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion.Root>
          </div>
          <div className={`md:col-span-3 ${ltr ? "md:order-1" : "md:order-2"}`}>
            <div className="h-[400px] w-full relative">
              {cardData[currentIndex]?.image && (
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Image
                    src={cardData[currentIndex].image}
                    alt="feature"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-xl border border-neutral-300/50"
                    unoptimized
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function FeaturesTwo() {
  return <Feature collapseDelay={5000} linePosition="left" />;
}

export default FeaturesTwo;
