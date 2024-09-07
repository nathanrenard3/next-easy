import React from "react";
import { config } from "@/config";

const LAST_UPDATED = "August 20, 2024";

type Section = {
  title: string;
  content: React.ReactNode;
};

const sections: Section[] = [
  {
    title: "1. Introduction",
    content: (
      <p>
        {config.name} is a boilerplate project based on Next.js. At{" "}
        {config.name}, we are committed to protecting your privacy and personal
        data. This privacy policy explains how we collect, use, share, and
        protect your personal information.
      </p>
    ),
  },
  {
    title: "2. Information Collection",
    content: (
      <>
        <p>We collect the following information:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Identification information: name, first name, email address, phone
            number
          </li>
          <li>
            Professional information: company name, address, city, postal code
          </li>
          <li>
            Payment information: we use Stripe to process payments and do not
            store your credit card information directly
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Information Usage",
    content: (
      <>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Provide and improve our services</li>
          <li>Personalize your user experience</li>
          <li>Communicate with you regarding your account and our services</li>
          <li>Process payments and manage subscriptions</li>
          <li>Analyze the usage of our platform to improve our offerings</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Information Sharing",
    content: (
      <>
        <p>
          We do not sell your personal information. We may share your
          information with:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Third-party service providers who assist us in operating our
            platform (e.g., Stripe for payment processing)
          </li>
          <li>Legal authorities if we are legally required to do so</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Data Protection",
    content: (
      <p>
        We implement technical and organizational security measures to protect
        your personal data from unauthorized access, loss, or alteration.
      </p>
    ),
  },
  {
    title: "6. Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Access your personal data</li>
          <li>Correct your personal data if it is inaccurate</li>
          <li>Request the deletion of your personal data</li>
          <li>Object to the processing of your personal data</li>
          <li>Request the portability of your data</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, please contact us at the email address
          provided below.
        </p>
      </>
    ),
  },
  {
    title: "7. Cookies and Similar Technologies",
    content: (
      <p>
        We use cookies and similar technologies to enhance your experience on
        our platform. You can manage your cookie preferences in your browser
        settings.
      </p>
    ),
  },
  {
    title: "8. Changes to the Privacy Policy",
    content: (
      <p>
        We reserve the right to modify this privacy policy at any time. Any
        changes will be posted on this page with an updated date.
      </p>
    ),
  },
  {
    title: "9. Complaints",
    content: (
      <p>
        You have the right to file a complaint with the relevant supervisory
        authority, such as the CNIL (French data protection authority), on their
        website via the following link: https://www.cnil.fr/en/plaintes or by
        postal address: Service des Plaintes – 3 Place de Fontenoy – TSA 80715 –
        75334 PARIS CEDEX 07, France.
      </p>
    ),
  },
];

const renderSection = ({ title, content }: Section) => (
  <section key={title} className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {content}
  </section>
);

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy of {config.name}
      </h1>

      {sections.map(renderSection)}

      <p className="text-sm text-gray-600 mt-8">Last updated: {LAST_UPDATED}</p>
    </div>
  );
};

export default PrivacyPolicy;
