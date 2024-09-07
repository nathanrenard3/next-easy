"use client";

import Safari from "@/components/magicui/safari";

export const FeatureThree = () => {
  return (
    <div className="flex h-full transform-gpu flex-col-reverse lg:flex-row items-center justify-between gap-0 rounded-lg border border-primary/30 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
      <div className="flex w-full flex-col items-start justify-center gap-y-5 p-4 sm:p-6 md:p-8 lg:p-10 xl:h-full xl:w-1/2">
        <p className="text-sm sm:text-md font-semibold bg-primary py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-lg flex items-center justify-center text-white">
          3
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-primary">
          Optimized for Performance
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Experience blazing-fast load times and improved SEO with our
          performance-optimized Next.js boilerplate, ensuring your app delivers
          a superior user experience.
        </p>
      </div>
      <div className="relative w-full overflow-hidden xl:w-1/2 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-full p-4 sm:p-6 md:p-8 lg:p-10">
        <Safari url="nexteasy.io" className="size-full" />
      </div>
    </div>
  );
};
