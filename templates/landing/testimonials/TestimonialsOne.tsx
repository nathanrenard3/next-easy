import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { FadeText } from "@/components/magicui/fade-text";
import { config } from "@/config"; // Import the config

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: string; // Changed to string to match config
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      "border border-neutral-200 bg-white",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description.split(". ").map((sentence, index) => (
        <p key={index}>
          {sentence.includes("70%") ||
          sentence.includes("50%") ||
          sentence.includes("40%") ? (
            <Highlight>{sentence}</Highlight>
          ) : (
            sentence
          )}
          {index < description.split(". ").length - 1 && ". "}
        </p>
      ))}
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        alt={name}
        src={img!}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

export function TestimonialsOne() {
  const { title, description, list } = config.landing.testimonials;

  return (
    <section id="testimonials" className="container">
      <div className="pt-16 lg:pt-24">
        <div className="flex flex-col items-center gap-y-2 justify-center mb-3 lg:mb-5 text-center">
          <FadeText
            className="font-bold text-primary uppercase text-base lg:text-lg"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={title}
          />
          <FadeText
            className="scroll-m-96 font-extrabold tracking-tight text-2xl lg:text-5xl"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={description}
          />
        </div>
        <div className="relative mt-6 max-h-[650px] overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-3">
            {Array(Math.ceil(list.length / 3))
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    "[--duration:60s]": i === 1,
                    "[--duration:30s]": i === 2,
                    "[--duration:70s]": i === 3,
                  })}
                >
                  {list.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <TestimonialCard {...card} key={idx} />
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% "></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20%"></div>
        </div>
      </div>
    </section>
  );
}
