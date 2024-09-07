import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormCreateLocation from "@/features/dashboard/location/FormCreateLocation";
import { changeLocationAction } from "@/lib/db/actions/locations-actions";
import { Location } from "@prisma/client";

interface ChangeLocationProps {
  currentLocation: Location;
  locations: Location[];
  hasFeature: boolean;
}

const ChangeLocation = ({
  currentLocation,
  locations,
  hasFeature,
}: ChangeLocationProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{currentLocation.address}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Choisissez un de vos commerces
            </h4>
            <p className="text-sm text-muted-foreground">
              Vous pouvez changer de commerce à tout moment
            </p>
          </div>
          {hasFeature ? (
            <>
              <div className="grid gap-2">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between"
                  >
                    <span>{location.address}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changeLocationAction(location.id)}
                    >
                      Sélectionner
                    </Button>
                  </div>
                ))}
              </div>
              <FormCreateLocation companyId={currentLocation.companyId} />
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground mb-2">
                Vous devez souscrire à un abonnement pro pour accéder à cette
                fonctionnalité.
              </p>
              <Button disabled>Ajouter un nouveau commerce</Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChangeLocation;
