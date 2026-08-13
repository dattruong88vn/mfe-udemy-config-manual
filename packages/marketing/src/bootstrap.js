import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from "history" // phải đổi lên react-router version cao hơn, sử dụng function của thư viện ko phải qua history

import App from "./App"

// mount fn
const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();

    if (onNavigate) {
        // execute callback each time navigate
        // pass location data back to Container
        history.listen((location) => onNavigate(location))
    }

    ReactDOM.render(<App history={history} />, el);

    // return function that container trigger each time navigate
    return {
        onParentNavigate: ({ pathname: nextParentPathname }) => {
            const pathname = history.location;

            if (pathname !== nextParentPathname) {
                history.push(nextParentPathname)
            }
        }
    }
}

// call immediately in development mode
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#my-marketing-root');
    if (el) mount(el, { defaultHistory: createBrowserHistory() })
}

// integrate with container
export { mount }