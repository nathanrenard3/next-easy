import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { config } from "@/config";

const Footer = () => {
  const socialIcons = [
    { name: "twitter", icon: TwitterLogoIcon, url: config.socials.twitter },
    {
      name: "instagram",
      icon: InstagramLogoIcon,
      url: config.socials.instagram,
    },
    { name: "linkedin", icon: LinkedInLogoIcon, url: config.socials.linkedin },
  ];

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
            {socialIcons.map(
              (social) =>
                social.url && (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <social.icon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                  </a>
                )
            )}
          </div>
        </div>
        <div className="text-center md:text-left">
          <span className="text-sm text-gray-500">
            © 2024{" "}
            <Link href="/" className="hover:text-primary transition-colors">
              {config.name}
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
