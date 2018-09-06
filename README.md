# Bootstrap 4 Starter

## Installation

After downloading or cloning the project run:

```bash
npm i
```

Once the installation process has been completed run on of the following:

- Development Build

    ```bash
    npm run start
    ```

- Production Build

    ```bash
    npm run build
    ```

You should see the ouput in a chrome browser if it is installed.

Plesae note that for the WINDOWS the ```npm scripts``` should be:

1. "start": "SET NODE_ENV=development && gulp",
1. "build": "SET NODE_ENV=production && gulp build"

For the MAC OS X the ```npm scripts``` should be:

1. "start": "NODE_ENV=development gulp",
1. "build": "NODE_ENV=production gulp build"
