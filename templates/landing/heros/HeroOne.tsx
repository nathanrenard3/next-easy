"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import Particles from "@/components/magicui/particles";
import Safari from "@/components/magicui/safari";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
const HeroOne = () => {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden pb-10 pt-6 lg:pt-4">
        <div className="container z-10 flex flex-col items-center">
          <div className="mt-6 lg:mt-10 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8 text-center">
              <motion.h1
                ref={fadeInRef}
                className="scroll-m-20 leading-tight text-3xl font-extrabold lg:text-6xl text-primary uppercase"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                The best boilerplate to start your project easily and quickly
              </motion.h1>

              <motion.p
                className="text-balance tracking-tight text-gray-400 text-base lg:text-lg mb-2"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Kickstart your project with our optimized Next.js boilerplate,
                built to{" "}
                <span className="inline-block sm:inline bg-primary/25 px-2 py-1 rounded-md text-primary font-semibold mt-2 sm:mt-0">
                  accelerate development
                </span>{" "}
                <span className="inline-block sm:inline mt-2 sm:mt-0">
                  and provide the tools you need for scalable applications.
                </span>
              </motion.p>

              <motion.div
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                className="flex flex-col gap-4 lg:flex-row"
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                <a
                  href="#pricing"
                  className={cn(
                    // colors
                    "bg-primary text-muted",

                    // layout
                    "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-6 py-5 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",

                    // animation
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",

                    // texts
                    "text-sm lg:text-base"
                  )}
                >
                  Discover our offers
                  <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
          <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            initial={false}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
            className="relative flex mt-2 lg:mt-14 h-full lg:w-10/12 rounded-xl after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_0.5%,transparent)] sm:after:[background:linear-gradient(to_top,#fff_10%,transparent)]"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)] -z-10",

                // light styles
                "[background-image:linear-gradient(to_bottom,#1D283A,transparent_20%)]"
              )}
            />

            <Safari url={url} className="size-full" />

            <BorderBeam
              colorFrom="#1D283A"
              colorTo="#1D283A"
              size={250}
              delay={9}
              duration={12}
            />
          </motion.div>
        </div>

        <Particles
          className="absolute inset-0 -z-10 opacity-50 lg:opacity-100"
          quantity={250}
          ease={80}
          size={0.7}
          color={"1D283A"}
          refresh
        />
      </div>
    </section>
  );
};

export default HeroOne;