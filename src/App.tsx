import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import React from 'react';
import RealmProvider from './components/RealmProvider';
import TabNavigator from './navigation/Tabs';

const App = () => {
  return (
    <Root>
      <RealmProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </RealmProvider>
    </Root>
  );
};

export default App;
