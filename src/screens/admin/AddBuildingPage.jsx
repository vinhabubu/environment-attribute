import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {FlatList, Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';

const AddBuildingPage = () => {
    const navigation = useNavigation();
  // Sample data array
  const buildings = [
    {
      name: 'Building Hoa Phat 9',
      amountFloor: 4,
      idQr: '123',
    },
    {
      name: 'Building Vinhomes Central',
      amountFloor: 12,
      idQr: '456',
    },
    {
      name: 'Building Sun World',
      amountFloor: 8,
      idQr: '789',
    },
  ];

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
        data={buildings} // Array of building data
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
});

export default AddBuildingPage;
