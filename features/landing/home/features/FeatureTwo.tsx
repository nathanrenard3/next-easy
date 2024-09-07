"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import Safari from "@/components/magicui/safari";

export const FeatureTwo = () => {
  return (
    <div className="flex h-full transform-gpu flex-col lg:flex-row items-center justify-between gap-0 rounded-lg border border-primary/30 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
      <div className="relative w-full overflow-hidden xl:w-1/2 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-full p-4 sm:p-6 md:p-8 lg:p-10">
        <Safari url="nexteasy.com" className="size-full" />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-y-5 p-4 sm:p-6 md:p-8 lg:p-10 xl:h-full xl:w-1/2">
        <p className="text-sm sm:text-md font-semibold bg-primary py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-lg flex items-center justify-center text-white">
          2
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-primary">
          Powerful Built-in <br className="hidden sm:inline" /> Components
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Leverage our extensive library of pre-built, customizable components
          to accelerate your development process and maintain consistency.
        </p>
        <a
          href="#pricing"
          className={cn(
            "bg-primary text-muted",
            "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-6 py-5 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",
            "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
            "text-base lg:text-lg"
          )}
        >
          Créez votre programme
          <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};
