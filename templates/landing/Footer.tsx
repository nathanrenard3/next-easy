import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { config } from "@/config";
import Logo from "@/templates/landing/Logo";

const Footer = () => {
  const socialIcons = [
    { name: "twitter", icon: TwitterLogoIcon, url: config.socials.twitter },
    {
      name: "instagram",
      icon: InstagramLogoIcon,
      url: config.socials.instagram,
    },
    { name: "linkedin", icon: LinkedInLogoIcon, url: config.socials.linkedin },
    { name: "github", icon: GitHubLogoIcon, url: config.socials.github },
  ].filter((social) => social.url !== null);

  return (
    <footer className="container bg-transparent text-card-foreground rounded-lg w-full max-w-screen-2xl mx-auto px-6 md:px-8 py-8 md:py-12 mt-32 lg:mt-40">
      <div className="flex flex-col space-y-8">
        <hr className="border-border" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          {socialIcons.length > 0 && (
            <div className="flex items-center space-x-4">
              {socialIcons.map((social) => (
                <Link
                  key={social.name}
                  href={social.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <social.icon className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <span className="text-sm text-muted-foreground">
            © 2024{" "}
            <Link href="/" className="hover:text-primary transition-colors">
              {config.name}
            </Link>
            . All rights reserved.
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </span>
          <span className="text-sm text-muted-foreground ml-2">
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
