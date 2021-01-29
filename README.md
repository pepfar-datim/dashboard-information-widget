# DHIS2 Dashboard Information Widget

**Repo Owner:** Sarah Searle [@ssearle-bao](https://github.com/ssearle-bao)

## Overview

The Dashboard Information widget is a WYSIWYG editor that allows for the creation of rich text content in DHIS2 dashboards.

<img width="900" alt="DHIS2 Dashboard Information Widget example" src="https://user-images.githubusercontent.com/852673/102401297-150f0800-3fb1-11eb-86c9-acc31d73c3a9.png">

## Installation on DHIS2

1. Install the app via the [App Hub](https://apps.dhis2.org/) or by uploading the zip from `npm run build` into the DHIS2 App Management app
2. Be sure to grant access to the app to all users, or they will not see the content. To do this, go to DHIS2 Users > User role > [role] > Apps > select Dashboard Information app. Make sure to do this either on enough roles, so that all users have access. (If all users on your system have a Guest or Read Only role, giving the permission to that role is sufficient.)
3. From the Dashboards page of your DHIS2 installation, edit a dashboard. (If you do not have any dashboards, you will need to add a new dashboard.)
4. Click `Search for items to add to this dashboard`, and select `Dashboard Information` under `Apps`.
5. Click the Edit button on the Dashboard Information widget to create content.
6. If you would like to restrict the creation and editing of Dashboard Information content to superusers, go to the Datastore Manager, select the `dashboard-information` namespace, then the `configuration` key and check the `Only open to superusers` box. (This namespace and key will only be present after you have created a Dashboard Information widget.)

### Refused to connect message

If you get the message "`refused to connect`" when you hover over the widget after adding it to a dahsboard and in the developer console you see the message:

```
Refused to display ... in a frame because it set multiple 'X-Frame-Options' headers with conflicting values ('SAMEORIGIN, DENY'). Falling back to 'deny'.
```

This means your nginx config needs to be updated to allow the application to run. To support dashboard applications which make requests you must update your nginx config: `add_header X-Frame-Options DENY` swap `DENY` -> `SAMEORIGIN`.

## Local Build and Development

1. Install all dependencies: `npm i`
2. Setup your servers URLs in `serverConfig.dev.json` and `serverConfig.prod.json`
3. Edit `manifest.webapp` to specify name of the app for your DHIS2 instance
4. Run locally as `npm start`
5. Build for production locally as `npm run build`

## Issues, Features, etc.

Please create [an issue](https://github.com/pepfar-datim/dashboard-information-widget/issues) or [a pull request](https://github.com/pepfar-datim/dashboard-information-widget/pulls).

## Credits

Developed by [@jakub-bao](https://github.com/jakub-bao) and [@plinnegan](https://github.com/plinnegan).
