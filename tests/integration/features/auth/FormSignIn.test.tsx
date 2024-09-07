import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import FormSignIn from "@/app/(app)/(not-auth)/reset-password/FormSignIn";

// Mock necessary modules and functions
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

describe("FormSignIn", () => {
  it("renders the form with email and password fields", () => {
    render(<FormSignIn />);

    expect(screen.getByPlaceholderText("Email")).toBeDefined();
    expect(screen.getByPlaceholderText("Mot de passe")).toBeDefined();
    expect(screen.getByRole("button", { name: /Connexion/i })).toBeDefined();
  });

  it("shows error messages for invalid inputs", async () => {
    render(<FormSignIn />);

    fireEvent.submit(screen.getByRole("button", { name: /Connexion/i }));

    await waitFor(() => {
      expect(
        screen.getByText("L'adresse email n'est pas valide")
      ).toBeDefined();
      expect(screen.getByText("Le mot de passe est requis")).toBeDefined();
    });
  });

  it("calls signIn function with email and password", async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ error: null });

    render(<FormSignIn />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Connexion/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password",
        redirect: false,
      });
    });
  });

  it("redirects to dashboard on successful sign in", async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ error: null });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<FormSignIn />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Connexion/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error toast on sign in failure", async () => {
    const mockSignIn = signIn as jest.Mock;
    mockSignIn.mockResolvedValue({ error: "CredentialsSignin" });

    render(<FormSignIn />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Connexion/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Erreur de connexion",
        description: "L'adresse email ou le mot de passe est incorrect",
        variant: "destructive",
      });
    });
  });
});
