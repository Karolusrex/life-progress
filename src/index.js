import React from 'react';
import { render } from 'react-dom';
import './styles/global.scss';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl,
    );
  });
}
