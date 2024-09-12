import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { config } from "@/config";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-screen grid lg:grid-cols-5 lg:gap-20 bg-background/50">
      <Link
        href="/"
        className="absolute top-6 left-6 text-primary lg:text-muted z-50"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </Link>
      <div className="hidden lg:block lg:col-span-2 bg-primary h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="uppercase text-2xl lg:text-3xl text-center font-bold text-secondary mb-8">
            Access to {config.name}
          </h1>
        </div>
      </div>
      <div className="relative col-span-5 lg:col-span-3 flex flex-col justify-center px-10">
        {children}
      </div>
    </section>
  );
}
