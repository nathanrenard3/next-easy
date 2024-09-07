"use client";

import { useForm, SubmitHandler } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/db/actions/register-actions";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  phone: z
    .string()
    .min(1, {
      message: "Phone number is required",
    })
    .refine(
      (val) => {
        const parsedNumber = parsePhoneNumberFromString(val, "FR");
        return parsedNumber && parsedNumber.isValid();
      },
      {
        message: "Phone number is not valid",
      }
    ),
  email: z.string().email({
    message: "Email is not valid",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    ),
});

type schemaData = z.infer<typeof schema>;

const FormRegister = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<schemaData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedPhoneNumber = new AsYouType("FR").input(input);
    form.setValue("phone", formattedPhoneNumber);
  };

  const onSubmit: SubmitHandler<schemaData> = async (data) => {
    try {
      await registerAction(data);
      setShowSuccessDialog(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An user with this email already exists.",
        variant: "destructive",
      });
    }
  };

  const onCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    router.push("/sign-in");
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full grid gap-1"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
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
                  <Input placeholder="Last Name" {...field} />
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
                  <Input
                    placeholder="Phone"
                    value={field.value}
                    onChange={(e) => {
                      handlePhoneChange(e);
                      field.onChange(e);
                    }}
                  />
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
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Create an account
          </Button>
        </form>
      </Form>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account created successfully!</DialogTitle>
            <DialogDescription>
              Your account has been created successfully. Please check your
              inbox to activate your account.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onCloseSuccessDialog}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormRegister;
