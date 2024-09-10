import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CallToActionTwo() {
  return (
    <section id="cta">
      <div className="px-5 lg:px-0">
        <div className="container w-full mx-auto grid items-center justify-between rounded-xl border px-0 md:grid-cols-2">
          <div className="order-2 flex flex-col gap-y-5 p-7 md:order-1 lg:p-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl/tight">
                Ready to get started?
              </h2>
              <p className="max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-base/[1.5] lg:text-base/[1.5] xl:text-lg/[1.5]">
                Join our platform and start your project today!
              </p>
            </div>

            <Button
              className={cn(
                "group relative gap-2 overflow-hidden text-lg font-semibold tracking-tighter w-48",
                "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                "bg-primary hover:bg-primary text-white hover:text-white"
              )}
              size="lg"
              asChild
            >
              <Link href="/register" target="_blank" rel="noopener noreferrer">
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96" />
                <p>Get started</p>
                <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="order-1">
            <Image
              src="https://placehold.co/600x400/png"
              alt="Call to action"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
