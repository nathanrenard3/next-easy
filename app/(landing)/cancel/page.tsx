import { Button } from "@/components/ui/button";
import Link from "next/link";

const CancelSubscription = () => {
  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none text-black text-center text-3xl font-semibold leading-none ">
        L'opération a été annulée ou n'a pas pu être effectuée
      </span>
      <Button asChild className="mt-6 z-10">
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
};

export default CancelSubscription;
