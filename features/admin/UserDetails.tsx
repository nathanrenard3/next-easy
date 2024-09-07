"use client";

import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

interface Props {
  companyName: string;
  createdAt: Date;
  adress: string[];
}

const UserDetails = ({ companyName, createdAt, adress }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Détails
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Nom de l'entreprise: {companyName}</p>
          <p>Créé le {formatDate(createdAt)}</p>

          <p>Sites: {adress.join(", ")}</p>
        </DialogDescription>
        <DialogFooter
          className="flex justify-end gap-4"
          style={{ paddingBottom: "0" }}
        >
          <DialogClose asChild>
            <Button type="button">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
