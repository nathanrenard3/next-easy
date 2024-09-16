import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import FormUserInformations from "./FormUserInformations";

const Settings = async () => {
  const session = await getServerSession(authOptions);

  const { firstName, lastName, email, phone } = session!.user;

  return (
    <div className="w-full md:container mx-auto">
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
