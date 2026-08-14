import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  /**
   * 1. mount function: import from each child
   * 2. params: 
   *      - element: ReactDOM render
   *      - object:
   *          - initialPath: first visit or F5, parent sends current pathname to child for loading content correctly
   *          - onNavigate: a function that parent passes down to child, child triggers it when navigate, send child current location, parent compares with current location and update to history
   * 3. return:
   *      - object:
   *          - onParentNavigate: when parent navigates, triggers it and passes down current parent location to child
   */
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, { initialPath: history.location.pathname, onNavigate: ({ pathname: nextPathName }) => { const { pathname } = history.location; if (pathname !== nextPathName) { history.push(nextPathName); } } });

    const unlisten = history.listen(onParentNavigate)

    return () => {
      unlisten();
    }
  }, []);

  return <div ref={ref} />;
};
