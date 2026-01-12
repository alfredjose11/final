SPA routing and refresh (server fallback)

Problem
- When using path-based routing (HTML5 pushState) your server must return `index.html` for any app route. If it doesn't, refreshing or opening `/singleview/1` directly will 404 or show a blank page.

Two approaches
1) Configure the server to fallback to `index.html` (recommended for clean URLs)
2) Use hash routing (URLs like `#/singleview/1`) which avoids server configuration.

How to enable path routing (already used in app):
- `src/app/app.config.ts` should call `provideRouter(routes)` (no hash).

Server examples

Express (Node)
```js
const express = require('express');
const path = require('path');
const app = express();
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
app.listen(process.env.PORT || 8080);
```

Nginx
```
server {
  listen 80;
  server_name example.com;
  root /var/www/your-app/dist;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

Apache (.htaccess)
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

GitHub Pages (or hosts without server config)
- Option A: Use hash routing in your app (no server changes).
- Option B: Add a `404.html` that redirects to `index.html` and preserves path via JS (basic fallback):

`404.html`
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      // Attempt to load SPA entry for unknown routes
      location.replace('/?p=' + encodeURIComponent(location.pathname));
    </script>
  </head>
  <body></body>
</html>
```

Local testing
- Build and serve a production bundle, then test direct route refreshes.

Using `serve` (recommended for SPA testing):
```bash
npm run build
npx serve -s dist
# open http://localhost:5000/singleview/1 and refresh
```

Quick fallback: use hash routing
- If you want a zero-server-change fix, enable hash routing by using `withHashLocation()` with `provideRouter(routes, withHashLocation())` in `src/app/app.config.ts`.

If you want, I can:
- Add a short script to `package.json` showing `npx serve -s dist` usage.
- Or update `README.md` with a deploy checklist for a specific host (which one?).
