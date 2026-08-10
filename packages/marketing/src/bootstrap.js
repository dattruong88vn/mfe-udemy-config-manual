import React from 'react';
import ReactDOM from 'react-dom';

import App from "./App"

// mount fn
const mount = (el) => {
    ReactDOM.render(<App />, el);
}

// call immediately in development mode
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#my-marketing-root');
    if (el) mount(el)
}

// integrate with container
export { mount }