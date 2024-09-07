import SuccessMessage from "@/features/landing/success/SuccessMessage";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";

const SuccessSubscription = async () => {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session?.user ? true : false;
  return <SuccessMessage isLoggedIn={isLoggedIn} />;
};

export default SuccessSubscription;
