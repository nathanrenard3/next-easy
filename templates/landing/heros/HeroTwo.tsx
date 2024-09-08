"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/config";
import { Button } from "@/components/ui/button";

const HeroTwo = () => {
  return (
    <section
      id="hero"
      className="bg-background min-h-[92vh] pt-5 lg:pt-16 flex items-center relative overflow-hidden"
    >
      {/* Lights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 opacity-50 md:opacity-100 rounded-full filter blur-[100px] transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 opacity-50 md:opacity-100 rounded-full filter blur-[100px] transform -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/20 opacity-50 md:opacity-100 rounded-full filter blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 tracking-tight">
                {config.landing.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
                {config.landing.hero.description.title}
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Button variant="default" size="lg">
                {config.landing.hero.callToAction.label}
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center lg:justify-end relative"
          >
            <Image
              alt="Application screenshot"
              className="aspect-video object-cover rounded-lg shadow-lg relative z-10"
              height={366}
              src={config.landing.hero.image}
              width={550}
              priority
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroTwo;
