"use client";

import { FadeText } from "@/components/magicui/fade-text";
import NumberTicker from "@/components/magicui/number-ticker";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { config } from "@/config";

export const StatisticsOne = () => {
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
          text={config.landing.statistics.title}
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={config.landing.statistics.description}
        />
      </div>
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-24"
      >
        {config.landing.statistics.list.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <span className="text-4xl lg:text-6xl font-bold text-primary mb-2">
              <NumberTicker
                value={parseInt(stat.description)}
                direction="up"
                className="text-primary"
              />
              {stat.suffix && <span>{stat.suffix}</span>}
            </span>
            <span className="text-sm lg:text-base text-gray-600">
              {stat.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsOne;
