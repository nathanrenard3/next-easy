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
        NextEasy is a boilerplate project based on Next.js. It provides a
        foundational structure for quickly creating modern web applications.
        These Terms of Service govern the use of the NextEasy project and all
        associated services.
      </p>
    ),
  },
  {
    title: "2. Acceptance of Terms",
    content: (
      <p>
        By using NextEasy, you fully and unreservedly accept these Terms of
        Service. If you do not agree with these terms, please do not use this
        project.
      </p>
    ),
  },
  {
    title: "3. Description of Services",
    content: (
      <>
        <p>NextEasy provides the following services:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>A preconfigured architecture for Next.js</li>
          <li>Routing and static page management</li>
          <li>Basic components and hooks for starting a web app</li>
          <li>Initial setup for authentication and APIs</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Registration and User Account",
    content: (
      <>
        <p>
          4.1 Since NextEasy is an open-source project, no user account is
          required to use it.
        </p>
        <p>
          4.2 If you contribute to the project, you are responsible for
          following open-source best practices and ensuring the confidentiality
          of your credentials on version control platforms (e.g., GitHub).
        </p>
      </>
    ),
  },
  {
    title: "5. User Obligations",
    content: (
      <>
        <p>By using NextEasy, you agree to:</p>
        <p>
          5.1 Comply with all applicable laws and respect the rights of third
          parties.
        </p>
        <p>5.2 Not use the project for illegal or unauthorized purposes.</p>
        <p>
          5.3 Not attempt to disrupt or compromise the integrity or security of
          the project or its users.
        </p>
      </>
    ),
  },
  {
    title: "6. Intellectual Property",
    content: (
      <>
        <p>
          6.1 NextEasy and its content are protected by open-source licenses
          (e.g., MIT, GPL).
        </p>
        <p>
          6.2 You are free to use, modify, and distribute the project, provided
          you comply with the terms of the applicable license.
        </p>
      </>
    ),
  },
  {
    title: "7. Personal Data Protection",
    content: (
      <>
        <p>
          7.1 NextEasy does not collect personal data as it is an open-source
          project.
        </p>
        <p>
          7.2 If you deploy an application based on NextEasy, you are
          responsible for handling the personal data of your users in accordance
          with applicable laws.
        </p>
      </>
    ),
  },
  {
    title: "8. Subscriptions and Payments",
    content: (
      <p>
        8.1 NextEasy is a free and open-source project. No subscription or
        payment is required to use it.
      </p>
    ),
  },
  {
    title: "9. Termination",
    content: (
      <>
        <p>9.1 You may stop using NextEasy at any time without notice.</p>
        <p>
          9.2 We reserve the right to withdraw access to the project or modify
          its features at any time.
        </p>
      </>
    ),
  },
  {
    title: "10. Limitation of Liability",
    content: (
      <>
        <p>
          10.1 NextEasy is provided "as is" and we do not guarantee it will be
          free from errors or interruptions.
        </p>
        <p>
          10.2 We will not be liable for indirect damages resulting from the use
          of NextEasy.
        </p>
      </>
    ),
  },
  {
    title: "11. Changes to the Terms",
    content: (
      <p>
        We reserve the right to modify these Terms of Service at any time.
        Changes will be posted on this page with an updated date.
      </p>
    ),
  },
  {
    title: "12. Governing Law and Jurisdiction",
    content: (
      <p>
        These Terms of Service are governed by French law. Any dispute relating
        to their interpretation or execution falls under the exclusive
        jurisdiction of French courts.
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

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Terms of Service of {config.name}
      </h1>

      {sections.map(renderSection)}

      <p className="mt-8 text-sm text-gray-600">Last updated: {LAST_UPDATED}</p>
    </div>
  );
};

export default TermsOfService;
