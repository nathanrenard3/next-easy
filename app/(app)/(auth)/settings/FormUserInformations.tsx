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
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { updateUserAction } from "./user-actions";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(
      (val) => {
        const parsedNumber = parsePhoneNumberFromString(val, "FR");
        return parsedNumber && parsedNumber.isValid();
      },
      { message: "Invalid phone number" }
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
      // Custom password validation
      if (data.currentPassword || data.newPassword || data.confirmNewPassword) {
        if (!data.currentPassword) {
          throw new Error("Please enter your current password");
        }
        if (!data.newPassword) {
          throw new Error("Please enter a new password");
        }
        if (data.newPassword.length < 8) {
          throw new Error("New password must be at least 8 characters long");
        }
        if (data.newPassword !== data.confirmNewPassword) {
          throw new Error("Passwords do not match");
        }
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            data.newPassword
          )
        ) {
          throw new Error(
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
          );
        }
      }

      const formData = new FormData();
      formData.append("userId", initialData.id);

      await updateUserAction({
        userId: initialData.id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast({
        title: "Profile updated",
        description: "Your information has been successfully updated.",
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
        title: "Error",
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
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
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
              <FormLabel>Phone</FormLabel>
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
              <FormLabel>Current Password</FormLabel>
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
              <FormLabel>New Password</FormLabel>
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
              <FormLabel>Confirm New Password</FormLabel>
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
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default FormUserInformations;
