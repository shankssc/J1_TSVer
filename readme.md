# J1 (TS Ver)

## 📖 Table of Contents

- [About](#📝-about)
- [Screenshots](#📸-screenshots)
- [Tech Stack](#💻-tech-stack)
- [Overview](#📚-overview)

## 📝 About

What is J1? is my attempt to make a full-stack food/grocery delivery mobile app resembling the UI and functionalities of Uber eats and DoorDash. The roles that come with the app are Customers, Business owners, Deliverers, and Administrators. Right now the app is in very initial stages but over time, I will add features and microservices necessary for a fully functional food delivery app.

## 📸 Screenshots

Will update once I have the TS version of the frontend up and running

## 💻 Tech Stack

### Frontend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=plastic&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=plastic&logo=redux&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=plastic&logo=expo&logoColor=#D04A37)

### Backend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=plastic&logo=mongodb&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-%23E10098?style=plastic&logo=graphql&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=plastic&logo=apollo-graphql)
![Type-graphql](https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=plastic)
![Mongoose](https://img.shields.io/badge/-Mongoose-%23C0392D?style=plastic&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-black?style=plastic&logo=JSON%20web%20tokens)
![Redis Badge](https://img.shields.io/badge/-Redis-%23DC382D?style=plastic&logo=redis&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-%23C21325?style=plastic&logo=jest&logoColor=%23C21325&color=000000)

## 📚 Overview

### Backend

The server is responsible for handling backend functionalities of the application. It serves (No pun intended) as the central component that processes requests from the client, interacts with the database and manages the business logic of the app

### Technologies used

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white&color=E5177D&labelColor=000000) TS was chosen as it not only provides all the functionalities of base JS but also includes static typing and enhanced developer experience.
- ![GraphQL](https://img.shields.io/badge/-GraphQL-%23E5177D?style=plastic&logo=graphql&logoColor=%23E5177D&labelColor=000000) Using a query language for API specification comes with efficient data fetching and flexible data querying.
- ![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white&color=E5177D&labelColor=000000) The scalable and non-blocking runtime environment of Node.js is ideal for server-side development.
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB&color=E5177D&labelColor=000000) Using Express as a middleware to the apollo server.
- ![Apollo-server](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=plastic&logo=apollo-graphql&color=E5177D&labelColor=000000) Used for implementing a GraphQL powered server and for implementing schema generation, resolvers and data validation.
- ![TypeGraphQL](https://img.shields.io/badge/-TypeGraphQL-%23C04392?style=plastic&color=E5177D&labelColor=000000) TypeGraphQL leverages TypeScript decorators and thus simplifies the process of building graphQL schemas and resolvers.
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=plastic&logo=mongodb&logoColor=white&color=E5177D&labelColor=000000) MongoDB was chosen for the initial phases of the development due to it's flexibility, scalability and compatibility with GraphQL.
- ![Mongoose](https://img.shields.io/badge/-Mongoose-%23C0392D?style=plastic&logo=mongodb&color=E5177D&labelColor=000000) Without a doubt the best ODM library for interacting with the database.
- ![ioredis](https://img.shields.io/badge/-Redis-%23DC382D?style=plastic&logo=redis&logoColor=white&color=E5177D&labelColor=000000) Used as a redis client to interact with the redis server for caching, testing and data storage
- ![Jest](https://img.shields.io/badge/-Jest-%23000000?style=plastic&logo=jest&logoColor=%23C21325&color=E5177D&labelColor=000000) Best testing framework for unit and integration testing when it comes to TS/JS and React
