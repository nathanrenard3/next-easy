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

interface ResetPasswordProps {
  name?: string;
  url?: string;
}

export const ResetPassword = ({ name, url }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>{config.email.templates.resetPassword.subject}</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="max-w-[480px] mx-auto py-5 px-0">
          <Text className="text-2xl leading-tight">
            <strong>{name}</strong>, you have requested to reset your password
          </Text>

          <Section className="p-6 border border-solid border-border rounded-lg text-center">
            <Text className="m-0 mb-4 text-left">
              Hello <strong>{name}</strong>,
            </Text>
            <Text className="m-0 mb-4 text-left">
              We have received a request to reset the password for your NextEasy
              account. If you did not request this, you can ignore this email.
            </Text>
            <Text className="m-0 mb-4 text-left">
              To reset your password, click the button below:
            </Text>

            <Button
              href={url}
              className="bg-primary text-white text-sm py-3 px-6 rounded-lg"
            >
              Reset my password
            </Button>

            <Text className="m-0 mt-4 text-left text-sm text-gray-500">
              This link will expire in 1 hour for security reasons. If you need
              a new link, you can request one on the login page.
            </Text>
          </Section>

          <Text className="text-gray-500 text-xs text-center mt-16">
            @2024 NextEasy. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ResetPassword.PreviewProps = {
  name: "alanturing",
  url: "https://nexteasy.io/reset-password",
} as ResetPasswordProps;

export default ResetPassword;
