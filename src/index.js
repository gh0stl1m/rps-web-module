// External libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './index.css';

// Components
import App from './App';

// Workers
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
