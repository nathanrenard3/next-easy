import { FadeText } from "@/components/magicui/fade-text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Questions = () => {
  const questions = [
    {
      question: "What is NextEasy?",
      answer: "NextEasy is a boilerplate for Next.js.",
    },
    {
      question: "What technologies are used in this boilerplate?",
      answer:
        "This boilerplate is built with Next.js, TailwindCSS, Shadcn / Magic UI, NextAuth, Prisma and Resend .",
    },
    {
      question: "Is this boilerplate open source?",
      answer:
        "Yes, this boilerplate is open source. You can find the source code on GitHub.",
    },
  ];

  return (
    <div className="relative container my-10 lg:my-20">
      <div className="flex flex-col items-center gap-y-2 justify-center text-center">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="FAQ"
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="Frequently Asked Questions"
        />
      </div>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full grid">
          {questions.map((q, i) => (
            <AccordionItem
              key={i}
              value={`question-${i}`}
              className="my-4 rounded-xl border border-border shadow-sm transition-all hover:border-primary [&[data-state=open]]:border-primary"
            >
              <AccordionTrigger className="px-4 py-4 text-base sm:text-lg font-medium text-left">
                <span className="font-semibold">{q.question}</span>
                <span className="text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 2a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1z"
                    />
                  </svg>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm sm:text-base">
                <p className="text-muted-foreground">{q.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Questions;
