import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from "history" // phải đổi lên react-router version cao hơn, sử dụng function của thư viện ko phải qua history

import App from "./App"

// mount fn
/**
 * 
 * @param {*} el ReactDOM render with this element, use both development and production
 * @param {*} initialPath parent passes down, show the current path (use for first load -> run createMemoryHistory)
 * @param {*} onNavigate a function that parent passes down, trigger when navigate and change url on child app -> child passes current location in memory history in this function, parent uses it to update browser history
 * @param {*} defaultHistory dynamic history between dev (Browser History) and prod (Memory History) in child app
 * @returns function onParentNavigate, parent triggers this function with current pathname of parent when navigate, child receives latest pathname and update memory history
 */

const mount = (el, { initialPath, onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath || '/'],
    });;

    if (onNavigate) {
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