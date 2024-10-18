/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useUpdateUserMutation } from '../redux/reducer/RestfulApi';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

const EditProfilePage = () => {
  // State to manage input fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('ovFTbyVVCd');
  const navigation = useNavigation();
  const [updateUser, dataUpdateUser] = useUpdateUserMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);


  // Handler for updating profile
  const handleUpdate = () => {
    if (username === '' || email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid username or password, email',
      });
      return false;
    }
    updateUser({
      token: dataUser?.token,
      id: dataUser?.user?.id,
      body: {
        username: username,
        email: email,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (dataUpdateUser?.data) {
      Toast.show({
        type:'success',
        text1: 'Update successful',
      });
      const dataUsers = {
        user: dataUpdateUser?.data,
        token: dataUser?.user?.token,
      };
      const dataString = JSON.stringify(dataUsers);
      AsyncStorage.setItem('dataUser', dataString);

      navigation.goBack();
    }
  }, [dataUpdateUser]);

  useEffect(() => {
    if (dataUpdateUser?.error) {
      Toast.show({
        type: 'error',
        text1: 'Update failed. Try again',
      });
    }

  },[dataUpdateUser]);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 0}]}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.shareIcon}
          onPress={() => navigation.goBack()}>
          {/* Placeholder for share icon */}
          <Icon
              name="back"
              size={30}
              color={'#FFFFFF'}
            />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      {/* <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with user's picture
          style={styles.profilePicture}
        />
        <TouchableOpacity>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View> */}

      {/* Edit Fields */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        {/* <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        /> */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#367e7f',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  shareIcon: {
    // Styling for share icon
  },
  shareText: {
    fontSize: 24,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePictureText: {
    color: '#3498db',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    marginHorizontal: 20,
    marginTop: 36,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#4CA394',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
