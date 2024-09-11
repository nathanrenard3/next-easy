"use client";

import { useTheme } from "next-themes";
import { config } from "@/config";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState(
    config.defaultTheme === "dark" ? config.logo.dark : config.logo.light
  );

  useEffect(() => {
    setCurrentLogo(
      resolvedTheme === "dark" ? config.logo.dark : config.logo.light
    );
  }, [resolvedTheme]);

  return (
    <Image
      className="z-50 w-[120px] md:w-[140px]"
      src={currentLogo}
      alt={config.name}
      width={120}
      height={20}
      priority
    />
  );
};

export default Logo;
