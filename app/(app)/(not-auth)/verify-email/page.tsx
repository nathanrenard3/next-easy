import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db/prisma";

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
      <h1 className="text-2xl text-center lg:text-left font-bold mb-4">
        Email Verification
      </h1>
      {verificationStatus === "pending" && <p>Verifying your email...</p>}
      {verificationStatus === "success" && (
        <>
          <p className="text-green-600 mb-4">
            Your email has been successfully verified!
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
      {verificationStatus === "error" && (
        <p className="text-destructive">
          An error occurred while verifying your email. Please try again.
        </p>
      )}
      {verificationStatus === "missing_token" && (
        <p className="text-destructive">
          Verification token is missing. Please use the link provided in the
          email.
        </p>
      )}
    </div>
  );
}
