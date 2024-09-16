import WelcomeTemplate from "@/emails/register";
import ResetPasswordTemplate from "@/emails/reset-password";

export const config: Config = {
  // App configuration
  name: "NextEasy",
  defaultTheme: "dark",
  logo: {
    light: "/logo-light.svg", // Logo for light theme
    dark: "/logo-dark.svg", // Logo for dark theme
  },
  // Socials configuration (for footer of landing page)
  socials: {
    twitter: null, // null to hide
    instagram: null,
    linkedin: null,
    github: "https://github.com/nathanrenard3/next-easy",
  },
  // Blog configuration
  blog: {
    display: true,
    postsPerPage: 6,
    // Card meta configuration (what is displayed on the blog card)
    cardMeta: {
      title: true,
      image: true,
      date: true,
      category: true,
      excerpt: true,
    },
  },
  // Documentation configuration
  documentation: {
    display: true,
    baseUrl: "/docs/getting-started/introduction", // The base url is where the button to access the documentation redirect
  },
  // Stripe configuration
  stripe: {
    // Configure the products that are available for purchase (subscription)
    products: [
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Basic",
        description: "Basic plan for 1 location",
        mostPopular: false,
        price: 2900, // Price in cents
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      },
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Pro",
        description: "Pro plan for 1 location",
        mostPopular: true,
        price: 7000, // Price in cents
        features: [
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4",
          "Feature 5",
          "Feature 6",
          "Feature 7",
        ],
      },
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Enterprise",
        description: "Enterprise plan for 1 location",
        mostPopular: false,
        price: 11000, // Price in cents
        features: [
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4",
          "Feature 5",
          "Feature 6",
          "Feature 7",
          "Feature 8",
          "Feature 9",
        ],
      },
    ],
    mode: "subscription", // "payment" or "subscription"
    allow_promotion_codes: true, // If true, the promotion codes can be used
    payment_success_url: `${process.env.URL_FRONT}/success`,
    payment_cancel_url: `${process.env.URL_FRONT}/cancel`,
  },
  // Email configuration
  email: {
    from: "noreply@nexteasy.fr", // Use for sending emails in production
  },
};
