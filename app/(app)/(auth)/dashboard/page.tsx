import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Welcome, {user.firstName} {user.lastName} !
      </h2>
    </div>
  );
};

export default Dashboard;
