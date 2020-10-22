import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import React from 'react';
import TabNavigator from './navigation/Tabs';

const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Root>
  );
};

export default App;
