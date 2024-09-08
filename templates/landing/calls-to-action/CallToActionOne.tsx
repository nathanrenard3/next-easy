import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Rocket } from "lucide-react";
import Link from "next/link";
import { config } from "@/config";

export function CallToActionOne() {
  const { title, description, callToAction } = config.landing.callToAction;

  return (
    <section id="cta">
      <div className="container px-5 lg:px-0">
        <div className="flex w-full flex-col items-center justify-center p-4">
          <div className="relative bg-primary flex w-full h-96 flex-col items-center justify-center overflow-hidden rounded-[2rem] border">
            <div className="z-10">
              <div className="mx-auto size-24 rounded-[2rem] border-4 bg-primary p-3 shadow-2xl lg:size-32">
                <Rocket className="mx-auto size-16 text-white lg:size-24" />
              </div>
              <h1 className="text-2xl font-bold lg:text-4xl text-white my-5 max-w-2xl text-center">
                {title}
              </h1>
              <p className="text-white text-center text-lg">{description}</p>
              <div className="z-10 mt-4 flex flex-col items-center text-center text-primary">
                <Button
                  className={cn(
                    "group relative gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2",
                    "bg-white hover:bg-white border-2 border-primary text-primary hover:text-primary"
                  )}
                  asChild
                >
                  <Link
                    href={callToAction.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96" />
                    <p>{callToAction.label}</p>

                    <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 z-0">
              <Particles quantity={150} ease={80} size={0.8} refresh />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
