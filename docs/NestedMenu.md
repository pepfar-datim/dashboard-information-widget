# Nested Menu

The DHIS2 Rich Text and Video Dashboard Widget provides the ability to write psuedo-HTML to define a dynamic, easy-to-navigate, nested menu.

Follow these steps to create your first nested menu.

1. Create a dashboard (or open a dashboard for editing)
2. Add an Information widget (or navigate to an existing Information widget)
3. Click Edit
4. Click the `</>` button that gets you into the raw HTML mode of the widget.
5. Insert the following code:

```
<pre type="nestedMenu">
Hello:
  It's:
    Me: /dhis-web-datastore/index.html
  I was wondering:
    If after all these years: https://support.google.com/a/users/answer/9282720?hl=en
World:
  What a Wonderful:
    I see trees:
      Of green: https://simple.wikipedia.org/wiki/Green
      Red roses too: https://www.simplemost.com/why-red-roses-valentines-day-romance/
    I see skies:
      Of blue: https://www.youtube.com/watch?v=nB-xqDZbEVQ
      Clouds of white: https://en.wikipedia.org/wiki/White_Cloud_Mountains
    I hear babies:
      Cry:
        Real: https://www.youtube.com/watch?v=oL2B-AAnsHo
        Fake: https://www.youtube.com/watch?v=A7tl_O48gto
      Watch them grow: https://www.youtube.com/watch?v=uSOOO3KBKDY
</pre>
```

6. Click Save

This should produce a menu that looks like this:
[]

As you can see, the levels of the menu are defined by their indentation.  Since **Hello** and **World** are at the furthest left, they appear on the first level.  If **Hello** is clicked, then **It's** and **I was wondering** are displayed, as they are slightly indented relative to **Hello** and also between **Hello** and the next node at the same level as **Hello** (i.e., **World**).

Each selection for which their is a submenu must end with a colon (:).  If clicking the selection should open a webpage in a new window, then add a colon then a space then the relative or absolute web address that the selection should go to—for example, **Clouds of white: https://en.wikipedia.org/wiki/White_Cloud_Mountain**.

It is possible to format the various selections with CSS, like in this example code:
```
<pre type="nestedMenu" style="color: gray; font-weight: 500">
Hello {font-size: 40px}:
  It's {font-size: 30px}:
    Me: /dhis-web-datastore/index.html
  I was wondering:
    If after all these years: https://support.google.com/a/users/answer/9282720?hl=en
World:
  What a Wonderful:
    I see trees {color: green}:
      Of green: https://simple.wikipedia.org/wiki/Green
      Red roses too: https://www.simplemost.com/why-red-roses-valentines-day-romance/
    I see skies {color: blue}:
      Of blue: https://www.youtube.com/watch?v=nB-xqDZbEVQ
      Clouds of white: https://en.wikipedia.org/wiki/White_Cloud_Mountains
    I hear babies:
      Cry:
        Real: https://www.youtube.com/watch?v=oL2B-AAnsHo
        Fake: https://www.youtube.com/watch?v=A7tl_O48gto
      Watch them grow: https://www.youtube.com/watch?v=uSOOO3KBKDY
</pre>
```
which should look like this:
[]

[Back to the README](https://github.com/pepfar-datim/dashboard-information-widget/blob/main/README.md)