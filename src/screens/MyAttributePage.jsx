import React, {useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, Platform, Image} from 'react-native';
import {useGetAttributeByUserMutation} from '../redux/reducer/RestfulApi';
import {useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating-widget';

// Component to render each item in FlatList
const renderItem = ({item}) => (
  <View style={styles.itemContainer}>
    {/* <Text style={styles.title}>ID: {item._id}</Text> */}
    <View style={styles.smallView}>
      <Text style={styles.detail}>Name building: </Text>
      <Text style={styles.content}>{item.name}</Text>
    </View>
    <View style={styles.smallView}>
      <Text style={styles.detail}>Floor: </Text>
      <Text style={styles.content}>{item.floor}</Text>
    </View>
    <View style={styles.smallView}>
      <Text style={styles.detail}>Items: </Text>
      <Text style={styles.content}>{item?.item}</Text>
    </View>

    <View style={styles.smallView}>
      <Text style={styles.detail}>Description: </Text>
      <Text style={styles.content}>{item.description}</Text>
    </View>
    <View style={styles.smallView}>
      <Text style={styles.detail}>Level: </Text>
      <StarRating rating={item.level} onChange={() => console.log('111')} />
    </View>
    <View style={styles.smallView}>
      <Text style={styles.detail}>Time: </Text>
      <Text style={styles.content}>{item.createdAt}</Text>
    </View>
    {item?.image && (
      <View style={styles.smallViewImage}>
        <Text style={styles.detail}>Image: </Text>
        <Image source={{uri: item?.image}} style={styles.image} />
      </View>
    )}
  </View>
);

const MyAttributePage = () => {
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const isAddAttribute = useSelector(state => state?.issue?.isAddAttribute);

  const [getAttributeById, dataAtributeById] = useGetAttributeByUserMutation();

  useEffect(() => {
    if (dataUser) {
      getAttributeById({
        id: dataUser?.user?._id,
        token: dataUser?.token,
      });
    }
  }, [dataUser, isAddAttribute]);

  // console.log(dataAtributeById?.error);
  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>History</Text>
      </View>
      <View style={styles.flat}>
        <FlatList
          data={dataAtributeById?.data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',

    // padding: 16,
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
  flat: {
    paddingBottom: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  smallView: {
    flexDirection: 'row',
    marginVertical: 8,
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
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 14,
    marginBottom: 10,
  },
  smallViewImage: {
    flexDirection: 'row',
    marginVertical: 8,
    // alignItems: 'center',
  },
});

export default MyAttributePage;
