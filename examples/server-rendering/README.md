# Server rendering

Server rendering with `curi` is fairly straightforward. You should have a catch all route handler that will respond to all (non-static file) requests.

```js
function catchAll(req, res) {
  // 1. Create a memory history using the requested location
  const history = createMemoryHistory({ initialEntries: [req.url]});

  // 2. Create a config
  const config = createConfig(history, routes);

  // 3. Wait for the initial location's response to finish
  config.ready()
    .then(response => {
      // 4. Generate the HTML markup by rendering a <Navigator> and
      // passing it the response
      const markup = renderToString(
        <Navigator response={response} config={config} children={renderFunction} />
      );
      // 5. Insert the markup into the page's html and send it
      res.send(renderFullPage(markup));
    })
    .catch(err => {
      // 6. You should also handle any errors that might occur
    });
}
```

The above example is very basic. Some other things that you might need to consider are:

* redirects — You should redirect instead of rendering markup when `redirectTo` is set.

```js
config.ready()
  .then(response => {
    if (response.redirectTo) {
      res.redirect(response.redirectTo);
    }
    // ...
  });
```

* Data loading — You would need to maintain two copies of your routes if you want to handle data fetching on the server differently than it works on the client side. This is not something that I have explored very closely yet, so I don't have any recommendations on exactly how to approach this.

* Code splitting — In order to use dynamic `import`s on the server, you will probably need to use a Babel plugin like `dynamic-import-node`. Unfortunately, `dynamic-import-node` breaks Webpack's code splitting. In order for your code to be split into multiple bundles, you should ensure that `dynamic-import-node` isn't being run when building your client side bundle. The solution used in this experiment is to use the `env` property.

```js
{
  "presets": [ "es2015", "react" ],
  "plugins": [
    "syntax-dynamic-import"
  ],
  "env": {
    "server": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

Then, when starting the server, make sure that `BABEL_ENV=server`.

```
cross-env BABEL_ENV=server npm start
```
