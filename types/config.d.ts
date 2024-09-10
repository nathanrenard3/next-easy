type Social = string | null;

type Product = {
  priceId: string;
  name: string;
  description: string;
  mostPopular: boolean;
  price: number;
  features: string[];
};

type EmailTemplate = {
  subject: string;
  template: string;
};

// Main type
type Config = {
  name: string;
  defaultTheme: "light" | "dark";
  logo: {
    light: string;
    dark: string;
  };
  socials: {
    twitter: Social;
    instagram: Social;
    linkedin: Social;
    github: Social;
  };
  blog: {
    display: boolean;
    postsPerPage: number;
    cardMeta: {
      title: boolean;
      image: boolean;
      date: boolean;
      category: boolean;
      excerpt: boolean;
    };
  };
  documentation: {
    display: boolean;
    baseUrl: string;
  };
  stripe: {
    products: Product[];
    mode: "payment" | "subscription";
    allow_promotion_codes: boolean;
    payment_success_url: string;
    payment_cancel_url: string;
  };
  email: {
    from: string;
    templates: {
      welcome: EmailTemplate;
      resetPassword: EmailTemplate;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};
