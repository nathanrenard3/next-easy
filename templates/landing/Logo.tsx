"use client";

import { useTheme } from "next-themes";
import { config } from "@/config";
import Image from "next/image";

const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const logoSrc =
    currentTheme === "dark" ? config.logo.dark : config.logo.light;

  return (
    <Image
      className="z-50 w-[120px] md:w-[140px]"
      src={logoSrc}
      alt={config.name}
      width={120}
      height={20}
      priority
    />
  );
};

export default Logo;
