import React from 'react';
import { Text, TextInput, TextInputProps, TextProps } from 'react-native';

const Label: React.FC<TextProps & { text: string }> = (props) => (
  <Text {...props} style={[styles.label, [props.style]]}>
    {props.text}
  </Text>
);

const Element: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <>
    <Label text={label} style={{ marginBottom: 4 }} />
    {children}
  </>
);

const TextField: React.FC<TextInputProps> = (props) => (
  <TextInput {...props} style={[styles.textField, props.style]} />
);

export { Label, Element, TextField };

const styles = {
  label: {
    fontSize: 16,
  },
  textField: {
    width: '100%',
    fontSize: 24,
    borderBottomWidth: 1,
  },
};
