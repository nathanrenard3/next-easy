import FormForgotPassword from "./FormForgotPassword";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Forgot password`,
};

export default function ForgotPassword() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-8">Forgot your password?</h3>
      <FormForgotPassword />
    </div>
  );
}
