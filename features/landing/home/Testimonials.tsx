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
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      className
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        alt={name}
        src={img!}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Example 1",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        This Next.js boilerplate has been a game-changer for our development
        process.
        <Highlight>
          We've cut our initial setup time by 70% and significantly improved our
          project structure.
        </Highlight>
        Highly recommended for any React team.
      </p>
    ),
  },
  {
    name: "Example 2",
    role: "CTO at TechStartup",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a startup, we need to move fast. This boilerplate helps us stay ahead
        of the curve.
        <Highlight>
          Our development efficiency has improved by 50%, and we're shipping
          features faster than ever.
        </Highlight>
        An essential tool for any tech startup.
      </p>
    ),
  },
  {
    name: "Example 3",
    role: "Lead Developer at WebAgency",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        The pre-built components and optimized setup have made our projects more
        consistent and efficient.
        <Highlight>
          We've seen a 40% reduction in bug reports and a notable increase in
          client satisfaction.
        </Highlight>
        A must-have for web agencies.
      </p>
    ),
  },
  {
    name: "Example 4",
    role: "Indie Game Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    description: (
      <p>
        This boilerplate has revolutionized how I approach web development for
        my games.
        <Highlight>
          I can now focus more on game logic, saving about 30% of my development
          time.
        </Highlight>
        Fantastic for solo developers or small teams.
      </p>
    ),
  },
  {
    name: "Example 5",
    role: "Senior Developer at E-commerce Giant",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    description: (
      <p>
        With this Next.js boilerplate, we've been able to standardize our
        approach across multiple teams.
        <Highlight>
          Our codebase consistency has improved by 60%, and onboarding new
          developers is much faster.
        </Highlight>
        I highly recommend their solution.
      </p>
    ),
  },
  {
    name: "Example 6",
    role: "Tech Lead at FinTech Startup",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    description: (
      <p>
        The performance optimizations in this boilerplate have been crucial for
        our financial applications.
        <Highlight>
          We've seen a 45% improvement in load times and better overall user
          experience.
        </Highlight>
        An essential tool for us.
      </p>
    ),
  },
  {
    name: "Example 7",
    role: "Freelance Web Developer",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
    description: (
      <p>
        This boilerplate has helped me deliver projects faster and with higher
        quality.
        <Highlight>
          I can take on more clients and deliver results quicker, increasing my
          income by about 25%.
        </Highlight>
        Indispensable for any freelance developer.
      </p>
    ),
  },
  {
    name: "Example 8",
    role: "UX Designer & Developer",
    img: "https://randomuser.me/api/portraits/men/53.jpg",
    description: (
      <p>
        The clean structure and customizable components have made it easier to
        implement my designs.
        <Highlight>
          Design-to-development time has decreased by 35%, and the results are
          more consistent.
        </Highlight>
        A valuable tool for designer-developers.
      </p>
    ),
  },
];

export function Testimonials() {
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
            text="Testimonials"
          />
          <FadeText
            className="scroll-m-96 font-extrabold tracking-tight text-2xl lg:text-5xl"
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% "></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20%"></div>
        </div>
      </div>
    </section>
  );
}
