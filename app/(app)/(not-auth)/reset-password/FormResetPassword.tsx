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
import { resetPasswordAction } from "./reset-password-actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      const result = await resetPasswordAction({
        token,
        password: data.password,
      });
      if (result.success) {
        toast({
          title: "Password reset successfully",
          description:
            "Your password has been reset successfully. You can now sign in with your new password.",
        });
        router.push("/sign-in");
      }
    } catch (error: any) {
      if (error.message === "Invalid or expired token") {
        setIsValidToken(false);
      } else {
        toast({
          title: "Erreur",
          description: error.message || "Unable to reset the password.",
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
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New password" {...field} />
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
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          Change password
        </Button>
      </form>
    </Form>
  );
};

export default FormResetPassword;
