import { cn } from "@/lib/utils";
import Footer from "@/templates/landing/Footer";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Navbar from "@/templates/landing/Navbar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isSignedIn = !!session;

  return (
    <div className={cn("overflow-x-hidden", poppins.className)}>
      <Navbar isSignIn={isSignedIn} />
      <div className="my-20">{children}</div>
      <Footer />
    </div>
  );
}
