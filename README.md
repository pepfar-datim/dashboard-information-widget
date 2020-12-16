# DHIS2 Dashboard Information Widget

**Repo Owner:** Sarah Searle [@ssearle-bao](https://github.com/ssearle-bao)

## Overview

The Dashboard Information widget is a WYSIWYG editor that allows for the creation of rich text content in DHIS2 dashboards.

<img src="https://i.ibb.co/d7XnXSH/Capture.png" width="400">

## Installation on DHIS2

1. Install the app via the [App Hub](https://apps.dhis2.org/) or by uploading the zip from `npm run build` into the DHIS2 App Management app
2. Be sure to grant access to the app to all users, or they will not see the content. To do this, go to DHIS2 Users > User role > [role] > Apps > select Dashboard Information app. Make sure to do this either on enough roles, so that all users have access. (If all users on your system have a Guest or Read Only role, giving the permission to that role is sufficient.)
3. From the Dashboards page of your DHIS2 installation, edit a dashboard. (If you do not have any dashboards, you will need to add a new dashboard.)
4. Click `Search for items to add to this dashboard`, and select `Dashboard Information` under `Apps`.
5. Click the Edit button on the Dashboard Information widget to create content.
6. If you would like to restrict the creation and editing of Dashboard Information content to superusers, go to the Datastore Manager, select the `dashboard-information` namespace, then the `configuration` key and set `Only open to superusers` to `true`.

## Local Build and Development

1. Install all dependencies: `npm i`
2. Setup your servers URLs in `serverConfig.dev.json` & `serverConfig.prod.json`
4. Edit `manifest.webapp` to specify name of the app for your DHIS2 instance
5. Run locally as `npm start`
6. Build for production locally as `npm run build`

## Issues, Features, etc.

Please create [an issue](https://github.com/pepfar-datim/dashboard-information-widget/issues) or [a pull request](https://github.com/pepfar-datim/dashboard-information-widget/pulls).

## Credits

Developed by [@jakub-bao](https://github.com/jakub-bao) and [@plinnegan](https://github.com/plinnegan).
