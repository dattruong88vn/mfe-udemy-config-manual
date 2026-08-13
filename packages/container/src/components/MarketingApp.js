import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // mount fn import from child
    // pass params to child: ref -> build DOM, onNavigate: sync history from child to parent
    // mount fn return onParentNavigate, use to sync history from parent to child
    const { onParentNavigate } = mount(ref.current, { onNavigate: ({ pathname: nextPathName }) => { const { pathname } = history.location; if (pathname !== nextPathName) { history.push(nextPathName); } } });

    history.listen(onParentNavigate)
  });

  return <div ref={ref} />;
};
