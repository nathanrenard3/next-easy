"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const SessionProviderWrapper = ({ children }: Props) => {
  return <SessionProvider session={null}>{children}</SessionProvider>;
};
