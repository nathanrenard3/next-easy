import { authOptions } from "@/lib/db/authOptions";
import { cn } from "@/lib/utils";
import Footer from "@/templates/landing/Footer";
import Navbar from "@/templates/landing/Navbar";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";

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
      {children}
      <Footer />
    </div>
  );
}
