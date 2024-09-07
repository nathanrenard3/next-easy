export const config = {
  stripe: {
    // Configure the products that are available for purchase (subscription)
    products: [
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Basic",
        description: "Basic plan for 1 location",
        price: 2900, // Price in cents
        features: ["10 users", "10 locations", "1000 orders", "1000 invoices"],
      },
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Pro",
        description: "Pro plan for 1 location",
        price: 7000, // Price in cents
        features: [
          "10 users",
          "10 locations",
          "1000 orders",
          "1000 invoices",
          "1000 customers",
          "1000 employees",
          "1000 suppliers",
        ],
      },
      {
        priceId: "price_1P4Z03FZvKYlo2cY015Z055Y",
        name: "Enterprise",
        description: "Enterprise plan for 1 location",
        price: 11000, // Price in cents
        features: [
          "10 users",
          "10 locations",
          "1000 orders",
          "1000 invoices",
          "1000 customers",
          "1000 employees",
          "1000 suppliers",
          "1000 products",
          "1000 orders",
        ],
      },
    ],
  },
};
