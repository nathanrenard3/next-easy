import OrderList from "@/features/dashboard/orders/OrdersList";
import KpiOverview from "@/features/dashboard/overview/KpiOverview";
import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Bienvenue, {user.firstName} {user.lastName} !
      </h2>
    </div>
  );
};

export default Dashboard;
