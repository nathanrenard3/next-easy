import FormSignIn from "@/features/auth/FormSignIn";
import { authOptions } from "@/lib/db/authOptions";
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
        Connectez-vous à votre compte
      </h3>
      <FormSignIn />
    </div>
  );
};

export default SignIn;
