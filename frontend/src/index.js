import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import APIProvider from './graphql/provider.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <APIProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </APIProvider>
);
