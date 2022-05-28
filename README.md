# Project Description
The project provides an API for a shopping website.

# Technologies Used

- NodeJs
- TypeScript
- JavaScript
- express
- PostgreSQL

# How to Install

To get started developing right away:

* Install all project dependencies with `npm install`
* Start the development server with `npm start`
* Create dev database `Storefront`
* Create test database `Storefront_test`
* Create `.env` file. Sample configurtion as follows:
  
```bash
POSTGRES_HOST = localhost
POSTGRES_DB= Storefront
POSTGRES_TEST_DB=Storefront_test
POSTGRES_USER= postgres
POSTGRES_PASSWORD= Mohamed@13
ENV=dev
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET = mnb12212

```
## Packages

* express 
* Jasmine
* supertest
* bcrypt
* db-migrate
* dotenv
* jsonwebtoken
* pg

## Project Structure

```bash
├── README.md - This file.
├── dist/ # the build out put will be saved here.
├── spec/ # Configeration for jasmine.
└── src
    ├── server.ts # Starter point for the application.
    ├── handler/ # Source folder API end-points. 
    ├── models/ # Code for database logic.
    ├── migrations/ # Code for database migrations.
    ├── database.ts # database connection configuration.
```