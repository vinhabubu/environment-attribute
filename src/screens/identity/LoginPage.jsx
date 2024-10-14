import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
('react-native');

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to attribute</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BottomTabNavigator')}>
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
