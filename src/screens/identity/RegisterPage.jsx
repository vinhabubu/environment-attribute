import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useRegisterMutation} from '../../redux/reducer/RestfulApi';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [register, dataRegister] = useRegisterMutation();

  const handleRegister = async () => {
    if (
      userName === '' ||
      email === '' ||
      password === '' ||
      rePassword === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields',
      });
      return;
    }

    if (password !== rePassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }

    await register({
      username: userName,
      email: email,
      password: password,
    });
  };

  useEffect(() => {
    if (dataRegister?.data) {
      Toast.show({
        type: 'success',
        text1: 'Register successful',
      });
      navigation.navigate('Login');
    }
  }, [dataRegister]);

  useEffect(() => {
    if (dataRegister?.error) {
      Toast.show({
        type: 'error',
        text1: 'Register fail. Try again',
      });
      console.log(dataRegister?.error);
    }
  }, [dataRegister?.error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to attribute</Text>
      <Text style={styles.subtitle}>Signup to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
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
      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry={true}
        placeholderTextColor={'#000000'}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.signupText}>
          Have an account? <Text style={styles.signupLink}>Sign in</Text>
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

export default RegisterScreen;
