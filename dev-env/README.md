README
======

Getting started with the development environment.

- Setup npm; run
    - `npm ci` - installs esbuild
    - `npm run watch` - starts a live reload server
- Setup the web extension; (currently only firefox is supported)
    - Navigate to `about:debugging`
    - Press `Load Temporary Add-on…` button
    - Verify the extension is running by visiting `discord.com` and look for the `pageAction` icon in the address bar
- Done; now, any changes to files in `src/` will:
    - Trigger `esbuild` to build a new bundle
    - The web extension will inject the bundled output into all open discord tabs

Currently, clicking on the `pageAction` button opens a placeholder settings page. More features to come...

<p align="center"><img src="https://raw.githubusercontent.com/jsonu26a1/discord-automation/refs/heads/main/dev-env/dev-web-ext/icon.svg" width="128" height="128"></p>
