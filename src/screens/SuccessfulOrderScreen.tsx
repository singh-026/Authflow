import {Text, SafeAreaView, StyleSheet, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../constants/colors';
import constants from '../constants';
import {MyScreenProps} from './Cart';
import {Button} from '../buttons';
import {useRoute} from '@react-navigation/native';

const SuccessfulOrderScreen = ({navigation}: MyScreenProps) => {
  const route = useRoute();
  useEffect(() => {
    const backAction = () => {
      route?.params?.listHandler();
      navigation.pop(2);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const handleBackNav = () => {
    navigation.pop(2);
    route?.params?.listHandler();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{constants.SUCCESSFUL_ORDER}</Text>
      <Button text={constants.GO_BACK} onPress={handleBackNav} />
    </SafeAreaView>
  );
};

export default SuccessfulOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: colors.PRIMARY,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
});
