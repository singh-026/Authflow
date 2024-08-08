import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, CheckoutPage} from './src/screens';
import SuccessfulOrderScreen from './src/screens/SuccessfulOrderScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckoutPage"
          component={CheckoutPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SuccessPage"
          component={SuccessfulOrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
