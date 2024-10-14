/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {defaultTheme} from './src/theme/theme';
import ModalContainer from './src/modal/ModalContainer';
import {store} from './src/redux';
import RootNavigator from './src/navigators/RootNavigator';
import NavigationContainer from './src/navigators/NavigationContainer';

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoreProvider store={store}>
        <PaperProvider theme={defaultTheme}>
          <NavigationContainer theme={defaultTheme}>
            <RootNavigator />
            <ModalContainer />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
