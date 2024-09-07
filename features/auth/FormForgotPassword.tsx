"use client";

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
import { useState } from "react";
import { ButtonLoading } from "@/components/ui/button-loading";
import { forgotPasswordAction } from "@/lib/db/actions/forgot-password-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "L'adresse email n'est pas valide",
  }),
});

const FormForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      const result = await forgotPasswordAction(formData);
      if (result.success) {
        toast({
          title: "Email envoyé",
          description:
            "Allez dans votre email pour réinitialiser votre mot de passe.",
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error.message || "Impossible d'envoyer l'e-mail de réinitialisation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center">
                <span className="text-sm">Vous avez déjà un compte ?</span>
                <Button variant="link" asChild className="px-2">
                  <Link href="/sign-in">Se connecter</Link>
                </Button>
              </div>
            </FormItem>
          )}
        />

        <ButtonLoading type="submit" isLoading={isLoading} className="w-full">
          Réinitialiser
        </ButtonLoading>
      </form>
    </Form>
  );
};

export default FormForgotPassword;
