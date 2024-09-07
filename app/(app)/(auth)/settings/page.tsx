import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/db/authOptions";
import FormUserInformations from "@/features/settings/FormUserInformations";

const Settings = async () => {
  const session = await getServerSession(authOptions);

  const { firstName, lastName, email, phone } = session!.user;

  return (
    <div className="w-full md:container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>
      <FormUserInformations
        initialData={{
          id: session!.user.id,
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          phone: phone || "",
        }}
      />
    </div>
  );
};

export default Settings;
