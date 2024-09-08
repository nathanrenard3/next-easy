import FormRegister from "./FormRegister";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Register`,
};

export default function Register() {
  return (
    <div>
      <h3 className="text-2xl text-center lg:text-left font-bold mb-8">
        Create an account
      </h3>
      <FormRegister />
    </div>
  );
}
