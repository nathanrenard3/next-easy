const LegalNotices = () => {
  const sections = [
    {
      title: "1. Website Hosting",
      content: [
        "Vercel",
        "Vercel Inc. 340 S Lemon Ave #4133 Walnut, CA 91789 USA",
        "Phone: (559) 288-7060",
      ],
    },
    {
      title: "2. Domain Name Hosting",
      content: [
        "Hostinger",
        "HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Cyprus",
        "Email: https://www.hostinger.com/contact",
      ],
    },
  ];

  return (
    <div className="container mx-auto md:my-28">
      <h1 className="text-3xl font-bold mb-6">Legal Notices</h1>
      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          {section.content.map((item, itemIndex) => (
            <p key={itemIndex}>{item}</p>
          ))}
        </section>
      ))}
    </div>
  );
};

export default LegalNotices;
