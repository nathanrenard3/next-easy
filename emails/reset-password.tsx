import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordProps {
  name?: string;
  url?: string;
}

export const ResetPassword = ({ name, url }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Réinitialisation de votre mot de passe NextEasy</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="max-w-[480px] mx-auto py-5 px-0">
          <Text className="text-2xl leading-tight">
            <strong>{name}</strong>, vous avez demandé la réinitialisation de
            votre mot de passe
          </Text>

          <Section className="p-6 border border-solid border-gray-300 rounded-lg text-center">
            <Text className="m-0 mb-4 text-left">
              Bonjour <strong>{name}</strong>,
            </Text>
            <Text className="m-0 mb-4 text-left">
              Nous avons reçu une demande de réinitialisation de mot de passe
              pour votre compte NextEasy. Si vous n'êtes pas à l'origine de
              cette demande, vous pouvez ignorer cet e-mail.
            </Text>
            <Text className="m-0 mb-4 text-left">
              Pour réinitialiser votre mot de passe, cliquez sur le bouton
              ci-dessous :
            </Text>

            <Button
              href={url}
              className="bg-primary text-white text-sm py-3 px-6 rounded-lg"
            >
              Réinitialiser mon mot de passe
            </Button>

            <Text className="m-0 mt-4 text-left text-sm text-gray-500">
              Ce lien expirera dans 1 heure pour des raisons de sécurité. Si
              vous avez besoin d'un nouveau lien, vous pouvez en demander un sur
              la page de connexion.
            </Text>
          </Section>

          <Text className="text-gray-500 text-xs text-center mt-16">
            @2024 NextEasy. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ResetPassword.PreviewProps = {
  name: "alanturing",
  url: "https://iconik-hub.fr/reset-password",
} as ResetPasswordProps;

export default ResetPassword;
