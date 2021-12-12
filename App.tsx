import React, { FC } from 'react';

import Loading from './src/components/widgets/Loading';
import { NativeBaseProvider } from 'native-base';
import Navigation from './src/components/Navigation/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from './src/redux/store';

const App: FC = () => {

  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NativeBaseProvider >
          <Navigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
