export const config = {
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
    from: "noreply@nexteasy.fr",
    templates: {
      welcome: {
        subject: "Welcome to NextEasy platform",
      },
      resetPassword: {
        subject: "Reset your password",
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
