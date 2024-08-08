import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  extraStyles?: {};
}
const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.extraStyles]}
      disabled={props.disabled}
      onPress={props.onPress}>
      <Text
        style={[
          styles.buttonText,
          {color: props.disabled ? colors.GRAY : colors.WHITE},
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: '3%',
    borderRadius: 6,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
  },
});
