# TNT44 pour Android

Version 100 % tactile de TNT44, emballée en application Android avec Capacitor.
L'appli fonctionne hors ligne : sons importés et projets restent sur l'appareil.

## Contenu

- `www/` : l'application (une page, les polices, JSZip pour les packs .zip)
- `capacitor.config.json` : nom et identifiant de l'appli (`com.tounitek.tnt44`)
- `scripts/android-setup.mjs` : permissions micro, écran toujours allumé, icônes, numéro de version
- `resources/` : icônes TNT44
- `signing/debug.keystore` : clé de signature fixe, pour que chaque nouvelle version s'installe par-dessus l'ancienne
- `apk.yml` : la recette de compilation, à coller dans GitHub (voir plus bas)

## Obtenir l'APK sans rien installer (GitHub)

1. Crée un dépôt vide sur github.com, puis « uploading an existing file » : glisse tout le contenu de ce dossier et valide.
2. Onglet « Actions », lien « set up a workflow yourself ».
3. Nomme le fichier `apk.yml`, efface le texte proposé et colle à la place le contenu du fichier `apk.yml` de ce dossier.
4. « Commit changes » : la compilation démarre seule et dure quelques minutes.
5. Quand elle est verte, ouvre « Releases » (colonne de droite de l'onglet Code) : `TNT44.apk` y est.
6. Sur le téléphone ou la tablette : télécharge `TNT44.apk`, ouvre-le, autorise l'installation.

GitHub refuse les dossiers cachés envoyés par glisser-déposer, d'où l'étape 2 à la main.

## Ou compiler sur ton PC (Android Studio)

Il faut Node.js 22 ou plus et Android Studio.

```
npm install
npm run android
npm run open
```

Dans Android Studio : menu Build, puis « Build APK(s) ».

## À savoir

- Android 7.0 minimum.
- L'APK est signé avec une clé de test : parfait pour l'installer à la main, pas pour le Play Store.
- Les exports WAV vont dans `Documents/TNT44/` et ouvrent le menu de partage.
- Au premier appui sur Micro, Android demande l'autorisation d'enregistrer.
