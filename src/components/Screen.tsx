import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';

const Screen: React.FC<{
  children: React.ReactNode;
  style?: SafeAreaView['props']['style'];
}> = ({ children }) => {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
};

const styles = {
  screen: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
};

export default Screen;
