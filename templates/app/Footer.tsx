"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-auto"
    >
      <div className="container">
        <div className="flex justify-center">
          <span className="text-sm text-gray-500 text-center">
            Programme de fidélité réalisé avec ❤️ à l'aide d'
            <Link href="/" className="hover:text-primary transition-colors">
              Iconik
            </Link>
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
