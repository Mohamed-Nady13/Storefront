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
* Database
  * Instal PostgreeSQL with port number: `5432`
  * Create dev database with name `Storefront`
  * Create test database with name `Storefront_test`
  * Run the database migrations using the following command `node node_modules/db-migrate/bin/db-migrate up`
* Create `.env` file. Sample configuration as follows:
  
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
* Start the development server with `npm start` (server port number is `3000`)
* 
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