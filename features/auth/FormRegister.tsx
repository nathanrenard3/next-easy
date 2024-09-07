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
import { ButtonLoading } from "@/components/ui/button-loading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/db/actions/register-actions";
import Link from "next/link";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import { formatPhoneNumber } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const step1Schema = z.object({
  nameCompany: z.string().min(1, {
    message: "Le nom de la société est requis",
  }),
});

const step2Schema = z.object({
  address: z.string().min(1, {
    message: "L'adresse est requise",
  }),
  city: z.string().min(1, {
    message: "La ville est requise",
  }),
  postalCode: z.string().min(1, {
    message: "Le code postal est requis",
  }),
});

const step3Schema = z.object({
  firstName: z.string().min(1, {
    message: "Le prénom est requis",
  }),
  lastName: z.string().min(1, {
    message: "Le nom est requis",
  }),
  phone: z
    .string()
    .min(1, {
      message: "Le téléphone est requis",
    })
    .refine(
      (val) => {
        const parsedNumber = parsePhoneNumberFromString(val, "FR");
        return parsedNumber && parsedNumber.isValid();
      },
      {
        message: "Le numéro de téléphone est invalide",
      }
    ),
  email: z.string().email({
    message: "L'adresse email n'est pas valide",
  }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
      }
    ),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const FormRegister = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nameCompany: "",
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const handleNextStep = async () => {
    if (step === 0 && (await step1Form.trigger())) {
      setStep((prev) => prev + 1);
    } else if (step === 1 && (await step2Form.trigger())) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedPhoneNumber = new AsYouType("FR").input(input);
    step3Form.setValue("phone", formattedPhoneNumber);
  };

  const onSubmit: SubmitHandler<Step3Data> = async (data) => {
    const step1Data = step1Form.getValues();
    const step2Data = step2Form.getValues();
    const step3Data = data;

    const allData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };

    const {
      nameCompany,
      address,
      city,
      phone,
      postalCode,
      firstName,
      lastName,
      email,
      password,
    } = allData;

    try {
      const formData = new FormData();
      formData.append("nameCompany", nameCompany);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("phone", formatPhoneNumber(phone));
      formData.append("postalCode", postalCode);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);

      await registerAction(formData);

      setShowSuccessDialog(true);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Un utilisateur avec cette adresse e-mail existe déjà.",
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
      {step === 0 && (
        <Form {...step1Form}>
          <form
            onSubmit={step1Form.handleSubmit(handleNextStep)}
            className="space-y-8 w-full grid gap-1"
          >
            <FormField
              control={step1Form.control}
              name="nameCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'entreprise</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'entreprise" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex items-center">
                    <span className="text-sm">Vous avez déjà un compte ?</span>
                    <Button variant="link" asChild className="px-2">
                      <Link href="/sign-in">Connectez-vous</Link>
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <Button type="button" className="w-full" onClick={handleNextStep}>
              Suivant
            </Button>
          </form>
        </Form>
      )}
      {step === 1 && (
        <Form {...step2Form}>
          <form
            onSubmit={step2Form.handleSubmit(handleNextStep)}
            className="space-y-8 w-full grid gap-1"
          >
            <FormField
              control={step2Form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step2Form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Code postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step2Form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-10">
              <Button
                type="button"
                className="w-full"
                onClick={handlePreviousStep}
              >
                Retour
              </Button>
              <Button type="button" className="w-full" onClick={handleNextStep}>
                Suivant
              </Button>
            </div>
          </form>
        </Form>
      )}
      {step === 2 && (
        <Form {...step3Form}>
          <form
            onSubmit={step3Form.handleSubmit(onSubmit)}
            className="space-y-8 w-full grid gap-1"
          >
            <FormField
              control={step3Form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step3Form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={step3Form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Téléphone"
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
              control={step3Form.control}
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
              control={step3Form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
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
            <div className="grid grid-cols-2 gap-10">
              <Button
                type="button"
                className="w-full"
                onClick={handlePreviousStep}
              >
                Retour
              </Button>
              <ButtonLoading
                type="submit"
                isLoading={step3Form.formState.isSubmitting}
                className="w-full"
              >
                Créer un compte
              </ButtonLoading>
            </div>
          </form>
        </Form>
      )}

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compte créé avec succès !</DialogTitle>
            <DialogDescription>
              Votre compte a été créé avec succès. Veuillez vérifier votre boîte
              de réception pour confirmer votre adresse e-mail.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onCloseSuccessDialog}>Fermer</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormRegister;
