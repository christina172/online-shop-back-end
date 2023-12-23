# online-shop-back-end
Internship 2023 - Online shop back end (NestJS, Prisma, PostgreSQL)

This is the back end for the full-stack project Online Shop.

Link to the repository for the front end: https://github.com/christina172/online-shop-front-end.

## Running the app

To start the containers, run <b>$docker-compose up</b>. Next, run (in Docker CLI for backend image) <b>$npx prisma migrate dev</b> to sync the database with the schema, and then run <b>$npx prisma db seed</b> to populate the database with sample data.

After building the app, you have access to:
- pgAdmin is running on port 82
- client is running on port 3000
- server is running on port 5000

## Project structure

The prisma folder contains the schema.prisma file, where the database models are specified, the seed.ts file, used to populate the database and a migrations folder. Docker-related files and files containing environment variables are in the root directory. Other project files are in the src folder, has the following structure:
- the entry file (main.ts) and the main (app) module;
- app folder, containing all the resources (with a module, a controller and a service for each one): auth, users, products, order-items, orders;
- domain folder, containing all the dtos, entities, types, utility functions and repos (services to interact with the database - for each model);
- libs folder, containing a prisma folder with the prisma module and service, a security folder with passport strategies, authentication guards and decorators, an exceptions folder with an exception filter to catch some prisma clint exceptions. 

## Description

Add description
