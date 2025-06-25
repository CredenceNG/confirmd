[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# Usabi Wallet Demo

## Overview

This application provides a showcase for the Usabi Wallet to illustrate the use cases for verifiable credentials. This application will take users through multiple steps to demonstrate how verifiable credentials are issued and verified using the Confirmd Wallet.

## Running

### Copy env files

Copy the files server/.env.example and client/.env.example to server/.env and client/.env  
Edit the .env files to match your project needs

### Option 1 - Native

Please make sure you have a recent version of node, npm, and yarn installed
These steps are executed from the root folder of the project:

> yarn install

> yarn dev

The application will now be running at http://localhost:3000

### Option 2 - Docker

These steps assume that you have docker installed

These steps are executed from the root folder of the project:

Build the client:

> docker build -t bc-wallet-demo-client . -f DockerfileClient

Build the server:

> docker build -t bc-wallet-demo-server . -f DockerfileServer

Start the server:

> docker run --name bc-wallet-demo-server -p5000:5000 --rm --env-file server/.env bc-wallet-demo-server

Start the client:

> docker run --name bc-wallet-demo-client -p3000:3000 -v \`pwd\`/Caddyfile:/etc/caddy/Caddyfile --rm --env-file client/.env bc-wallet-demo-client

The application will now be running at http://localhost:3000

## Features

### Contact Form

The application includes a contact form accessible at `/contact` that allows users to:

- Send inquiries to the admin team
- Select from predefined subjects (General Inquiry, Product Demo, Partnership, Technical Support, etc.)
- Provide contact details including name, email, phone (optional), and message
- Receive confirmation of successful submission

The contact form integrates with the backend API endpoint `/demo/contact/send-email` which validates input data and simulates email sending functionality. In a production environment, this would be connected to an actual email service provider like SendGrid, AWS SES, or similar.

## Security

**⚠️ IMPORTANT SECURITY NOTICE:**

This repository uses environment variables for sensitive configuration. Before running the application:

1. **Never commit `.env` files** - They contain sensitive API keys and credentials
2. **Copy example files**: `cp server/.env.example server/.env` and `cp client/.env.example client/.env`
3. **Update credentials**: Replace placeholder values in `.env` files with your actual credentials
4. **Use the pre-commit hook**: `cp pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

### Required Environment Variables

See `.env.example` files for the complete list of required environment variables including:

- Traction API credentials
- SMTP configuration for email functionality
- Webhook secrets
- Application configuration

## API

### Contact Form API

- `POST /demo/contact/send-email` - Submit contact form with email notification
- `GET /demo/contact/test-smtp` - Test SMTP connection (development only)

For complete API documentation, see the individual controller files in `server/src/controllers/`.

**Pull requests are always welcome!**

Please see the [Contributions Guide](CONTRIBUTING.md) for the repo.

Before contributing please run `yarn lint --fix` and fix any linter warnings in your code contribution.

You may also create an issue if you would like to suggest additional resources to include in this repository.

All contrbutions to this repository should adhere to our [Code of Conduct](./CODE_OF_CONDUCT).
