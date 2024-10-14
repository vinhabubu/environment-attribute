import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to attribute</Text>
      <Text style={styles.subtitle}>Signup to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
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
      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
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
