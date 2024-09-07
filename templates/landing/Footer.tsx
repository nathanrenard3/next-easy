import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg m-4 w-full max-w-screen-2xl mx-auto px-6 md:px-8 py-8 md:py-12">
      <div className="flex flex-col space-y-8">
        <hr className="border-gray-200" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              className="w-[110px]"
              src="/logo.svg"
              alt="logo"
              width={110}
              height={127}
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/nexteasy.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <InstagramLogoIcon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/company/nexteasy-fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <LinkedInLogoIcon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <span className="text-sm text-gray-500">
            © 2024{" "}
            <Link href="/" className="hover:text-primary transition-colors">
              NextEasy
            </Link>
            . All rights reserved.
          </span>
          <span className="text-sm text-gray-500 ml-2">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </span>
          <span className="text-sm text-gray-500 ml-2">
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </span>
          <span className="text-sm text-gray-500 ml-2">
            <Link
              href="/legal-notices"
              className="hover:text-primary transition-colors"
            >
              Legal Notices
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
