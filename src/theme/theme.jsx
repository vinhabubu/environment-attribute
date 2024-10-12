import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

/**
 * https://callstack.github.io/react-native-paper/theming.html
 **/
export const defaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#1C0056',
    accent: '#D0021B',
    background: '#dee8fb',
    surface: '#FFFFFF',
    placeholder: '#393939',
    backdrop: '#11111150',
    onSurface: '#1C0056',
    text: '#000000',
    error: '#FF0000',
    correct: '#008000',
    default: '#fff176',
    headbar: '#006400',
    backgroundAnswer: '#B9D9EB',
    black: '#000000',
    primaryDefault: '#242F62',
    primaryOrange: '#EB6619',
    backgroundOrange: '#FFC75B',
    done: '#C3C8F4',
    backgroundBlue: '#6495ED',
    fadeBlue: '#BBC6FF',
    //Define new color
  },
};

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};
