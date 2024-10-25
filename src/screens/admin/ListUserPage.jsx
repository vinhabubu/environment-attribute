/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useGetAllUserMutation} from '../../redux/reducer/RestfulApi';
import {useSelector} from 'react-redux';
import {Modal, Portal, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ListUserPage = () => {
  const [getAllUser, dataAllUser] = useGetAllUserMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showModal = item => {
    setVisible(true);
    setItemUser(item);
  };
  const hideModal = () => setVisible(false);
  const [itemUser, setItemUser] = useState({});

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

  const handleDetail = item => {
    navigation.navigate('DetailUserPage', {userId: item?._id});
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: screenWidth - 48,
    height: screenHeight / 6,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 24,
    alignItems: 'center',
  };
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
      <View style={styles.smallView}>
        <Text style={styles.detail}>Status: </Text>
        <Text style={[styles.content]}>
          {item?.isBlock ? 'block' : 'active'}
        </Text>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDetail(item)}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        {item?.roleId === 0 && (
          <TouchableOpacity
            style={[
              styles.buttonStatus,
              {backgroundColor: !item?.isBlock ? '#DC143C' : '#DAA520'},
            ]}
            onPress={() => showModal(item)}>
            <Text style={styles.buttonText}>
              {!item?.isBlock ? 'Block' : 'Active'}{' '}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: 'blue',
        }}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text style={styles.titleModal}>Change status user</Text>
            <Text style={styles.text}>
              {itemUser?.isBlock
                ? 'Do you sure active user again? '
                : 'Do you sure block user again?  '}
            </Text>
            <View style={styles.viewButtonModal}>
              <TouchableOpacity style={styles.buttonOk}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={hideModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </View>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>List User</Text>
      </View>
      <Searchbar
        placeholder="Search"
        style={{
          marginVertical: 12,
          marginHorizontal: 12,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          elevation: 2,
          color: '#000',
        }}
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
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CA394',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonStatus: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginTop: 8,
  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ffa500',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    color: 'gray',
  },
  viewButtonModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  buttonOk: {
    backgroundColor: '#DAA520',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 12,
  },
});

export default ListUserPage;
