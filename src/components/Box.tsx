import { View } from 'react-native';
import React from 'react';

const Box: React.FC<{
  children: React.ReactNode;
  style?: View['props']['style'];
  pv?: boolean | number;
  ph?: boolean | number;
}> = ({ children, style, pv, ph }) => {
  const paddingVertical = resolvePaddingFlag(pv);
  const paddingHorizontal = resolvePaddingFlag(ph);

  return (
    <View style={[{ paddingVertical, paddingHorizontal }, style]}>
      {children}
    </View>
  );
};

const resolvePaddingFlag = (flag?: boolean | number) =>
  flag === true ? 16 : typeof flag === 'number' ? flag : 0;

export default Box;
