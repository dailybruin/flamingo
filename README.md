# Flamingo
Flamingo is the Daily Bruin's front end React application.

## Setup instructions [WIP]
*These instructions will be updated for production support in the future*

These setup instructions are designed to allow you to develop locally. This guide also assumes that you already have [Lux](https://github.com/dailybruin/lux) installed somewhere on your local machine.

0. Be sure that that you have [Yarn](https://yarnpkg.com/en/docs/install) installed on your machine
1. Find the folder with your Lux installation.
2. Create an enclosing folder with a command like `mkdir main-site` and move the entire `lux` folder within that folder. Then clone `flamingo` into that folder. Your structure should now look something like this
  ```
  ├── main-site
    ├── flamingo
    └── lux
  ```
3. Install `yalc` globally with this command `yarn global add yalc`
4. Use the commmand `cd lux` to navigate into your lux directory, then run `yalc publish`.
5. Now use `cd` to navigate into your flamingo folder. Run the command `yalc add @dailybruin/lux`
6. You can now run `yarn` within the `flamingo` folder to install all necessary dependencies.
7. Ask your editor for a copy of the private SSH key for the AWS Lightsail instance that's running our WP backend.
8. Make sure that you're in the directory that you've saved the SSH key in. Use this command `ssh -i KEYFILENAME -L 8080:localhost:8080 ubuntu@35.155.143.77 -N` replacing `KEYFILENAME` with the name of the SSH key. This command opens up an SSH tunnel between our Wordpress backend and the port 8080 on your computer. This ensures that you don't have to have a start up a Wordpress server on your local machine every time you want to develop!
9. Navigate back to your local `flamingo` directory and type in `yarn dev`. This starts a development server for your local React app. You should now see the app running at http://localhost:3000!

## Troubleshooting
- If you get an error connecting to the Wordpress backend, go back to where you saved the AWS key and use the command `ssh -i KEYFILENAME ubuntu@35.155.143.77`. Once you've logged into the server use `cd Daily\ Bruin/ostrich` and then run `yarn start`. This ensures that the Wordpress server is actually running.


