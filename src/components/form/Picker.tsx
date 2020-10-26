import { ActionSheet, Text } from 'native-base';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Picker: React.FC<{
  value: string;
  choices: string[];
  title?: string;
  cancel?: boolean;
  onPress?: (choice: string) => void;
}> = ({ value, choices, cancel = true, title, onPress }) => {
  const showActionSheet = useCallback(() => {
    const options = cancel ? [...choices, 'Cancel'] : choices;
    const cancelButtonIndex = cancel ? options.length - 1 : undefined;
    ActionSheet.show({ options, cancelButtonIndex, title }, (index) => {
      if (onPress) {
        onPress(choices[index]);
      }
    });
  }, [choices, cancel, title, onPress]);

  return (
    <Pressable
      onPress={showActionSheet}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 24, flexGrow: 1 }}>{value}</Text>
      <Icon name="arrow-right" size={16} />
    </Pressable>
  );
};

export default Picker;
