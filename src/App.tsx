import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import React from 'react';
import RealmProvider from './components/RealmProvider';
import RootNavigator from './navigation/Root';

const App = () => {
  return (
    <Root>
      <RealmProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RealmProvider>
    </Root>
  );
};

export default App;
