import React, { Fragment, useEffect } from "react";

function ShipInfo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div style={{ width: "100%" }}>
        <h2 className="my-5 text-center">Livraison et Retour</h2>
        <h4 className="mb-3">Le transport de votre colis</h4>
        <p>
          Les colis sont généralement expédiés en 24h après réception de votre
          paiement (hors weekend et jour férié). Le mode d'expédition standard
          est le Chronopost Suivi. Nous vous fournirons dès que possible un lien
          qui vous permettra de suivre en ligne la livraison de votre colis.{" "}
          <br />
          Les frais d'expédition comprennent l'emballage, la manutention et les
          frais postaux. Nous vous conseillons de regrouper vos achats en une
          unique commande. Nous ne pouvons pas grouper deux commandes distinctes
          et vous devrez vous acquitter des frais de port pour chacune d'entre
          elles. <br />
          Votre colis est expédié à vos propres risques, un soin particulier est
          apporté au colis contenant des produits fragiles. Les colis sont
          surdimensionnés et protégés.
        </p>
        <h4 className="mt-5 mb-3">Satisfait ou remboursé</h4>
        <p>
          Tous les produits vendus bénéficient de la clause « satisfait ou
          remboursé » pendant 14 jours à compter de la date de livraison
          conformément aux dispositions du Code de la Consommation, article L
          121-20. Afin de faciliter le traitement du remboursement, tout retour
          doit être préalablement autorisé par Streetplace.fr. Vous devez donc
          en informer Streetplace.fr à l'adresse mail suivante :
          sav@Streetplace.fr.
          <br /> Le remboursement sera effectué uniquement sous forme d'un avoir
          valable un an sur l'ensemble du site. Le retour s'effectuera à
          l'adresse qui vous sera communiquée par l'équipe Streetplace.fr Pour
          plus de détails, veuillez vous référer à nos conditions générales de
          vente.
        </p>
      </div>
    </Fragment>
  );
}

export default ShipInfo;
