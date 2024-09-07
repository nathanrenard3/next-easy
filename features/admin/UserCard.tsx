import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteUser from "@/features/admin/DeleteUser";
import UserDetails from "@/features/admin/UserDetails";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  haveSub: boolean;
  email: string;
  phone: string;
  emailVerified: Date | null;
  companyName: string;
  createdAt: Date;
  adress: string[];
}

const UserCard = ({
  id,
  firstName,
  lastName,
  haveSub,
  email,
  phone,
  emailVerified,
  companyName,
  createdAt,
  adress,
}: Props) => {
  return (
    <Card
      key={id}
      className="w-full bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <CardHeader className="bg-gray-100 rounded-t-lg p-4">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-between">
          {`${firstName} ${lastName}`}
          {haveSub && <Badge variant="default">Abonnement Actif</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid gap-3">
        <p className="text-gray-600">
          Email: <span className="font-medium">{email}</span>
        </p>
        <p className="text-gray-600">
          Téléphone: <span className="font-medium">{phone}</span>
        </p>
        <p className="text-gray-600">
          Mail confirmé:{" "}
          <span className="font-medium">{emailVerified ? "Oui" : "Non"}</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 flex gap-4">
        <UserDetails
          companyName={companyName}
          createdAt={createdAt}
          adress={adress}
        />
        <DeleteUser id={id} />
      </CardFooter>
    </Card>
  );
};

export default UserCard;
