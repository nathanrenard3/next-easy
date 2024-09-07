import { Prisma } from "@prisma/client";
import UserCard from "@/features/admin/UserCard";

interface Props {
  users: Prisma.UserGetPayload<{
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
  }>[];
}

const ListUsers = ({ users }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          adress={user.locations.map((location) => location.address)}
          companyName={user.locations[0].company.name}
          createdAt={user.createdAt}
          email={user.email}
          emailVerified={user.emailVerified}
          firstName={user.firstName}
          haveSub={user.locations[0].company.subscriptions.length > 0}
          id={user.id}
          lastName={user.lastName}
          phone={user.phone}
        />
      ))}
    </div>
  );
};

export default ListUsers;
