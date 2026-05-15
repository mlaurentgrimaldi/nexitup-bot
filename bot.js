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

  incoterm: `📋 QUEL INCOTERM SAISIR ?

🏭 Enlèvement client dans nos locaux (comptoir ou dépôt) → EXW

🇫🇷 Livraison à une adresse en France → DDP

📦 Envoi en colis Chronopost à l'étranger → DAP

🚀 Envoi en palettes à l'étranger :
   • Transport aérien → CPT
   • Transport maritime → CFR
   • Nous gérons le post-acheminement → DAP`,

  bdu: `🔐 BDU ET LICENCES EXPORT

Utiliser le fichier Excel "Correspondance BDU 2026" fourni par Marie GRIMALDI.

ÉTAPES :
1️⃣ Saisir les références articles Netsuite dans la colonne D "code article"
2️⃣ Indiquer le pays de destination dans la cellule H
3️⃣ Si colonnes ECCN et ANSSI = "Non trouvé" → pas un BDU
4️⃣ Résultats :
   • Cellule H5 = OUI → export sous licence EU008 ✅
   • Cellule H6 = OUI → licence individuelle obligatoire ⚠️

📩 Demande de licence individuelle : contacter Marie GRIMALDI par email
📄 Un document sera à faire compléter, signer et tamponner par le client
⏳ Délais d'obtention : 4 à 6 semaines`,

  tracking: `🔍 TRACKING INTROUVABLE ?

Le tracking se trouve dans la LC correspondante au numéro de livraison dans NETSUITE → champ "TRACKING COLIS".

Si aucun lien :

1️⃣ COMMANDE EXPORT → le tracking a été envoyé par mail avec les documents export au responsable du compte et à la personne ayant saisi la commande.

2️⃣ GROUPAGE CLIENT → vérifier le champ TRANSPORTEUR :
   • "RH-CH" → regroupement Chronopost
   • "Classic" → regroupement palette Heppner
   👉 Aller dans le compte client et ouvrir les LC expédiées à la même date. L'une d'elles contient le tracking. 🙂`,

  groupage: `📅 GROUPAGES CLIENT HEBDOMADAIRES

- ACRT VILLEFRANCHE → Lundis et Mercredis
- ACRT BOURG → Lundis
- TIMS → Lundis et Mercredis
- SYBORD et MULTIPHONE → Mardis et Vendredis
- ABC TELEPHONIE → Mercredis et Vendredis
- ATELSYS → Mercredis et Vendredis
- ACTION TELECOM, ACTION TELECOM ATLANTIQUE et ACTION TELECOM OCCITANIE → Vendredis
- MACON COMMUNICATION et MY TELECOM ENTREPRISE → Mardis`
};

function afficherReponse(cle) {
  const box = document.getElementById("reponse-box");
  box.style.display = "block";
  box.textContent = REPONSES[cle];

  document.querySelectorAll(".suggestion").forEach(b => b.classList.remove("actif"));
  event.target.classList.add("actif");

  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Chatbot libre (gardé en bas)
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
  document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});

function suggestionClick(texte) {
  document.getElementById("user-input").value = texte;
  sendMessage();
}
