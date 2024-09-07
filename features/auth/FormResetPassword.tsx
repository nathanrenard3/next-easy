"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ButtonLoading } from "@/components/ui/button-loading";
import { resetPasswordAction } from "@/lib/db/actions/reset-password-actions";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

interface FormResetPasswordProps {
  token: string;
  setIsValidToken: (isValid: boolean) => void;
}

const FormResetPassword = ({
  token,
  setIsValidToken,
}: FormResetPasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", data.password);
      const result = await resetPasswordAction(formData);
      if (result.success) {
        toast({
          title: "Mot de passe réinitialisé",
          description:
            "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
        });
        router.push("/sign-in");
      }
    } catch (error: any) {
      if (error.message === "Invalid or expired token") {
        setIsValidToken(false);
      } else {
        toast({
          title: "Erreur",
          description:
            error.message || "Impossible de réinitialiser le mot de passe.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonLoading type="submit" isLoading={isLoading} className="w-full">
          Changer le mot de passe
        </ButtonLoading>
      </form>
    </Form>
  );
};

export default FormResetPassword;
