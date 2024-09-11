import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { FadeText } from "@/components/magicui/fade-text";

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
        "bg-background/20 p-1 py-0.5 font-bold text-primary",
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
  description: string;
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
      "border border-border bg-white dark:bg-background",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-300">
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
        className="h-10 w-10 rounded-full ring-1 ring-border dark:ring-neutral-700 ring-offset-4 ring-offset-white dark:ring-offset-neutral-800"
      />

      <div>
        <p className="font-medium text-neutral-500 dark:text-neutral-400">
          {name}
        </p>
        <p className="text-xs font-normal text-neutral-400 dark:text-neutral-500">
          {role}
        </p>
      </div>
    </div>
  </div>
);

export function Testimonials() {
  const testimonials = [
    {
      name: "Example 1",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description:
        "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
    },
    {
      name: "Example 2",
      role: "CTO at TechStartup",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description:
        "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
    },
    {
      name: "Example 3",
      role: "Lead Developer at WebAgency",
      img: "https://randomuser.me/api/portraits/women/83.jpg",
      description:
        "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
    },
    {
      name: "Example 1",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description:
        "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
    },
    {
      name: "Example 2",
      role: "CTO at TechStartup",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description:
        "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
    },
    {
      name: "Example 3",
      role: "Lead Developer at WebAgency",
      img: "https://randomuser.me/api/portraits/women/83.jpg",
      description:
        "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
    },
    {
      name: "Example 1",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      description:
        "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
    },
    {
      name: "Example 2",
      role: "CTO at TechStartup",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      description:
        "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
    },
    {
      name: "Example 3",
      role: "Lead Developer at WebAgency",
      img: "https://randomuser.me/api/portraits/women/83.jpg",
      description:
        "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
    },
  ];

  return (
    <section id="testimonials" className="container my-10 lg:my-20">
      <div className="pt-16 lg:pt-24">
        <div className="flex flex-col items-center gap-y-2 justify-center mb-3 lg:mb-5 text-center">
          <FadeText
            className="font-bold text-primary uppercase text-base lg:text-lg"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="Testimonials"
          />
          <FadeText
            className="scroll-m-96 font-extrabold tracking-tight text-2xl lg:text-5xl text-foreground"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="What Developers Say About Our Boilerplate"
          />
        </div>
        <div className="relative mt-6 max-h-[650px] overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-3">
            {Array(Math.ceil(testimonials.length / 3))
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
                  {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <TestimonialCard {...card} key={idx} />
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background via-background/50 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent rounded-b-xl"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background via-background/50 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent rounded-t-xl"></div>
        </div>
      </div>
    </section>
  );
}
