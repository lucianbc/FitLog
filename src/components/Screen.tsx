import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';

const Screen: React.FC<{
  children: React.ReactNode;
  style?: SafeAreaView['props']['style'];
}> = ({ children, style }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = {
  screen: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
};

export default Screen;
