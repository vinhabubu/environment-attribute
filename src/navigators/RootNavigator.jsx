import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BottomBarNavigator from './BottomBarNavigator';
import LoginScreen from '../screens/identity/LoginPage';
import RegisterScreen from '../screens/identity/RegisterPage';
import SplashPage from '../screens/SplashPage';

const StackNavigator = createStackNavigator();
const screenOptions = {headerShown: false};

const RootNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName="LoginPage">
      <StackNavigator.Screen name="SplashPage" component={SplashPage} />
      <StackNavigator.Screen name="LoginPage" component={LoginScreen} />
      <StackNavigator.Screen name="RegisterPage" component={RegisterScreen} />
      {/* <StackNavigator.Screen name="HomePage" component={HomePage} /> */}
      <StackNavigator.Screen
        name="BottomTabNavigator"
        component={BottomBarNavigator}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
