import { FadeText } from "@/components/magicui/fade-text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const QuestionsOne = () => {
  const questions = [
    {
      question: "What technologies are included in this Next.js boilerplate?",
      answer:
        "Our boilerplate includes Next.js, TypeScript, Tailwind CSS, Shadcn UI, and various other optimized libraries for state management, form handling, and API integration. It's designed to provide a comprehensive starting point for modern web applications.",
    },
    {
      question: "How does this boilerplate improve development speed?",
      answer:
        "This boilerplate significantly improves development speed by providing pre-configured settings, a collection of reusable components, and optimized project structure. It eliminates the need for time-consuming initial setup and allows developers to focus on building features right away.",
    },
    {
      question:
        "Is this boilerplate suitable for both small and large-scale projects?",
      answer:
        "Absolutely! Our boilerplate is designed to be scalable and flexible. It's perfect for quick prototypes and small projects, but it also includes best practices and optimizations that make it suitable for large-scale, production-ready applications.",
    },
    {
      question: "How often is the boilerplate updated?",
      answer:
        "We regularly update our boilerplate to ensure it includes the latest versions of Next.js and other dependencies. We also continuously improve and add new features based on community feedback and emerging best practices in the React and Next.js ecosystem.",
    },
    {
      question: "Can I customize the pre-built components?",
      answer:
        "Yes, all pre-built components are fully customizable. They're designed to be a starting point, and you can easily modify their styles, functionality, or structure to fit your specific project needs. The use of Tailwind CSS makes styling customizations particularly straightforward.",
    },
  ];

  return (
    <div className="container lg:pt-12 relative">
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
            <AccordionItem key={i} className="my-4" value={String(i)}>
              <AccordionTrigger className="flex justify-between items-center py-4 px-6 bg-card rounded-lg shadow-sm cursor-pointer text-base lg:text-lg border border-input bg-white">
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
              <AccordionContent className="p-4 bg-card rounded-lg shadow-sm border border-input bg-white mt-1">
                <p className="text-muted-foreground">{q.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default QuestionsOne;
