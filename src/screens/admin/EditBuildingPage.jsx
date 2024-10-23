/* eslint-disable react-hooks/exhaustive-deps */

import {useNavigation, useRoute} from '@react-navigation/native';
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
import {useUpdateUserMutation} from '../redux/reducer/RestfulApi';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {addUserInfo} from '../redux/reducer/IssueReducer';
import {useUpdateBuildingMutation} from '../../redux/reducer/RestfulApi';
import {addAttribute, addIsCreateBuilding} from '../../redux/reducer/IssueReducer';

const EditBuildingPage = () => {
  // State to manage input fields
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const router = useRoute();
  const defaultBuilding = router?.params?.item;
  const [name, setName] = useState(defaultBuilding?.name);
  const [amountFloor, setAmountFloor] = useState(
    defaultBuilding?.amountFloor?.toString(),
  );
  const [idQr, setIdQr] = useState(defaultBuilding?.idQr);
  const navigation = useNavigation();
  const isCreateBuilding = useSelector(state => state?.issue?.isCreateBuilding);
  const dispatch = useDispatch();
  const [updateBuilding, dataUpdateBuilding] = useUpdateBuildingMutation();
  const isAddAttribute = useSelector(state => state?.issue?.isAddAttribute);


  // Handler for updating profile
  const handleUpdate = () => {
    if (name === '' || amountFloor === '' || idQr === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid name or amount floor, qr code',
      });
      return false;
    }

    if (dataUser?.token) {
      updateBuilding({
        token: dataUser?.token,
        id: defaultBuilding?._id,
        body: {
          name: name,
          amountFloor: parseInt(amountFloor, 10), // Convert to number
          idQr,
        },
      });
    }
  };

  useEffect(() => {
    if (dataUpdateBuilding?.data) {
      Toast.show({
        type: 'success',
        text1: 'Update successful',
      });
      navigation.goBack();
      dispatch(addAttribute(!isAddAttribute));
      dispatch(addIsCreateBuilding(!isCreateBuilding));
    }
  }, [dataUpdateBuilding]);

  useEffect(() => {
    if (dataUpdateBuilding?.error) {
      console.log(dataUpdateBuilding?.error);
      Toast.show({
        type: 'error',
        text1: 'Update failed. Please try again',
      });
    }
  }, [dataUpdateBuilding]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>Edit building</Text>
        <TouchableOpacity
          style={styles.shareIcon}
          onPress={() => navigation.goBack()}>
          {/* Placeholder for share icon */}
          <Icon name="back" size={30} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>

      {/* Edit Fields */}
      <View style={styles.form}>
        <View>
          <Text style={styles.titleText}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            // placeholder="Username"
            // defaultValue={dataUser?.user?.username}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Amount floor</Text>
          <TextInput
            style={styles.input}
            value={amountFloor}
            onChangeText={setAmountFloor}
            // placeholder="Email"
            // keyboardType="email-address"
            // defaultValue={dataUser?.user?.email}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Qr code</Text>
          <TextInput style={styles.input} value={idQr} onChangeText={setIdQr} />
        </View>
        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditBuildingPage;

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
    color: '#000',
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
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CA394',
  },
});
