import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Box from './Box';

const Screen: React.FC<{
  children: React.ReactNode;
  style?: SafeAreaView['props']['style'];
  pv?: boolean | number;
  ph?: boolean | number;
}> = ({ children, style, ph, pv }) => {
  return (
    <SafeAreaView style={style}>
      <Box ph={ph || ph === 0 ? ph : true} pv={pv || pv === 0 ? pv : true}>
        {children}
      </Box>
    </SafeAreaView>
  );
};

export default Screen;
