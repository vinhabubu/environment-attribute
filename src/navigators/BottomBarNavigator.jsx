import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {defaultTheme} from '~/theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import IconName from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import HomePage from '../screens/HomePage';


const BottomBarNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000E90',
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
        component={HomePage}
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
        name="Course"
        component={HomePage}
        options={{
          tabBarLabel: 'Course',
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) => (
            <Icons
              name="book"
              size={30}
              color={focused ? defaultTheme?.colors?.primaryOrange : '#FFFFFF'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="School"
        component={HomePage}
        options={{
          tabBarLabel: 'School',
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) => (
            <Icon
              name="school"
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
