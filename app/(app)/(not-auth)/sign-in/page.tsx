import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import FormSignIn from "./FormSignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h3 className="text-2xl text-center lg:text-left font-bold mb-8">
        Sign In to your account
      </h3>
      <FormSignIn />
    </div>
  );
};

export default SignIn;
