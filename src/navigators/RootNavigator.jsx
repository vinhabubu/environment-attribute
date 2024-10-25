import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BottomBarNavigator from './BottomBarNavigator';
import LoginScreen from '../screens/identity/LoginPage';
import RegisterScreen from '../screens/identity/RegisterPage';
import SplashPage from '../screens/SplashPage';
import EditProfilePage from '../screens/EditProfilePage';
import QrScanPage from '../screens/QrScanPage';
import AddBuilding from '../screens/admin/AddPage';
import EditBuildingPage from '../screens/admin/EditBuildingPage';
import MyAttributePage from '../screens/MyAttributePage';
import DetailAtributeUserPage from '../screens/DetailAtributeUserPage';

const StackNavigator = createStackNavigator();
const screenOptions = {headerShown: false};

const RootNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName="SplashPage">
      <StackNavigator.Screen name="SplashPage" component={SplashPage} />
      <StackNavigator.Screen name="LoginPage" component={LoginScreen} />
      <StackNavigator.Screen name="RegisterPage" component={RegisterScreen} />
      <StackNavigator.Screen
        name="EditProfilePage"
        component={EditProfilePage}
      />
      {/* <StackNavigator.Screen name="HomePage" component={HomePage} /> */}
      <StackNavigator.Screen
        name="BottomTabNavigator"
        component={BottomBarNavigator}
      />
      <StackNavigator.Screen name="QrScanPage" component={QrScanPage} />
      <StackNavigator.Screen name="AddBuildingPage" component={AddBuilding} />
      <StackNavigator.Screen
        name="EditBuildingPage"
        component={EditBuildingPage}
      />
      <StackNavigator.Screen
        name="DetailUserPage"
        component={DetailAtributeUserPage}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
