d# flamingo

## About

A React frontend for the new https://dailybruin.com

## Getting Started

### Prerequisites

The steps outlined here only have to be performed once.
Make sure you have `nvm` installed. Then, in a Terminal, run

```[bash]
nvm install 12 # We use node v12
nvm use 12
npm install --global yarn
```

### Running the frontend on your local machine

Open a Terminal and
cd to the `flamingo` directory on your machine.
Run

```[bash]
nvm use 12
yarn # This makes sure that your local copy of the codebase installs / has all the dependencies the code needs to run. These dependencies are listed in package.json
yarn dev # Start the local server
```

You can now explore your local copy of the frontend by going to the browser and
viewing `localhost:3000`. Remember that you can visit or debug a specific page
by going to the corresponding page on the production `https://dailybruin.com` and
appending the suffix of its url to `localhost:3000`.

### FAQ and Common Issues

This README is a work in progress. If you run into any issues, feel free to Slack me (Tommy).
