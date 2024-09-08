type Social = string | null;

type HeroSection = {
  title: string;
  description: {
    title: string;
    highlight: string | null;
  };
  callToAction: {
    label: string;
    href: string;
  };
  image: string;
};

type Feature = {
  title: string;
  description: string;
  image: string;
  callToAction: { label: string; href: string } | null;
};

type Statistic = {
  title: string;
  suffix: string;
  description: string;
};

type Testimonial = {
  name: string;
  role: string;
  img: string;
  description: string;
};

type Question = {
  question: string;
  answer: string;
};

type SocialProof = {
  name: string;
  logo: string;
};

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
  socials: {
    twitter: Social;
    instagram: Social;
    linkedin: Social;
    github: Social;
  };
  landing: {
    hero: HeroSection;
    features: {
      title: string;
      description: string;
      list: Feature[];
    };
    statistics: {
      title: string;
      description: string;
      list: Statistic[];
    };
    testimonials: {
      title: string;
      description: string;
      list: Testimonial[];
    };
    pricings: {
      title: string;
      description: string;
    };
    questions: {
      title: string;
      description: string;
      list: Question[];
    };
    socialsProofs: {
      title: string;
      description: string;
      list: SocialProof[];
    };
    callToAction: {
      image: string | null;
      title: string;
      description: string;
      callToAction: {
        label: string;
        href: string;
      };
    };
  };
  blog: {
    display: boolean;
    title: string;
    subtitle: string;
    description: string;
    postsPerPage: number;
    cardMeta: {
      title: boolean;
      image: boolean;
      date: boolean;
      category: boolean;
      excerpt: boolean;
    };
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
