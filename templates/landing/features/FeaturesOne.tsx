"use client";

import { ReactNode } from "react";
import { FadeText } from "@/components/magicui/fade-text";
import Safari from "@/components/magicui/safari";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FeatureProps {
  number: string;
  title: ReactNode;
  description: string;
  reverse?: boolean;
  children?: ReactNode;
}

const FeatureCard = ({
  number,
  title,
  description,
  reverse = false,
  children,
}: FeatureProps) => {
  return (
    <div
      className={cn(
        "flex h-full transform-gpu flex-col lg:flex-row items-center justify-between gap-0 rounded-lg border border-primary/30 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        reverse && "flex-col-reverse lg:flex-row-reverse"
      )}
    >
      <div className="flex w-full flex-col items-start justify-center gap-y-5 p-4 sm:p-6 md:p-8 lg:p-10 xl:h-full xl:w-1/2">
        <p className="text-sm sm:text-md font-semibold bg-primary py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-lg flex items-center justify-center text-white">
          {number}
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-primary">
          {title}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">{description}</p>
        {children}
      </div>
      <div className="relative w-full overflow-hidden xl:w-1/2 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-full p-4 sm:p-6 md:p-8 lg:p-10">
        <Safari url="nexteasy.io" className="size-full" />
      </div>
    </div>
  );
};

const FeaturesOne = () => {
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
      <FeatureCard
        number="1"
        title={
          <>
            Rapid Development <br className="hidden sm:inline" /> with Next.js
          </>
        }
        description="Jumpstart your project with our optimized Next.js boilerplate, designed for lightning-fast development and seamless scalability."
      />
      <FeatureCard
        number="2"
        title={
          <>
            Powerful Built-in <br className="hidden sm:inline" /> Components
          </>
        }
        description="Leverage our extensive library of pre-built, customizable components to accelerate your development process and maintain consistency."
        reverse
      >
        <Link
          href="#pricing"
          className={cn(
            "bg-primary text-muted",
            "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-6 py-5 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",
            "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
            "text-base lg:text-lg"
          )}
        >
          Start now
          <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </FeatureCard>
      <FeatureCard
        number="3"
        title="Optimized for Performance"
        description="Experience blazing-fast load times and improved SEO with our performance-optimized Next.js boilerplate, ensuring your app delivers a superior user experience."
      />
    </section>
  );
};

export default FeaturesOne;
