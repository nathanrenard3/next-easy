import FormRegister from "@/features/auth/FormRegister";

export default function Register() {
  return (
    <div>
      <h3 className="text-2xl text-center lg:text-left font-bold mb-8">
        Créez-vous un compte
      </h3>
      <FormRegister />
    </div>
  );
}
