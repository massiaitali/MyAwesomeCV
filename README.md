# My Awesome CV
Projet d'APP5 initié en cours de XML. Le principe est de générer automatiquement son CV en partant des informations trouvé sur le web (compte Github & Linkedin)

## Développement
Il faut dans un premier temps et à chaque modification du package.json, installer les différentes dépendances
```
npm install
```

Ensuite pour compiler notre projet une unique fois (par exemple pour la mise en production), il suffit de taper :
```
npm run build
```
Ce script compilera les sources javascript vers de l'ECMAScript 5, ainsi que les styles SCSS pour rendre les fichiers CSS.

Il est aussi possible de faire de la compilation automatique, durant le développement il est préférable d'utiliser la commande :
```
npm run watch
```
Cette commande génère un serveur web qui se réactualisera à chaque modification du code