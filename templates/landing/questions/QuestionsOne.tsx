import { FadeText } from "@/components/magicui/fade-text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { config } from "@/config";

const QuestionsOne = () => {
  const { title, description, list } = config.landing.questions;

  return (
    <div className="container lg:pt-12 relative">
      <div className="flex flex-col items-center gap-y-2 justify-center text-center">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={title}
        />
        <FadeText
          className="font-extrabold tracking-tight text-2xl lg:text-5xl"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={description}
        />
      </div>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full grid">
          {list.map((q, i) => (
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
