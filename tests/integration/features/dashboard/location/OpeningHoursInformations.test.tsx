import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "@/components/ui/use-toast";
import { updateOpeningHoursAction } from "@/lib/db/actions/locations-actions";
import { daysOfWeek } from "@/lib/enums/dayOfWeek";
import OpeningHoursInformations from "@/features/dashboard/location/OpeningHoursInformations";

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/lib/db/actions/locations-actions", () => ({
  updateOpeningHoursAction: jest.fn(),
}));

const mockOpeningHours = [
  {
    id: "1",
    locationId: "1",
    day: "Monday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "2",
    locationId: "1",
    day: "Tuesday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "3",
    locationId: "1",
    day: "Wednesday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "4",
    locationId: "1",
    day: "Thursday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "5",
    locationId: "1",
    day: "Friday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "6",
    locationId: "1",
    day: "Saturday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
  {
    id: "7",
    locationId: "1",
    day: "Sunday",
    morningOpen: "09:00",
    morningClose: "12:00",
    afternoonOpen: "14:00",
    afternoonClose: "18:00",
  },
];

const mockLocationId = "1";

describe("OpeningHoursInformations", () => {
  it("renders the form with fields for each day of the week", () => {
    render(
      <OpeningHoursInformations
        openingHours={mockOpeningHours}
        locationId={mockLocationId}
      />
    );

    daysOfWeek.forEach((day) => {
      expect(screen.getByText(day.value)).toBeDefined();
    });
  });

  it("shows error messages for invalid inputs", async () => {
    render(
      <OpeningHoursInformations
        openingHours={mockOpeningHours}
        locationId={mockLocationId}
      />
    );

    const morningOpenInputs = screen.getAllByPlaceholderText("08:00");
    fireEvent.change(morningOpenInputs[0], {
      target: { value: "invalid time" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      expect(screen.getByText("Format de l'heure invalide")).toBeDefined();
    });
  });

  it("shows success toast on successful submission", async () => {
    const mockUpdateOpeningHoursAction = updateOpeningHoursAction as jest.Mock;
    mockUpdateOpeningHoursAction.mockResolvedValue(null);

    render(
      <OpeningHoursInformations
        openingHours={mockOpeningHours}
        locationId={mockLocationId}
      />
    );

    const morningOpenInputs = screen.getAllByPlaceholderText("08:00");
    fireEvent.change(morningOpenInputs[0], {
      target: { value: "08:00" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Succès",
        description: "Les horaires d'ouverture ont été enregistrés",
      });
    });
  });

  it("shows error toast on submission failure", async () => {
    const mockUpdateOpeningHoursAction = updateOpeningHoursAction as jest.Mock;
    mockUpdateOpeningHoursAction.mockRejectedValue(
      new Error("Submission Failed")
    );

    render(
      <OpeningHoursInformations
        openingHours={mockOpeningHours}
        locationId={mockLocationId}
      />
    );

    const morningOpenInputs = screen.getAllByPlaceholderText("08:00");
    fireEvent.change(morningOpenInputs[0], {
      target: { value: "08:00" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Échec de l'enregistrement",
        description: "Submission Failed",
        variant: "destructive",
      });
    });
  });
});
