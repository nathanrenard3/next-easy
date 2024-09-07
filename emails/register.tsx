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

interface RegisterProps {
  name?: string;
  url?: string;
}

export const Register = ({ name, url }: RegisterProps) => (
  <Html>
    <Head />
    <Preview>
      Bienvenue chez NextEasy - Votre accès personnel est prêt !
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="max-w-[480px] mx-auto py-5 px-0">
          <Text className="text-2xl leading-tight">
            <strong>{name}</strong>, votre accès personnel a été créé !
          </Text>

          <Section className="p-6 border border-solid border-gray-300 rounded-lg text-center">
            <Text className="m-0 mb-4 text-left">
              Bienvenue <strong>{name}</strong>!
            </Text>
            <Text className="m-0 mb-4 text-left">
              Votre compte personnel NextEasy a été créé avec succès. Avant de
              commencer à utiliser l'application, veuillez vérifier votre boîte
              de réception pour confirmer votre adresse e-mail.
            </Text>

            <Button
              href={url}
              className="bg-primary text-white text-sm py-3 px-6 rounded-lg"
            >
              Vérifier mon adresse e-mail
            </Button>
          </Section>

          <Text className="text-gray-500 text-xs text-center mt-16">
            @2024 NextEasy. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

Register.PreviewProps = {
  name: "alanturing",
} as RegisterProps;

export default Register;
