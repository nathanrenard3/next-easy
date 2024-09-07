import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "@/components/ui/use-toast";
import { updateLocationAction } from "@/lib/db/actions/locations-actions";
import LocationInformations from "@/features/dashboard/location/LocationInformations";

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/lib/db/actions/locations-actions", () => ({
  updateLocationAction: jest.fn(),
}));

const mockLocation = {
  id: "1",
  companyId: "1",
  name: "Test Location",
  address: "123 Test St",
  city: "Test City",
  currency: "USD",
  latitude: 40.7128,
  longitude: -74.006,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("LocationInformations", () => {
  it("renders the form with name, address, and city fields", () => {
    render(<LocationInformations location={mockLocation} />);

    expect(screen.getByPlaceholderText("Nom du commerce")).toBeDefined();
    expect(screen.getByPlaceholderText("Adresse")).toBeDefined();
    expect(screen.getByPlaceholderText("Ville")).toBeDefined();
    expect(screen.getByRole("button", { name: /Enregistrer/i })).toBeDefined();
  });

  it("shows error messages for invalid inputs", async () => {
    render(<LocationInformations location={mockLocation} />);

    fireEvent.change(screen.getByPlaceholderText("Nom du commerce"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: { value: "" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      expect(screen.getByText("Le nom est requis")).toBeDefined();
      expect(screen.getByText("L'adresse est requise")).toBeDefined();
      expect(screen.getByText("La ville est requise")).toBeDefined();
    });
  });

  it("calls updateLocationAction with the correct data", async () => {
    const mockUpdateLocationAction = updateLocationAction as jest.Mock;
    mockUpdateLocationAction.mockResolvedValue(null);

    render(<LocationInformations location={mockLocation} />);

    fireEvent.change(screen.getByPlaceholderText("Nom du commerce"), {
      target: { value: "Updated Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "Updated Address" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: { value: "Updated City" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      const formData = new FormData();
      formData.append("name", "Updated Name");
      formData.append("address", "Updated Address");
      formData.append("city", "Updated City");
      formData.append("locationId", mockLocation.id);

      expect(mockUpdateLocationAction).toHaveBeenCalledWith(formData);
    });
  });

  it("shows success toast on successful submission", async () => {
    const mockUpdateLocationAction = updateLocationAction as jest.Mock;
    mockUpdateLocationAction.mockResolvedValue(null);

    render(<LocationInformations location={mockLocation} />);

    fireEvent.change(screen.getByPlaceholderText("Nom du commerce"), {
      target: { value: "Updated Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "Updated Address" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: { value: "Updated City" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Enregistrer/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Succès",
        description: "Les informations du commerce ont été enregistrées",
      });
    });
  });

  it("shows error toast on submission failure", async () => {
    const mockUpdateLocationAction = updateLocationAction as jest.Mock;
    mockUpdateLocationAction.mockRejectedValue(new Error("Submission Failed"));

    render(<LocationInformations location={mockLocation} />);

    fireEvent.change(screen.getByPlaceholderText("Nom du commerce"), {
      target: { value: "Updated Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "Updated Address" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: { value: "Updated City" },
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
