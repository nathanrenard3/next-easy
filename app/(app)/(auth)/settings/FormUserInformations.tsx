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
import { ButtonLoading } from "@/components/ui/button-loading";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { updateUserAction } from "@/lib/db/actions/user-actions";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "L'adresse email n'est pas valide" }),
  phone: z
    .string()
    .min(1, { message: "Le téléphone est requis" })
    .refine(
      (val) => {
        const parsedNumber = parsePhoneNumberFromString(val, "FR");
        return parsedNumber && parsedNumber.isValid();
      },
      { message: "Le numéro de téléphone est invalide" }
    ),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
});

type FormUserInformationsProps = {
  initialData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

const FormUserInformations = ({ initialData }: FormUserInformationsProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Validation personnalisée pour les mots de passe
      if (data.currentPassword || data.newPassword || data.confirmNewPassword) {
        if (!data.currentPassword) {
          throw new Error("Veuillez entrer votre mot de passe actuel");
        }
        if (!data.newPassword) {
          throw new Error("Veuillez entrer un nouveau mot de passe");
        }
        if (data.newPassword.length < 8) {
          throw new Error(
            "Le nouveau mot de passe doit contenir au moins 8 caractères"
          );
        }
        if (data.newPassword !== data.confirmNewPassword) {
          throw new Error("Les mots de passe ne correspondent pas");
        }
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            data.newPassword
          )
        ) {
          throw new Error(
            "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
          );
        }
      }

      const formData = new FormData();
      formData.append("userId", initialData.id);

      if (data.currentPassword && data.newPassword) {
        formData.append("currentPassword", data.currentPassword);
        formData.append("newPassword", data.newPassword);
      }

      await updateUserAction(formData);

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });

      // Reset password fields after successful update
      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger(["newPassword", "confirmNewPassword"]);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-4"
                  >
                    {showCurrentPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger(["currentPassword", "confirmNewPassword"]);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-4"
                  >
                    {showNewPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger(["currentPassword", "newPassword"]);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-4"
                  >
                    {showConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoading
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          Mettre à jour le profil
        </ButtonLoading>
      </form>
    </Form>
  );
};

export default FormUserInformations;
