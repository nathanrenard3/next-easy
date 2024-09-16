import { Metadata } from "next";
import { config } from "@/config";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: `${config.name} - Reset password`,
};

const ResetPassword = () => {
  return <ResetPasswordClient />;
};

export default ResetPassword;
