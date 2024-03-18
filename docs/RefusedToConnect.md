# Refused to Connect Error message

If you get the message `Refused to connect` when you hover over the widget after adding it to a dahsboard, follow these steps to fix.

1. Go into the developer console and see if you see this message:

```
Refused to display ... in a frame because it set multiple 'X-Frame-Options' headers with conflicting values ('SAMEORIGIN, DENY'). Falling back to 'deny'.
```

2. If you do not, please [create an issue](https://github.com/pepfar-datim/dashboard-information-widget/issues) and let us know what message you do see.

3. If you do, your nginx config needs to be updated to allow the application to run. Change this line in your nginx config:
```
add_header X-Frame-Options DENY
```
to:
```
add_header X-Frame-Options SAMEORIGIN
```

[Back to the README](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/README.md)