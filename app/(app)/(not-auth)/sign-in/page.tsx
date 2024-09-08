import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import FormSignIn from "./FormSignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Sign in`,
};

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h3 className="text-2xl text-center lg:text-left font-bold mb-8">
        Sign in to your account
      </h3>
      <FormSignIn />
    </div>
  );
};

export default SignIn;
