export const config: Config = {
  // App configuration
  name: "NextEasy",
  // Socials configuration (for footer of landing page)
  socials: {
    twitter: "https://twitter.com/nexteasy", // null to hide
    instagram: "https://www.instagram.com/nexteasy",
    linkedin: "https://www.linkedin.com/nexteasy",
    github: "https://www.github.com/nexteasy",
  },
  // Landing page configuration
  landing: {
    hero: {
      title: "The best boilerplate to start your project easily and quickly",
      description: {
        title:
          "Kickstart your project with our optimized Next.js boilerplate, built to accelerate development and provide the tools you need for scalable applications.",
        highlight: "accelerate development", // Choose a word to highlight in the description (put null to disable)
      },
      callToAction: {
        label: "Get started",
        href: "/dashboard",
      },
      image: "https://placehold.co/1920x1080?text=Hero+Image",
    },
    features: {
      title: "Features",
      description: "Powerful tools to accelerate your development",
      list: [
        {
          title: "Optimized Architecture",
          description:
            "A carefully organized project structure for optimal scalability and maintainability, enabling rapid and efficient development.",
          image: "https://placehold.co/1920x1080?text=Optimized+Architecture",
          callToAction: null,
        },
        {
          title: "Ready-to-Use Components",
          description:
            "A rich library of reusable and customizable components designed to speed up your user interface development.",
          image: "https://placehold.co/1920x1080?text=Ready-to-Use+Components",
          callToAction: {
            label: "Get started",
            href: "/dashboard",
          },
        },
        {
          title: "Easy Integration",
          description:
            "Pre-established configurations for authentication, state management, and APIs, allowing you to focus on your application's business logic.",
          image: "https://placehold.co/1920x1080?text=Easy+Integration",
          callToAction: null,
        },
      ],
    },
    statistics: {
      title: "Impact on Development",
      description: "How NextEasy boosts your project",
      list: [
        {
          title: "Setup Time Reduced",
          suffix: "%",
          description: "70",
        },
        {
          title: "Development Speed Increase",
          suffix: "%",
          description: "40",
        },
        {
          title: "Code Reusability",
          suffix: "%",
          description: "80",
        },
        {
          title: "Time-to-Market Reduction",
          suffix: "%",
          description: "35",
        },
      ],
    },
    testimonials: {
      title: "Testimonials",
      description: "What Developers Say About Our Boilerplate",
      list: [
        {
          name: "Example 1",
          role: "Frontend Developer",
          img: "https://randomuser.me/api/portraits/women/12.jpg",
          description:
            "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
        },
        {
          name: "Example 2",
          role: "CTO at TechStartup",
          img: "https://randomuser.me/api/portraits/men/45.jpg",
          description:
            "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
        },
        {
          name: "Example 3",
          role: "Lead Developer at WebAgency",
          img: "https://randomuser.me/api/portraits/women/83.jpg",
          description:
            "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
        },
        {
          name: "Example 1",
          role: "Frontend Developer",
          img: "https://randomuser.me/api/portraits/women/12.jpg",
          description:
            "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
        },
        {
          name: "Example 2",
          role: "CTO at TechStartup",
          img: "https://randomuser.me/api/portraits/men/45.jpg",
          description:
            "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
        },
        {
          name: "Example 3",
          role: "Lead Developer at WebAgency",
          img: "https://randomuser.me/api/portraits/women/83.jpg",
          description:
            "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
        },
        {
          name: "Example 1",
          role: "Frontend Developer",
          img: "https://randomuser.me/api/portraits/women/12.jpg",
          description:
            "This Next.js boilerplate has been a game-changer for our development process. We've cut our initial setup time by 70% and significantly improved our project structure. Highly recommended for any React team.",
        },
        {
          name: "Example 2",
          role: "CTO at TechStartup",
          img: "https://randomuser.me/api/portraits/men/45.jpg",
          description:
            "As a startup, we need to move fast. This boilerplate helps us stay ahead of the curve. Our development efficiency has improved by 50%, and we're shipping features faster than ever. An essential tool for any tech startup.",
        },
        {
          name: "Example 3",
          role: "Lead Developer at WebAgency",
          img: "https://randomuser.me/api/portraits/women/83.jpg",
          description:
            "The pre-built components and optimized setup have made our projects more consistent and efficient. We've seen a 40% reduction in bug reports and a notable increase in client satisfaction. A must-have for web agencies.",
        },
      ],
    },
    pricings: {
      title: "Pricing",
      description: "Choose the plan that best suits your needs",
      // The list of plans is defined in the stripe section below
    },
    questions: {
      title: "FAQ",
      description: "Frequently asked questions",
      list: [
        {
          question: "What is NextEasy?",
          answer: "NextEasy is a boilerplate for Next.js.",
        },
        {
          question: "What technologies are used in this boilerplate?",
          answer:
            "This boilerplate is built with Next.js, TailwindCSS, Shadcn / Magic UI, NextAuth, Prisma, Resend and Supabase.",
        },
        {
          question: "Is this boilerplate open source?",
          answer:
            "Yes, this boilerplate is open source. You can find the source code on GitHub.",
        },
      ],
    },
    socialsProofs: {
      title: "Our Partners",
      description: "Innovating Together for the Future",
      list: [
        {
          name: "Example Tech 1",
          logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Tech+1",
        },
        {
          name: "Example Software 2",
          logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Software+2",
        },
        {
          name: "Example Dev 3",
          logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Dev+3",
        },
        {
          name: "Example Cloud 4",
          logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+Cloud+4",
        },
        {
          name: "Example AI 5",
          logo: "https://placehold.co/200x100/FFFFFF/000000.png?text=Example+AI+5",
        },
      ],
    },
    callToAction: {
      image: "https://placehold.co/600x400/png", // null to hide (use only in CallToActionTwo)
      title: "Ready to get started?",
      description: "Join our platform and start your project today!",
      callToAction: {
        label: "Get started",
        href: "/dashboard",
      },
    },
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
