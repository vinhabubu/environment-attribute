import {
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import SplashPage from '~/screen/splash/SplashPage';
import BottomBarNavigator from './BottomBarNavigator';


const StackNavigator = createStackNavigator();
const screenOptions = {headerShown: false};



const RootNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName="SplashPage">
      <StackNavigator.Screen name="SplashPage" component={SplashPage} />
      {/* <StackNavigator.Screen name="HomePage" component={HomePage} /> */}
      <StackNavigator.Screen
        name="BottomTabNavigator"
        component={BottomBarNavigator}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
