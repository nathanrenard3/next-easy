"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import Particles from "@/components/magicui/particles";
import Safari from "@/components/magicui/safari";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const HeroOne = () => {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const [url, setUrl] = useState("");
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  useEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme);
  }, [theme, systemTheme]);

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

  const getParticleColor = () => {
    return currentTheme === "dark" ? "#ffffff" : "hsl(var(--primary))";
  };

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden pb-16 pt-24 lg:pt-32">
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
                className="text-balance tracking-tight text-muted-foreground text-base lg:text-lg mb-2"
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
                built to accelerate development and provide the tools you need
                for scalable applications.
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
                <Link
                  href={"#features"}
                  className={cn(
                    "bg-primary text-primary-foreground",
                    "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-6 py-5 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",
                    "transform-gpu ring-offset-background transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                    "text-sm lg:text-base"
                  )}
                >
                  Get started
                  <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
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
            className="relative flex mt-2 lg:mt-14 h-full lg:w-10/12 rounded-xl after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,var(--background)_0.5%,transparent)] sm:after:[background:linear-gradient(to_top,var(--background)_10%,transparent)]"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)] -z-10",
                currentTheme === "dark"
                  ? "bg-gradient-to-b from-white/20 to-transparent"
                  : "bg-gradient-to-b from-primary/20 to-transparent"
              )}
            />

            <Safari
              url={url}
              className="size-full"
              src="https://placehold.co/1920x1080?text=Hero+Image"
            />

            <BorderBeam
              colorFrom={
                currentTheme === "dark" ? "#ffffff" : "hsl(var(--primary))"
              }
              colorTo={
                currentTheme === "dark" ? "#ffffff" : "hsl(var(--primary))"
              }
              size={250}
              delay={9}
              duration={12}
            />
          </motion.div>
        </div>

        {currentTheme && (
          <Particles
            className="absolute inset-0 -z-10 opacity-50 lg:opacity-100"
            quantity={150}
            ease={80}
            size={0.7}
            color={getParticleColor()}
            refresh={currentTheme === "dark"}
          />
        )}
      </div>
    </section>
  );
};

export default HeroOne;
