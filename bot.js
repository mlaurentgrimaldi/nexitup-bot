const API_KEY = "TA_CLE_ICI";

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

  services: `🛎️ SERVICES TRANSPORTS

HEPPNER:
- Star Priority -> Assure le délai contractuel de livraison
- Star Priority 13 -> Assure le délai contractuel de livraison avant 13h00
- Star Date -> Assure une livraison a une date précise
- Star RDV -> Assure une livraison avec prise de RDV

CHRONOPOST:
- Chrono 13 -> Assure le délai contractuel de livraison avant 13h00
- Chrono 10 -> Assure le délai contractuel de livraison avant 10h00
- Pick and collect -> Livraison dans un point relais choisi par le client`,

  incoterm: `📋 QUEL INCOTERM SAISIR ?

- Enlèvement client dans nos locaux → EXW
- Livraison en France → DDP
- Livraison en colis Chronopost à l'étranger → DAP
- Livraison en palettes à l'étranger :
  • Transport Aérien → CPT
  • Transport Maritime → CFR
  • Post-acheminement géré par nos soins → DAP`,

  bdu: `🔐 BDU ET LICENCES EXPORT

Pour savoir si une commande contient des Biens à Double Usage (BDU) et si une licence d'exportation est nécessaire, suivre cette procédure :
OUTIL → Fichier Excel "Correspondance BDU 2026" fourni par Marie GRIMALDI.

1️⃣ Dans la colonne D "code article", saisir les références articles Netsuite stockés de la commande
2️⃣ Indiquer le pays de destination dans la cellule H
3️⃣ Si des articles sont des BDU, les colonnes ECCN et ANSSI se complètent automatiquement. Si "Non trouvé" est indiqué, ce ne sont pas des BDU.
4️⃣ Vérifier les cellules de résultat :
   - Cellule H5 = "OUI" → export possible sous licence EU008
   - Cellule H6 = "OUI" → licence individuelle obligatoire
   - Cellule H6 = "NON" → pas de licence individuelle nécessaire

LICENCE INDIVIDUELLE :
📩 Faire la demande par email à Marie GRIMALDI
Un document sera remis à faire compléter, signer et tamponner par le client
⏳ Délais d'obtention : 4 à 6 semaines`,

  tracking: `🔍 TRACKING INTROUVABLE ?

Le tracking de chaque commande se trouve dans la "LC" correspondante au numéro de livraison dans NETSUITE.
Un lien https est disponible dans le champ 👉 TRACKING COLIS

Si aucun lien https n'est présent, deux cas possibles :

1) COMMANDE EXPORT : le tracking a été envoyé par mail avec les documents export au responsable du compte ainsi qu'à la personne ayant saisi la commande.

2) GROUPAGE CLIENT : le champ TRANSPORTEUR indique :
   - "RH-CH" = regroupement de colis expédiés par Chronopost
   - "Classic" = regroupement en palette Heppner
   -> Pour retrouver le tracking, aller dans le compte client et ouvrir les LC expédiées à la même date. L'une d'elles contient le tracking. 🙂`,

  groupage: `📅 GROUPAGES CLIENT HEBDOMADAIRES

- ACRT VILLEFRANCHE : Lundis et Mercredis
- ACRT BOURG : Lundis
- TIMS : Lundis et Mercredis
- SYBORD et MULTIPHONE : Mardis et Vendredis
- ABC TELEPHONIE : Mercredis et Vendredis
- ATELSYS : Mercredis et Vendredis
- ACTION TELECOM, ACTION TELECOM ATLANTIQUE et ACTION TELECOM OCCITANIE : Vendredis
- MACON COMMUNICATION et MY TELECOM ENTREPRISE : Mardis`,

  cutt: '🕓 Cutt-off Expédition
- PALETTES → 16h00
- COUPES → 15h30
- COLIS → 17h00 (16h00 les vendredis)',
};

function afficherReponse(cle, boxId, event) {

  document.querySelectorAll(".reponse-box").forEach(box => {
    box.style.display = "none";
  });

  document.querySelectorAll(".suggestion").forEach(btn => {
    btn.classList.remove("actif");
  });

  const box = document.getElementById(boxId);
  box.style.display = "block";
  box.textContent = REPONSES[cle];

  // sécurisation (évite crash si event absent)
  if (event && event.target) {
    event.target.classList.add("actif");
  }

  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'AC NEXITUP. Tu réponds aux questions internes de l'équipe de manière professionnelle et concise.`;

let historique = [];

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  afficherMessage(message, "user");
  input.value = "";
  historique.push({ role: "user", parts: [{ text: message }] });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: historique
        })
      }
    );

    const data = await response.json();
    const reponse = data.candidates[0].content.parts[0].text;

    historique.push({ role: "model", parts: [{ text: reponse }] });
    afficherMessage(reponse, "bot");

  } catch (error) {
    afficherMessage("Erreur de connexion.", "bot");
  }
}

function afficherMessage(texte, type) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

function suggestionClick(texte) {
  const input = document.getElementById("user-input");
  if (input) {
    input.value = texte;
  }
  sendMessage();
}
