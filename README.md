# Flamingo

## About

A React frontend for [dailybruin.com](https://dailybruin.com).

## Getting Started

### Prerequisites

The steps outlined here only need to be performed once to set up your environment.

Make sure you have `nvm` (Node Version Manager) installed. Then, in your terminal, run:

```bash
nvm install 20      # Install Node.js v20 (LTS)
nvm use 20          # Switch to using Node v20
npm install --global yarn
```

### Running the frontend locally
1. Open a terminal and navigate to the flamingo directory.

2. Run the following commands:

```bash
nvm use 20
yarn install  # Installs all dependencies listed in package.json
yarn dev      # Starts the local development server
```

3. Open your browser and go to http://localhost:3000.

Tip: You can debug specific pages by finding the URL on the production site (e.g., https://dailybruin.com/category/news) and appending the suffix to your local address (e.g., http://localhost:3000/category/news).
