import React, { Fragment } from "react";

function PaymentInfo() {
  return (
    <Fragment>
      <div style={{ width: "100%" }}>
        <h2 className="my-5 text-center">Paiement sécurisé</h2>
        <p className="mb-2" style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          Sur le site Streetplace.fr nous acceptons les moyens de paiement les
          plus courants du web : CB, VISA, MasterCard et Paypal Nous avons
          choisi pour vous la solution de paiement sécurisé Stripe.
        </p>
        <p>
          Stripe est une solution d’encaissement sécurisée sur Internet. Pour
          vous acheteur, avec Stripe vous pouvez acheter par carte sur
          Streetplace.fr avec une sécurité accrue des transactions. De l'autre
          côté, Paypal est un leader du paiement en ligne depuis plus de 10 ans.
          Pour vous acheteur, c’est un gage de sécurité. Avec PayPal : vous
          pouvez acheter sur Streetplace.fr avec votre compte Paypal. Paypal est
          présent dans 190 pays et permet d'accepter les moyens de paiement
          locaux avec lesquels un partenariat est établi.
        </p>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          {" "}
          Votre sécurité est notre priorité.
        </p>
        <p>
          Streetplace.fr et contribuent à protéger les informations concernant
          votre carte bancaire grâce aux meilleurs systèmes présents sur le
          marché pour la sécurité et la prévention contre la fraude.
        </p>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          Cryptage et protection des données.
        </p>
        <p>
          La sécurité Stripe sur l'utilisation du protocole de cryptage SSL
          (Secure Socket Layer). Cette technologie, qui utilise une clé de
          cryptage à 128 bits, est le protocole le plus utilisé dans le monde
          (plus de 80% des sites marchands utilisent SSL). Son rôle est basé
          pour l'essentiel : - sur le transport crypté du numéro de carte de
          votre client vers le serveur de paiement. - une demande d'autorisation
          systématique avec blocage immédiat de la transaction émanant de toute
          carte inexistante, perdue ou volée, signalée par le porteur à sa
          banque. Stripe offre un environnement sécurisé pour limiter les
          risques de fraude et d’impayés grâce 3D Secure qui authentifie le
          détenteur de la carte avant qu’il puisse finaliser la transaction.
        </p>
        <p>Streetplace.fr</p>
      </div>
    </Fragment>
  );
}

export default PaymentInfo;
