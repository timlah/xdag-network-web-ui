# XDAG Network Web UI

## Introduction

Demo: https://xdag.io/pools
Web UI which displays the current network status of XDAG. Built by using React, Webpack and other wondeful projects.

## Setup

### Development

#### Prerequisites

- node: https://nodejs.org/en/download/
- npm: https://www.npmjs.com/get-npm

#### Commands

- run `npm install` to install project dependencies
- run `npm start` to start the Webpack development server
- run `npm run build` to build a production ready version

### Production

1. Copy files from `/dist` and add them to a folder on your webserver.
2. Declare a global variable, `window.networkBundlePath`, which points to the location the files were added to. For example, the value for localhost:4000/assets/networkUI/ would be:

```
<script type="text/javascript">
    window.networkBundlePath = '/assets/networkUI/';
</script>
```

3. Load the main JS and CSS files

```
<link href="/assets/networkUI/main.bundle.css" rel="stylesheet">
<script src="/assets/networkUI/main.bundle.js"></script>
```

3. Create a div with an ID to use as a mounting point for the application.
4. Finally, run `xdagNetwork.default({rootNodeId: 'your div ID here'})` to initialize the application.

## Misc

### Translations

https://github.com/i18next/react-i18next is used for internationalization. Translations are loaded from the online translation service Locize.

### Change address for API requests

Open `src/constants/constants.js` and change `API_ROOT` into your desired HTTP(S) address which is serving https://github.com/timlah/xdag-network-api.

### Styling

This project mainly uses CSS Modules and SCSS for styling. Utility and theme level styles are located in `src/styles`. Component level styles are located in each components own folder.
