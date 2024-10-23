/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import IconName from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import HomePage from '../screens/HomePage';
import {defaultTheme} from '../theme/theme';
import ProfilePage from '../screens/ProfilePage';
import MyAttributePage from '../screens/MyAttributePage';
import {useSelector} from 'react-redux';
import AddBuildingPage from '../screens/admin/AddBuildingPage';
import ListUserPage from '../screens/admin/ListUserPage';

const BottomBarNavigator = () => {
  const Tab = createBottomTabNavigator();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const roleUser = dataUser?.user?.roleId;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#4CA394',
          borderTopColor: defaultTheme?.colors?.primaryOrange,
          height: 68,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          // display: !isHideBottom ? 'flex' : 'none',
        },

        tabBarActiveTintColor: defaultTheme?.colors?.primaryOrange,
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="Home"
        component={roleUser === 0 ? HomePage : AddBuildingPage}
        options={{
          tabBarLabel: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={30}
              color={focused ? defaultTheme?.colors?.primaryOrange : '#FFFFFF'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Attribute"
        component={MyAttributePage}
        options={{
          tabBarLabel: 'Course',
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) => (
            <Icons
              name="history"
              size={30}
              color={focused ? defaultTheme?.colors?.primaryOrange : '#FFFFFF'}
            />
          ),
        }}
      />
       {roleUser === 1 && (
        <Tab.Screen
          name="ListUser"
          component={ListUserPage}
          options={{
            tabBarLabel: 'School',
            tabBarShowLabel: false,

            tabBarIcon: ({focused}) => (
              <IconName
                name="users"
                size={30}
                color={
                  focused ? defaultTheme?.colors?.primaryOrange : '#FFFFFF'
                }
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'School',
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) => (
            <IconName
              name="user"
              size={30}
              color={focused ? defaultTheme?.colors?.primaryOrange : '#FFFFFF'}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
