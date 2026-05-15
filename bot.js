const REPONSES = {

  chronopost: `📦 CONTACTER CHRONOPOST

📧 Email : service.client@chronopost.fr

📞 Téléphone National : 0892 70 25 07
Horaires : lundi au vendredi, 8h - 18h
Délais : 24 à 48h

📞 Téléphone Export : 0825 801 801
Délais : 72h ou plus selon destination`,



  heppner: `🚚 CONTACTER HEPPNER

📞 Téléphone : 04 72 23 40 66

📧 Email : audrey.pierrottet@heppner-group.com`,



delais: `🗺️ DÉLAIS DE LIVRAISON HEPPNER

⏱️ 24H — Départements :
01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 18, 21, 23, 24, 25, 26, 30, 31, 33, 34, 36, 37, 38, 39, 41, 42, 43, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 62, 63, 67, 68, 69, 70, 71, 73, 74, 75, 76, 77, 78, 80, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95

⏱️ 48H — Départements :
16, 17, 19, 22, 27, 28, 29, 32, 35, 40, 44, 47, 49, 50, 53, 56, 61, 64, 65, 72, 79, 81, 82, 85, 87`,


  incoterm: `📋 QUEL INCOTERM SAISIR ?

🏭 Enlèvement client dans nos locaux → EXW

🇫🇷 Livraison France → DDP

📦 Chronopost export → DAP

🚀 Palettes export :
• Aérien → CPT
• Maritime → CFR
• Post-acheminement géré → DAP`,



  bdu: `🔐 BDU ET LICENCES EXPORT

Utiliser le fichier Excel :
"Correspondance BDU 2026"

1️⃣ Saisir les références Netsuite
2️⃣ Indiquer le pays
3️⃣ Vérifier ECCN / ANSSI

📩 Contacter Marie GRIMALDI
⏳ Délais licence : 4 à 6 semaines`,



  tracking: `🔍 TRACKING INTROUVABLE ?

Le tracking se trouve dans la LC liée à la livraison dans NETSUITE.

Champ :
👉 TRACKING COLIS

Si aucun lien :
• vérifier les mails export
• vérifier les LC de groupage`,



  groupage: `📅 GROUPAGES CLIENT HEBDOMADAIRES

• ACRT VILLEFRANCHE → Lundis / Mercredis
• TIMS → Lundis / Mercredis
• SYBORD → Mardis / Vendredis
• ACTION TELECOM → Vendredis`
};





function afficherReponse(cle, boxId) {

  /* CACHE TOUTES LES REPONSES */

  document.querySelectorAll(".reponse-box").forEach(box => {
    box.style.display = "none";
  });




  /* RETIRE LES BOUTONS ACTIFS */

  document.querySelectorAll(".suggestion").forEach(btn => {
    btn.classList.remove("actif");
  });




  /* AFFICHE LA BONNE REPONSE */

  const box = document.getElementById(boxId);

  box.style.display = "block";

  box.textContent = REPONSES[cle];




  /* ACTIVE LE BON BOUTON */

  event.target.classList.add("actif");




  /* SCROLL DOUX */

  box.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

}
