"use client";

import Confetti, { ConfettiRef } from "@/components/magicui/confetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

interface SuccessMessageProps {
  isLoggedIn: boolean;
}

const SuccessMessage = ({ isLoggedIn }: SuccessMessageProps) => {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none text-black text-center text-3xl font-semibold leading-none ">
        Félicitations !{"\n"}Votre abonnement a bien été pris en compte
      </span>
      <Button asChild className="mt-6 z-10">
        <Link href={isLoggedIn ? "/dashboard" : "/sign-in"}>
          {isLoggedIn ? "Accéder à mon compte" : "Connectez-vous"}
        </Link>
      </Button>

      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
};

export default SuccessMessage;
