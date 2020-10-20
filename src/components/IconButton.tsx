import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const iconSize = Platform.OS === 'android' ? 24 : 28;

type Callback = () => void;

const IconButton: React.FC<{ name: string; onPress?: Callback }> = ({
  name,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <BorderlessButton style={styles.touchable} onPress={onPress}>
        <Icon name={name} size={iconSize} />
      </BorderlessButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: iconSize,
    overflow: 'hidden',
  },
  touchable: {
    width: iconSize + 8,
    height: iconSize + 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
