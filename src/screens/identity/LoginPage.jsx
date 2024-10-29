import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import {useLoginMutation} from '../../redux/reducer/RestfulApi';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {addUserInfo} from '../../redux/reducer/IssueReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
('react-native');

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, dataLogin] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
      return;
    }

    await login({
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    if (dataLogin?.data) {
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
      dispatch(addUserInfo(dataLogin?.data));
      const dataString = JSON.stringify(dataLogin?.data);
      AsyncStorage.setItem('dataUser', dataString);
      navigation.navigate('BottomTabNavigator', {
        screen: 'Home',
      });
    }
  }, [dataLogin, navigation, dispatch]);

  useEffect(() => {
    if (dataLogin?.error) {
      console.log(dataLogin?.error);
      Toast.show({
        type: 'error',
        text1: 'Login fail. Try again',
      });
    }
  }, [dataLogin?.error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to attribute</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor={'#000000'}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* <Text style={styles.forgotPassword}>Forgot your password?</Text> */}

      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CA394',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
    height: 52,
    color: '#000000',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#4CA394',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  signupLink: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
