import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Container } from './components/container';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </Provider>
);
