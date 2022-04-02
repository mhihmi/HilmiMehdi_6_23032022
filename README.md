# OC_P6_Piiquante : Construisez une API sécurisée pour une application d'avis gastronomiques

<div align="right">

[![HitCount](https://hits.dwyl.com/mhihmi/HilmiMehdi_6_23032022.svg?style=flat&show=unique)](# "Unique view count")
[![HitCount](https://hits.dwyl.com/mhihmi/HilmiMehdi_6_23032022.svg?style=flat)](# "All view count")

</div>

This is the back end for Project 6 of Openclassrooms Web Developer path.

### Back end Prerequisites

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation

- Clone this repo, run `npm install` from within the project directory. 
- You can then run the server with `npm start`.
- You can also run it with server refresh using `nodemon server`. (use `npm install -g nodemon` before).
- Add DB_ID, DB_PASS, DB_NAME, and DB_CLUSTER for your Database in a .env file in root folder. (you can use and rename `.env_exemple` file)
- Add JWT_KEY, MAIL_CRYPTO_KEY for JWT salt and mail encrypt in a .env file in root folder. (you can use and rename `.env_exemple` file)
  
The server should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

### Front end Repository

- You can use this API with the [front-end repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)

-------
# Présentation du Projet

> Construire une API fonctionnelle permettant de stocker des données pour une application web.

## Scénario :

Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .

<p align="center">
  <img src="https://github.com/mhihmi/HilmiMehdi_6_23032022/blob/main/images/Readme/PiiquanteLogo.png" width="50%"/>
</p>

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

## Livrables attendus :

- Un fichier zip contenant le **code de l'API**.

## Compétences évaluées

* Stocker des données de manière sécurisée 
* Mettre en œuvre des opérations CRUD de manière sécurisée 
* Implémenter un modèle logique de données conformément à la réglementation 