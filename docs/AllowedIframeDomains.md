# Allowed iframe Domains

The DHIS2 Rich Text and Video Dashboard Widget allows iframes in its HTML as long as their domain names are included in the allowlist.

In order to find the allowlist, follow these steps:

1. Make sure you are using at least version 2.1.0 of the widget
2. If you have not yet added a widget to a Dashboard, please do so
3. Open the Datastore Managment app in DHIS2
4. Click `dashboard-information` to open the correct namespace
5. Click `configuration` to open the correct key
6. Click `Allowed iframe domains` to open the allowed domains

By default, the only domain listed is `https://www.youtube.com/`, but if you wish to serve video content from any other sites, you can add them by clicking the ☐ the the left of the `0:` and clicking `Insert`.  Type your desired domain name where it says `value`.  Then click the Save icon (💾) near the top of the screen.

If you wish to allow all iframe domains (which is certainly a security risk), you can do so by adding the domain `https://` in `Allowed iframe domains`.

Hopefully that gives you enough to get started, but feel free to [create an issue](https://github.com/pepfar-datim/dashboard-information-widget/issues) if you run into anything that is confusing or seems like a bug.

[Back to the README](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/README.md)
