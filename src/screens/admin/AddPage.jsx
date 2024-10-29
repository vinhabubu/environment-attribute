/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useCreateBuildingMutation} from '../../redux/reducer/RestfulApi';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {addIsCreateBuilding} from '../../redux/reducer/IssueReducer';

const AddBuilding = () => {
  // State to store the form data
  const [name, setName] = useState('');
  const [amountFloor, setAmountFloor] = useState('');
  const [idQr, setIdQr] = useState('');
  const navigation = useNavigation();
  const [createBuilding, dataCreateBuilding] = useCreateBuildingMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const isCreateBuilding = useSelector(state => state?.issue?.isCreateBuilding);
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleAddBuilding = async () => {
    // Validate input (you can add more validation as needed)
    if (name === '' || amountFloor === '' || idQr === '') {
      Toast.show({
        type: 'error',
        text1: 'Building not found',
      });
      return;
    }

    const newBuilding = {
      name,
      amountFloor: parseInt(amountFloor, 10), // Convert to number
      idQr,
    };

    await createBuilding({
      token: dataUser?.token,
      body: newBuilding,
    });
  };

  useEffect(() => {
    if (dataCreateBuilding?.data) {
      Toast.show({
        type: 'success',
        text1: 'Create building success',
      });
      dispatch(addIsCreateBuilding(!isCreateBuilding));
      navigation.goBack();
    }
  }, [dataCreateBuilding]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>Add building</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" size={30} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>

      {/* Input for building name */}
      <View style={styles.viewAll}>
        <TextInput
          style={styles.input}
          placeholder="Enter Building Name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={text => setName(text)}
        />

        {/* Input for amount of floors (number) */}
        <TextInput
          style={styles.input}
          placeholder="Enter Number of Floors"
          keyboardType="numeric"
          placeholderTextColor={'gray'}
          value={amountFloor}
          onChangeText={text => setAmountFloor(text)}
        />

        {/* Input for QR ID */}
        <TextInput
          style={styles.input}
          placeholder="Enter QR Code ID"
          placeholderTextColor={'gray'}
          value={idQr}
          onChangeText={text => setIdQr(text)}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleAddBuilding}>
            <Text style={styles.textButton}>Add building</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color:'#000',
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
  viewAll: {
    marginHorizontal: 20,
    marginVertical: 32,
  },
  button: {
    backgroundColor: '#367e7f',
    padding: 15,
    borderRadius: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddBuilding;
