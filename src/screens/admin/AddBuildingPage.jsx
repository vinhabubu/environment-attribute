/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useGetBuildingMutation} from '../../redux/reducer/RestfulApi';
import {useSelector} from 'react-redux';

const AddBuildingPage = () => {
  const navigation = useNavigation();
  const [getBuilding, dataBuildings] = useGetBuildingMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const isCreateBuilding = useSelector(state => state?.issue?.isCreateBuilding);

  const handleGetBuilding = async () => {
    await getBuilding({
      token: dataUser?.token,
    });
  };

  useEffect(() => {
    if (dataUser?.token) {
      handleGetBuilding();
    }
  }, [dataUser, isCreateBuilding]);

  const handleAddBuilding = () => {
    navigation.navigate('AddBuildingPage');
  };

  // Render each item in the FlatList
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Name building: </Text>
        <Text style={styles.content}>{item.name}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Number Floors: </Text>
        <Text style={styles.content}>{item.amountFloor}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Id Qr code: </Text>
        <Text style={styles.content}>{item.idQr}</Text>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => navigation.navigate('EditBuildingPage', {item})}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>Building</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddBuilding}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flat}
        data={dataBuildings?.data} // Array of building data
        renderItem={renderItem} // Function to render each item
        keyExtractor={item => item.idQr} // Unique key for each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  floorText: {
    fontSize: 16,
    color: '#555',
  },
  qrText: {
    fontSize: 14,
    color: '#777',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',

    // padding: 16,
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
  smallView: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  detail: {
    fontWeight: '600',
    color: '#367e7f',
    fontSize: 16,
  },
  content: {
    fontWeight: '600',
    fontSize: 16,
    color: 'gray',
  },
  buttonText: {
    color: '#367e7f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginTop: 8,
  },
  buttonEdit: {
    backgroundColor: '#4CA394',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  edit: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flat: {
    marginVertical: 16,
  },
});

export default AddBuildingPage;
