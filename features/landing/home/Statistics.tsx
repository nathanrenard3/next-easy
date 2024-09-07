"use client";

import { FadeText } from "@/components/magicui/fade-text";
import NumberTicker from "@/components/magicui/number-ticker";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const statistics = [
  {
    value: 7,
    label: "Hours saved on initial project setup",
    suffix: "+",
  },
  {
    value: 30,
    label: "Pre-built components ready to use",
    suffix: "+",
  },
  {
    value: 50,
    label: "Faster development time",
    suffix: "%",
  },
  {
    value: 99,
    label: "Lighthouse score for performance",
    suffix: "",
  },
];

export const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  return (
    <section id="statistics" className="container py-24">
      <div className="flex flex-col items-center gap-y-2 justify-center text-center mb-12">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="Key Metrics"
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="The Impact of Our Next.js Boilerplate"
        />
      </div>
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-4xl lg:text-6xl font-bold text-primary mb-2">
              <NumberTicker
                value={stat.value}
                direction="up"
                className="text-primary"
              />
              {stat.suffix}
            </span>
            <span className="text-sm lg:text-base text-gray-600">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
