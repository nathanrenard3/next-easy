import ListUsers from "@/features/admin/ListUsers";
import { fetchAllUsers } from "@/lib/db/queries/admin/users-queries";
import { Prisma } from "@prisma/client";

const Admin = async () => {
  let users: Prisma.UserGetPayload<{
    include: {
      locations: {
        select: {
          address: true;
          city: true;
          postalCode: true;

          company: {
            select: {
              subscriptions: true;
              name: true;
            };
          };
        };
      };
      superuser: false;
    };
  }>[] = [];

  try {
    users = await fetchAllUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
    return <p>Erreur lors de la récupération des utilisateurs.</p>;
  }

  return (
    <div className="w-full">
      <ListUsers users={users} />
    </div>
  );
};

export default Admin;
