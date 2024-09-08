export const config = {
  // App configuration
  name: "NextEasy",
  // Socials configuration (for footer of landing page)
  socials: {
    twitter: "https://twitter.com/nexteasy",
    instagram: "https://www.instagram.com/nexteasy",
    linkedin: "https://www.linkedin.com/nexteasy",
  },
  // Blog configuration
  blog: {
    display: true,
    title: "NextEasy Blog",
    subtitle: "The latest news and updates from the NextEasy team",
    description:
      "Stay informed about the latest trends in Next.js development, best practices for using our boilerplate, and tips to accelerate your project development.",
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
  // Stripe configuration
  stripe: {
    // Configure the products that are available for purchase (subscription)
    products: [
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Basic",
        description: "Basic plan for 1 location",
        price: 2900, // Price in cents
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      },
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Pro",
        description: "Pro plan for 1 location",
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
    templates: {
      welcome: {
        subject: "Welcome to NextEasy platform",
        template: "/emails/register.tsx",
      },
      resetPassword: {
        subject: "Reset your password",
        template: "/emails/reset-password.tsx",
      },
    },
  },
  // User configuration (for development)
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "admin@nexteasy.fr",
    password: "admin-password111!",
  },
};
