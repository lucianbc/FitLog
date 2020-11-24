import React from 'react';
import { View } from 'react-native';

const Collection: React.FC<{
  children: React.ReactNode;
  spacing?: number;
  atEnd?: boolean;
}> = ({ children, spacing = 4, atEnd }) => {
  const count = React.Children.count(children);
  return (
    <>
      {React.Children.map(children, (child, index) => {
        return (
          <>
            {child}
            {(atEnd || index !== count - 1) && (
              <View style={{ height: spacing }} />
            )}
          </>
        );
      })}
    </>
  );
};

export default Collection;
