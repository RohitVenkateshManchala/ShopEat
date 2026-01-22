// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // we'll create soon
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // required for reanimated

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}>  // add later */}
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          {/* </PersistGate> */}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}