import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import constants from '../constants';
import colors from '../constants/colors';
import {Button} from '../buttons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface MyScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Cart = ({navigation}: MyScreenProps) => {
  const [textInputVal, setTextInputValue] = useState<string>('');
  const [list, setList] = useState<string[]>([]);
  const handleOnChangeText = (text: string) => {
    setTextInputValue(text);
  };
  const handleAddItemOnPress = () => {
    if (textInputVal) {
      setList(list.concat(textInputVal));
      setTextInputValue('');
    }
  };
  const handleSubmitOnPress = () => {
    navigation.navigate('CheckoutPage', {
      listItems: list,
      listHandler: setList,
    });
  };

  const renderItem = useCallback(({item}: {item: String}) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.renderedText}>{item}</Text>
      </View>
    );
  }, []);
  const renderHeaderComponent = useCallback(() => {
    return (
      <View>
        <View style={{marginTop: 10}}>
          <Text style={{marginLeft: 15, fontSize: 20, color: '#6C46B9'}}>
            {constants.PURCHASE_LIST}{' '}
          </Text>
        </View>
      </View>
    );
  }, []);

  // useFocusEffect(() => {
  //   setList([]);
  // }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={textInputVal}
          placeholder={constants.PLACEHOLDER_TEXT}
          onChangeText={handleOnChangeText}
          style={styles.textInput}
        />
        <Button
          text={constants.ADD_ITEM}
          disabled={textInputVal ? false : true}
          onPress={handleAddItemOnPress}
        />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListHeaderComponent={renderHeaderComponent}
        contentContainerStyle={styles.flatList}
      />
      <View style={styles.submitButtonContainer}>
        <Button
          text={constants.SUBMIT_ITEMS}
          onPress={handleSubmitOnPress}
          extraStyles={styles.submitButtonExtraStyles}
          disabled={list?.length ? false : true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
  },
  submitButtonExtraStyles: {
    width: '70%',
  },
  textInput: {
    width: '70%',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.GRAY,
    paddingLeft: 15,
  },
  renderItemContainer: {
    marginVertical: 8,
    marginLeft: 15,
    backgroundColor: colors.PRIMARY_LIGHT,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    paddingVertical: 8,
    width: '93%',
    borderRadius: 6,
    alignItems: 'center',
  },
  renderedText: {fontSize: 16, color: colors.BLACK},
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  flatList: {
    paddingBottom: '30%',
  },
  submitButtonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.PRIMARY_LIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
});
