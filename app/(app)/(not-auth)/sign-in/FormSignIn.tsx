"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateAndSendVerificationToken } from "@/lib/db/actions/register-actions";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const FormSignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { email, password } = data;
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      });

      if (result?.error) {
        const isEmailNotConfirmed = result.error.includes(
          "Email not confirmed"
        );

        let title = "";
        let description = "";
        let action = null;

        if (isEmailNotConfirmed) {
          title = "Email not confirmed";
          description = "Please verify your email before logging in.";

          action = (
            <Button
              variant="outline"
              onClick={async () => {
                setIsResending(true);
                await generateAndSendVerificationToken(email);
                setIsResending(false);
              }}
              disabled={isResending}
            >
              Resend
            </Button>
          );
        } else {
          title = "Login Error";
          description = "Incorrect email or password";
        }

        toast({
          title: title,
          description: description,
          variant: "destructive",
          action: action || undefined,
        });
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  });

  return (
    <div className="space-y-8">
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
                <FormMessage data-testid="email-message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center px-4"
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage data-testid="password-message" />
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">Don't have an account?</span>
                    <Button variant="link" asChild className="px-2">
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                  <div>
                    <Button variant="link" asChild className="px-2">
                      <Link href="/forgot-password">Forgot password?</Link>
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-sm text-gray-500 text-center">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};

export default FormSignIn;
