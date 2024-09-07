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
import { forgotPasswordAction } from "./forgot-password-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is not valid",
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
      const result = await forgotPasswordAction({ email: data.email });
      if (result.success) {
        toast({
          title: "Email sent",
          description: "Check your email to reset your password.",
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Unable to send the reset password email.",
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
                <span className="text-sm">Already have an account ?</span>
                <Button variant="link" asChild className="px-2">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default FormForgotPassword;
