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
import { config } from "@/config";

interface RegisterProps {
  name?: string;
  url?: string;
}

export const Register = ({ name, url }: RegisterProps) => (
  <Html>
    <Head />
    <Preview>{config.email.templates.welcome.subject}</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="max-w-[480px] mx-auto py-5 px-0">
          <Text className="text-2xl leading-tight">
            <strong>{name}</strong>, your personal access has been created!
          </Text>

          <Section className="p-6 border border-solid border-border rounded-lg text-center">
            <Text className="m-0 mb-4 text-left">
              Welcome <strong>{name}</strong>!
            </Text>
            <Text className="m-0 mb-4 text-left">
              Your personal access to NextEasy is ready. Before starting to use
              the application, please check your inbox to confirm your email
              address.
            </Text>

            <Button
              href={url}
              className="bg-primary text-white text-sm py-3 px-6 rounded-lg"
            >
              Verify my email address
            </Button>
          </Section>

          <Text className="text-gray-500 text-xs text-center mt-16">
            @2024 NextEasy. All rights reserved.
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
