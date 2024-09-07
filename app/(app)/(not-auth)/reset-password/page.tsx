"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FormResetPassword from "@/features/auth/FormResetPassword";

const ResetPasswordContent = () => {
  const [isValidToken, setIsValidToken] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <p>
        Token de réinitialisation manquant. Veuillez vérifier le lien dans votre
        email.
      </p>
    );
  }

  if (!isValidToken) {
    return (
      <p>
        Le token de réinitialisation est invalide ou a expiré. Veuillez demander
        un nouveau lien de réinitialisation.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Réinitialisation du mot de passe
      </h1>
      <FormResetPassword token={token} setIsValidToken={setIsValidToken} />
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
