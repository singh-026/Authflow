import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import constants from '../constants';
import colors from '../constants/colors';
import {useRoute} from '@react-navigation/native';
import {Button, RadioButton} from '../buttons';
import {MyScreenProps} from './Cart';

const CheckoutPage = ({navigation}: MyScreenProps) => {
  const route = useRoute();
  const [list, setList] = useState<string[]>(route?.params?.listItems);
  const [selected, setSelected] = useState<string[]>([]);
  const handleOnBackPress = () => {
    navigation.goBack();
  };

  const handleRenderItemOnPress = useCallback(
    (item: string) => {
      const isSelected = selected.includes(item);
      setSelected(
        prevSelected =>
          isSelected
            ? prevSelected.filter(selectedItem => selectedItem !== item) // Deselect
            : [...prevSelected, item], // Select
      );
    },
    [selected],
  );
  const renderItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <TouchableOpacity
          style={styles.listItemContainer}
          onPress={() => handleRenderItemOnPress(item)}>
          <Text style={styles.text}>{item}</Text>
          <RadioButton
            selected={selected.includes(item)}
            selectedItemColor={colors.PRIMARY}
          />
        </TouchableOpacity>
      );
    },
    [selected, handleRenderItemOnPress],
  );

  const handleDeleteOnPress = () => {
    const newItems = list.filter(item => !selected.includes(item));
    setList(newItems);
    setSelected([]);
  };
  const handlePlaceOrderOnPress = () => {
    navigation.navigate('SuccessPage', {
      listHandler: route?.params?.listHandler,
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{constants.CHECKOUT_PAGE}</Text>
        <Button
          text={constants.BACK}
          onPress={handleOnBackPress}
          extraStyles={styles.goBackButton}
        />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlist}
      />
      <View style={styles.footerContainer}>
        <Button
          text={constants.DELETE}
          onPress={handleDeleteOnPress}
          extraStyles={styles.footerButtons}
          disabled={selected.length ? false : true}
        />
        <Button
          text={constants.PLACE_ORDER}
          onPress={handlePlaceOrderOnPress}
          extraStyles={styles.footerButtons}
          disabled={selected.length ? false : true}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutPage;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    alignItems: 'center',
  },
  headerText: {
    color: colors.PRIMARY,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  text: {
    color: colors.BLACK,
  },
  flatlist: {
    paddingHorizontal: 13,
    paddingBottom: '50%',
  },
  listItemContainer: {
    borderColor: colors.GRAY,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBackButton: {
    width: '25%',
    height: 40,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.PRIMARY_LIGHT,
    justifyContent: 'space-around',
    height: '7%',
    alignItems: 'center',
  },
  footerButtons: {
    height: 50,
    width: '30%',
  },
});
