## UI Testing Framework for Quinshift ##

## Getting started
Make sure you have proper version (v20.18.2) of NodeJS environment set up.
- Clone the project to your machine
- Install Cypress with `npm install cypress --save-dev`

## Tests Execution
There are 3 ways to run tests:
1. `npx cypress open` which will open Cypress runner where you can select spec files to run
2. `npx cypress run --spec cypress\e2e\*.cy.js` which will run all tests in a command line (headless)
3. Create new pipeline in Azure Devops using azure-pipelines.yml and run it

## What's where?
- e2e/ - location of spec file
- e2e/pages/ - location of page class files with locators and functions
- fixtures/ - location of credentials and user data files
- support/loginHelper - method for login handling
- support/merge-reports.js - method for reports merge handling