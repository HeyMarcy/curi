import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import createConfig from 'curi'
import { Navigator } from 'curi-react';

import routes from './routes';
import renderFunction from './renderFunction';

// this example is using a browser history because hash histories do not
// maintain state when navigating.
const history = createBrowserHistory();

const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config} children={renderFunction} />
), document.getElementById('root'));
