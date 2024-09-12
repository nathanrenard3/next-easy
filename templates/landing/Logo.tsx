"use client";

import { useTheme } from "next-themes";
import { config } from "@/config";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState(config.logo.dark);

  useEffect(() => {
    setCurrentLogo(
      resolvedTheme === "light" ? config.logo.light : config.logo.dark
    );
  }, [resolvedTheme]);

  return (
    <Image
      className="z-50 w-[90px] md:w-[110px]"
      src={currentLogo}
      alt={config.name}
      width={110}
      height={20}
      priority
    />
  );
};

export default Logo;
