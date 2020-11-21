import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Exercise } from '../../model';
import Box from '../Box';

export const ExerciseItem: React.FC<{
  item: Exercise;
  onItemSelected?: (item: Exercise) => void;
  style?: ViewStyle;
}> = ({ item, onItemSelected, style }) => {
  return (
    <TouchableHighlight
      onPress={onItemSelected ? () => onItemSelected(item) : undefined}>
      <Box
        ph
        pv={12}
        style={[{ flexDirection: 'row', backgroundColor: 'white' }, style]}>
        <View style={{ marginRight: 16 }}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#4b95fe',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 25, color: 'white' }}>
              {item.bodyPart[0]}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{ fontSize: 20 }}>{`${item.name} (${item.category})`}</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#5a5a5a' }}>
            {item.bodyPart}
          </Text>
        </View>
      </Box>
    </TouchableHighlight>
  );
};
