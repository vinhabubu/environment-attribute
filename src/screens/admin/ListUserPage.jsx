import React from 'react';
import { FlatList, Text, View, StyleSheet, Platform } from 'react-native';

const ListUserPage = () => {
  // Sample data array
  const users = [
    {
      username: 'VinhNguyen',
      email: 'nguyenvinh@gmail.com',
      roleId: 1,
    },
    {
      username: 'Alice',
      email: 'alice@example.com',
      roleId: 0,
    },
    {
      username: 'Bob',
      email: 'bob@example.com',
      roleId: 0,
    },
  ];

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
       <View style={styles.smallView}>
        <Text style={styles.detail}>Username: </Text>
        <Text style={styles.content}>{item.username}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Email: </Text>
        <Text style={styles.content}>{item.username}</Text>
      </View>
      <View style={styles.smallView}>
        <Text style={styles.detail}>Role: </Text>
        <Text style={styles.content}>{item.roleId === 0 ? 'user' : 'admin'}</Text>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
              <Text style={styles.headerTitle}>List User</Text>

      </View>
    <FlatList
      data={users} // Array of user data
      renderItem={renderItem} // Function to render each user
      keyExtractor={(item) => item.email} // Use email as unique key
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
