"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FormResetPassword from "@/app/(app)/(not-auth)/reset-password/FormResetPassword";

const ResetPasswordContent = () => {
  const [isValidToken, setIsValidToken] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <p>Reset token missing. Please check the link in your email.</p>;
  }

  if (!isValidToken) {
    return (
      <p>
        The reset token is invalid or has expired. Please request a new reset
        link.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Password Reset</h1>
      <FormResetPassword token={token} setIsValidToken={setIsValidToken} />
    </div>
  );
};

const ResetPasswordClient = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordClient;
