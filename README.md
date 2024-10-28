# Projet Développement Environnement Mobile
## Thème : Journal de rêves
Objet : Créer une application mobile immersive et enrichissante qui offre une expérience complète de l'enregistrement, de l'analyse et du partage des rêves
Template imposé : expo-template-tabs
Librairie graphique conseillée : React Native Paper

## Formulaire : 
Les champs modifiés/ajoutés sont dans le dossier components/DreamForm.tsx.

- Date et Heure du rêve (Auto renseignée dans la liste de rêves)
- Type de rêve (Menu déroulant -> Lucide, Non Lucide, Prémonitoire, Cauchemar, Récurrent, etc.)
- Tags ou Mots-clés associés au rêve (Champ qui crée les tags sous forme de puces, on peut en renseigner autant que l'on veut)
- État émotionnel avant et après le rêve (Champ de texte)
- Personnages présents dans le rêve (Champ de texte)
- Lieu du rêve (Champ de texte)
- Signification personnelle du rêve (Champ de texte)
- Tonalité globale du rêve (positive, négative, neutre) (Dropdown)
- Intensité émotionnelle (Dropdown)
- Qualité du sommeil ressentie (Dropdown)
- Clarté du rêve (Dropdown)

## Liste des rêves : 
Le composant est dans le dossier components/DreamList.tsx.

- Stockage des rêves dans le Async Storage
- Affichage des rêves sous forme de Card avec toutes les informations renseignées au préalable
- Possibilité de Modifier le rêve
- Possibilité de Supprimer le rêve
- Possibilité de vider sa liste de rêves

## Lancement du Projet
Outils nécessaires :
- Node.js (https://nodejs.org/en/download/package-manager)
  
Cloner le repository
$ git clone (lien du projet)

Dans le dossier du projet, ouvrir un terminal Bash et installer les dépendances :
- npm install
- npx expo install react-native-paper -- --save

Dépendances à installer si problème de compatibilité SDK:
- npm install --save @expo/config@8.1.1
- npm install --save @expo/metro-config@0.10.0
  
Scannez le Qr code avec l'application mobile Expo pour voir le rendu Mobile.
Tapez R dans l'invite de commande pour voir le rendu sur format web.




