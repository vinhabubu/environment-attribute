import React, { useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useGetAttributeByIdMutation } from '../redux/reducer/RestfulApi';
import { useSelector } from 'react-redux';

// Sample data array
const data = [
  {
    _id: '505104827961835522',
    name: 'Attribute',
    idUser: '505091653334204418',
    idBuilding: '505098038272851970',
    floor: 3,
    description: 'dirty',
    level: 3,
    createdAt: '2024-10-14T10:56:33.845+00:00',
    updatedAt: '2024-10-14T10:56:33.845+00:00',
  },
  {
    _id: '505104827961835523',
    name: 'Cleanliness',
    idUser: '505091653334204419',
    idBuilding: '505098038272851971',
    floor: 2,
    description: 'clean',
    level: 2,
    createdAt: '2024-10-14T10:57:33.845+00:00',
    updatedAt: '2024-10-14T10:57:33.845+00:00',
  },
  // Add more objects here...
];

// Component to render each item in FlatList
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.title}>ID: {item._id}</Text>
    <Text style={styles.detail}>Name: {item.name}</Text>
    <Text style={styles.detail}>User ID: {item.idUser}</Text>
    <Text style={styles.detail}>Building ID: {item.idBuilding}</Text>
    <Text style={styles.detail}>Floor: {item.floor}</Text>
    <Text style={styles.detail}>Description: {item.description}</Text>
    <Text style={styles.detail}>Level: {item.level}</Text>
    <Text style={styles.detail}>Created At: {item.createdAt}</Text>
    <Text style={styles.detail}>Updated At: {item.updatedAt}</Text>
  </View>
);

const MyAttributePage = () => {
  const dataUser = useSelector(state => state?.issue?.dataUser);

    const [getAttributeById, dataAtributeById] = useGetAttributeByIdMutation();

    useEffect(() => {
        if (dataUser) {
            
        }
        
    },[dataUser])
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default MyAttributePage;
