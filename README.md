# DHIS2 Rich Text and Video Dashboard Widget

[![Tests](https://github.com/pepfar-datim/dashboard-information-widget/actions/workflows/test.yml/badge.svg)](https://github.com/pepfar-datim/dashboard-information-widget/actions)

**Repo Owner:** Sarah Searle [@ssearle-bao](https://github.com/ssearle-bao)

## Overview

The DHIS2 Rich Text and Video Dashboard Widget is a WYSIWYG editor that allows for the creation of rich text content in DHIS2 dashboards. Note that internally to DHIS2, the widget is named `Information`, as its name appears on the dashboard on versions of DHIS2 prior to 2.36.

<img width="900" alt="DHIS2 Rich Text and Video Dashboard Widget example" src="https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/images/DHIS2RichTextAndVideoDashboardWidgetExample.jpg">

## Demo

[![Demo video for DHIS2 Rich Text and Video Dashboard Widget](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/images/DHIS2RichTextAndVideoDashboardWidgetDemo.jpg)](https://vimeo.com/567442556)

## Installation on DHIS2

1. [Install the app via the App Hub](https://apps.dhis2.org/app/96d39ad5-bd25-45b1-ae8c-165f4a1854a9) or by uploading into the DHIS2 App Management app the zip either from [our releases](https://github.com/pepfar-datim/dashboard-information-widget/releases) or from `npm run build`
2. Be sure to grant access to the app to all users, or they will not see the content. To do this, go to DHIS2 Users > User role > [role] > Apps > select `Information app`. Make sure to do this on enough roles to give all users access. (For example, if all users on your system have a Guest or Read Only role, giving the permission to that role is sufficient.)
3. From the Dashboards page of your DHIS2 installation, edit a dashboard. (If you do not have any dashboards, you will need to add a new dashboard.)
4. Click `Search for items to add to this dashboard`, and select `Information` under `Apps`.
5. Click the Edit button on the Information widget to create content.
6. If you would like to restrict the creation and editing of Information content to superusers, go to the Datastore Manager, select the `dashboard-information` namespace, then the `configuration` key and check the `Only open to superusers` box. (This namespace and key will only be present after you have created an  Information widget.)
7. If the widget shows the message `Refused to connect` after you add it to the dashboard, [follow these instructions to fix](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/RefusedToConnect.md).

## Local Build and Development

1. Install all dependencies: `npm i`
2. Setup your servers URLs in `serverConfig.dev.json` and `serverConfig.prod.json`
3. Edit `manifest.webapp` to specify name of the app for your DHIS2 instance
4. Run locally as `npm start`
5. Build for production locally as `npm run build`

## Nested Menu

The DHIS2 Rich Text and Video Dashboard Widget [provides the ability to create nested menus, instructions for which can be found by following this link](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/NestedMenu.md).

## Issues, Features, etc.

Please create [an issue](https://github.com/pepfar-datim/dashboard-information-widget/issues) or [a pull request](https://github.com/pepfar-datim/dashboard-information-widget/pulls).

## Credits

Developed by [@jakub-bao](https://github.com/jakub-bao) and [@plinnegan](https://github.com/plinnegan).
