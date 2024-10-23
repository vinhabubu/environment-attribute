import React, { useEffect, useState } from 'react';
import {FlatList, Text, View, StyleSheet, Platform} from 'react-native';
import { useGetAllUserMutation } from '../../redux/reducer/RestfulApi';
import { useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';

const ListUserPage = () => {
  const [getAllUser, dataAllUser] = useGetAllUserMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    const filtered = dataAllUser?.data?.filter(user =>
      user?.username?.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (dataAllUser?.data) {
      setFilteredData(dataAllUser?.data);
    }
  }, [dataAllUser]);


  useEffect(() => {
    if (dataUser?.token) {
      getAllUser({
        token: dataUser?.token,
      });
    }
  }, [dataUser]);
  // Render each item in the FlatList
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Username: </Text>
        <Text style={styles.content}>{item?.username}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Email: </Text>
        <Text style={styles.content}>{item?.email}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Role: </Text>
        <Text style={[styles.content]}>
          {item?.roleId === 0 ? 'user' : 'admin'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>List User</Text>
      </View>
      <Searchbar
        placeholder="Search"
        style={{marginVertical: 12 , marginHorizontal : 12, backgroundColor: '#fff',shadowColor: '#000',
    shadowOpacity: 0.2,elevation: 2, color: '#000' }}

    value={searchQuery}
    onChangeText={onChangeSearch}
    />
      <FlatList
        data={filteredData} // Array of user data
        renderItem={renderItem} // Function to render each user
        keyExtractor={item => item.email} // Use email as unique key
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

export default ListUserPage;
