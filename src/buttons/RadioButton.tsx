import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import colors from '../constants/colors';

const RadioButton = ({
  selected,
  selectedItemColor,
}: {
  selected: boolean;
  selectedItemColor: string;
}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles(width, selectedItemColor).radioButton}>
      <View
        style={[
          styles(width).radioButtonInsideView,
          {
            backgroundColor: selected
              ? selectedItemColor || colors.WHITE
              : null,
          },
        ]}
      />
    </View>
  );
};

export default RadioButton;
const styles = (width: number, selectedItemColor?: string) =>
  StyleSheet.create({
    radioButton: {
      borderColor: selectedItemColor || colors.WHITE,
      width: width / 19,
      height: width / 19,
      borderRadius: width,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonInsideView: {
      width: '50%',
      height: '50%',
      borderRadius: width,
    },
  });
