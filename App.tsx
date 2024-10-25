import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadBookmarks } from './src/store/bookmarkSlice';

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadBookmarks());
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
