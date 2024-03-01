<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a simple graphql api for managing companies, departments, employees and roles. It is built with NestJS, MongoDb, and Apollo Server. It is a simple api that allows you to create, read, update and delete companies, departments, employees and roles. It also allows you to assign employees to departments and roles.

You can use the api deployed on render at https://company-manager-sbw6.onrender.com/graphql

## Installation

```bash
$ npm install
```

## Environment Variables

add a .env file to the root of the project and add the following environment variables

```bash
MONGO_URI=your_mongo_uri
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
# build the docker image
$ docker build -t company-manager --build-arg MONGO_URI=your_mongo_uri .

# run the docker image
$ docker run -p 3000:3000 company-manager
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Project Structure

```
src
│   companies
│   │   models // contains the company, department, employee, payroll, role. with  their respective models and schemas and enums
│   │   │   company.model.ts
│   │   │   department.model.ts
│   │   │   employee.model.ts
│   │   |   payroll.model.ts
│   │   |   role.model.ts
│   │   |   type.model.ts
|   |
|   services // contains the company, department, employee, role services
|   |   company.service.ts
|   |   department.service.ts
|   |   employee.service.ts
|   |   role.service.ts
|   |
|   resolvers  // contains the company, department, employee, role resolvers
|   |   company.resolver.ts
|   |   department.resolver.ts
|   |   employee.resolver.ts
|   |   role.resolver.ts
|   |
|   tests // contains unit tests for the company, department, employee, role resolvers
|   |   company.resolver.spec.ts
|   |   department.resolver.spec.ts
|   |   employee.resolver.spec.ts
|   |   role.resolver.spec.ts
|   |
|   dataloaders // contains the company, department, employee, role dataloaders
|   |   company.dataloaders.ts
|   |   department.dataloaders.ts
|   |   role.dataloaders.ts
|   |
|   dtos // contains the company, department, employee, role dtos
|   |   company.dtos.ts
|   |   department.dtos.ts
|   |   employee.dtos.ts
|   |   role.dtos.ts
|   |   payroll.dtos.ts
```
