## Basic Scripts

    npm run dev - development
    npm run build - Ceate a local build
    npm run preview — Run the local build preview
    npm run lint — Run the basic vite ES lint rules

## Basic Usage for fastest performance (no fast reloads, must be rebuilt)

    into the console, run:
    npm install
    npm run build
    npm run preview

## Alternate Usage (if making adjustments)

    into the console, run:
    npm install
    npm run dev

## Basic Layout

<pre>
The basic structure is
      index.html
         |
      main.jsx
         |
      App.jsx
    /    |    \
Navbar Outlet Footer
         |
       Pages (consisting of components)
</pre>

routes>index.jsx is the setup for routing that is injecting/wrapping main & App
AuthContext.jsx is used to login, logout, and check for login cookie on all pages
FavoritesContext.jsx is used to transfer the favorited dogs amongst pages

## Common Issues

If running in incognito or safari, you may hit issues when logging in.
This is due to the login using an http cookie, in safari disable "Prevent cross-site tracking" in the privacy settings.

### Licensing

I used tailwind UI for this. I have a license under my name to build and sell. This is not intended for redistorbution. Please see this link for furthur licensing information:
https://tailwindui.com/license
