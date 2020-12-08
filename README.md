# DHIS2 Dashboard Info Widget

**Repo Owner:** Jakub Flaska [@jakub-bao](https://github.com/jakub-bao)

## Overview

WYSIWYG rich text editor for DHIS2 dashboard content.<br/><br/>
<img src="https://i.ibb.co/d7XnXSH/Capture.png" width="400">

## Local Build & Development

1. Install all dependencies: `npm i`
2. Setup your servers URLs in `serverConfig.dev.json` & `serverConfig.prod.json`
4. Edit `manifest.webapp` to specify name of the app for your DHIS2 instance
5. Run locally as `npm start`
6. Build for production locally as `npm run build`

## Installation on DHIS2 instance

1. Install app via the app hub, or by uploading the zip from `npm run build` in the DHIS2 app management app
2. Be sure to add access to the app to all DHIS2 users via native Users app (Otherwise users won't be able to see the content)
3. Go to Dashboard Edit and add instance of the widget (look up by your name specified above).
4. Click Edit button to add your content (You must have a superuser role to perform edits)

**Questions**
Feel free to contact Jakub <jflaska@baosystems.com>
