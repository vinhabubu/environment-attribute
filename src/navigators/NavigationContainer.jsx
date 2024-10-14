import {
  NavigationContainer as DefaultNavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {memo, useRef} from 'react';

export const navigationRef = createNavigationContainerRef();

const NavigationProvider = ({children, theme}) => {
  const routeNameRef = useRef();

  const onReady = () => {
    const currentRouteName = navigationRef.current?.getCurrentRoute?.()?.name;
    routeNameRef.current = currentRouteName;
  };

  const onStateChange = async () => {
    try {
      const currentRouteName = navigationRef.current?.getCurrentRoute?.()?.name;
      routeNameRef.current = currentRouteName;
    } catch (err) {
      // console.log(`error in NavigationContainer onStateChange() - ${err}`);
    }
  };

  return (
    <DefaultNavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
      theme={theme}>
      {children}
    </DefaultNavigationContainer>
  );
};

export default memo(NavigationProvider);
