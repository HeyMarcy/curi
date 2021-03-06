## curi-react

The `curi-react` package is a grouping of components that are intended to be used in a React web application.

The provided components are:

* [`<Navigator>`](../../curi-react-navigator#navigator)
* [`<Link>`](../../curi-react-link#link)
* [`<Redirect>`](../../curi-react-redirect#redirect)
* [`<Block>`](../../curi-react-block#block)
* [`curious()`](../../curi-react-curious#curious)
* [`<Active>`](../../curi-react-active#active)

If you are planning on using code splitting with your application (using a route object's `preload` function), you will want to implement some sort of "store" to keep references to the loaded components. Please see the [code splitting tutorial](../../../docs/tutorials/05-code-splitting.md) for more details on how to do that.
