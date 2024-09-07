import React from "react";

const PrivacyPolicy = () => {
  const lastUpdated = "20 août 2024";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Politique de Confidentialité d'Iconik
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Iconik est une application SaaS (Software as a Service) qui permet aux
          commerçants de créer des programmes de fidélité et aux consommateurs
          de gagner des récompenses en achetant chez eux. Chez Iconik, nous nous
          engageons à protéger votre vie privée et vos données personnelles.
          Cette politique de confidentialité explique comment nous collectons,
          utilisons, partageons et protégeons vos informations personnelles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Collecte des Informations
        </h2>
        <p>Nous collectons les informations suivantes :</p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Informations d'identification : nom, prénom, adresse e-mail, numéro
            de téléphone
          </li>
          <li>
            Informations professionnelles : nom de l'entreprise, adresse, ville,
            code postal
          </li>
          <li>
            Informations de paiement : nous utilisons Stripe pour traiter les
            paiements et ne stockons pas directement vos informations de carte
            de crédit
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Utilisation des Informations
        </h2>
        <p>Nous utilisons vos informations pour :</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Fournir et améliorer nos services</li>
          <li>Personnaliser votre expérience utilisateur</li>
          <li>Communiquer avec vous concernant votre compte et nos services</li>
          <li>Traiter les paiements et gérer les abonnements</li>
          <li>
            Analyser l'utilisation de notre plateforme pour améliorer nos offres
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Partage des Informations
        </h2>
        <p>
          Nous ne vendons pas vos informations personnelles. Nous pouvons
          partager vos informations avec :
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            Des fournisseurs de services tiers qui nous aident à exploiter notre
            plateforme (par exemple, Stripe pour le traitement des paiements)
          </li>
          <li>Des autorités légales si nous y sommes légalement tenus</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Protection des Données
        </h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et
          organisationnelles pour protéger vos données personnelles contre tout
          accès non autorisé, perte ou altération.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Vos Droits</h2>
        <p>Vous avez le droit de :</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Accéder à vos données personnelles</li>
          <li>Rectifier vos données personnelles si elles sont inexactes</li>
          <li>Demander la suppression de vos données personnelles</li>
          <li>Vous opposer au traitement de vos données personnelles</li>
          <li>Demander la portabilité de vos données</li>
        </ul>
        <p className="mt-2">
          Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail
          fournie ci-dessous.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Cookies et Technologies Similaires
        </h2>
        <p>
          Nous utilisons des cookies et des technologies similaires pour
          améliorer votre expérience sur notre plateforme. Vous pouvez gérer vos
          préférences en matière de cookies dans les paramètres de votre
          navigateur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          8. Modifications de la Politique de Confidentialité
        </h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Toute modification sera publiée sur
          cette page avec une date de mise à jour.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Plaintes</h2>
        <p>
          Vous conservez le droit d’introduire une réclamation auprès de
          l’autorité de contrôle (CNIL), sur son site internet, via le lien
          suivant : https://www.cnil.fr/fr/plaintes ou par adresse postale :
          Service des Plaintes – 3 Place de Fontenoy – TSA 80715 – 75334 PARIS
          CEDEX 07.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Nous Contacter</h2>
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité, veuillez nous contacter à :
        </p>
        <p className="mt-2">
          <a
            href="mailto:iconik802@gmail.com"
            className="text-primary hover:underline"
          >
            iconik802@gmail.com
          </a>
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-8">
        Dernière mise à jour : {lastUpdated}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
