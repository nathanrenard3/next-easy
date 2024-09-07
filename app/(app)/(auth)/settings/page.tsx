import { getServerSession } from "next-auth/next";
import FormUserInformations from "@/features/settings/FormUserInformations";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Settings = async () => {
  const session = await getServerSession(authOptions);

  const { firstName, lastName, email, phone } = session!.user;

  return (
    <div className="w-full md:container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
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
