import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Verify email`,
};

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  let verificationStatus = "pending";

  async function verifyEmail(token: string) {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error("Invalid verification token");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    });
  }

  if (token) {
    try {
      await verifyEmail(token);
      verificationStatus = "success";
    } catch (error) {
      verificationStatus = "error";
    }
  } else {
    verificationStatus = "missing_token";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-primary">
          Email Verification
        </h1>

        {verificationStatus === "pending" && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-16 h-16 text-yellow-500 animate-pulse" />
            <p className="text-lg text-gray-600">Verifying your email...</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="text-lg text-green-600 text-center">
              Your email has been successfully verified!
            </p>
            <Button asChild className="w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <p className="text-lg text-red-600 text-center">
              An error occurred while verifying your email. Please try again.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        )}

        {verificationStatus === "missing_token" && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
            <p className="text-lg text-yellow-600 text-center">
              Verification token is missing. Please use the link provided in the
              email.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
