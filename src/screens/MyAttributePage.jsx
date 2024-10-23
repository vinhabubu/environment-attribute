/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Platform, Image} from 'react-native';
import {useGetAllAttributeMutation, useGetAttributeByUserMutation, useGetBuildingMutation} from '../redux/reducer/RestfulApi';
import {useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating-widget';
import SelectDropdown from 'react-native-select-dropdown';

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
  const [getBuilding, dataBuildings] = useGetBuildingMutation();


  const [getAttributeById, dataAtributeById] = useGetAttributeByUserMutation();
  const [getAllAttribute, dataAllAttribute] = useGetAllAttributeMutation();
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [allComment, setAllComment] = useState([]);


  const handleGetBuilding = async () => {
    await getBuilding({
      token: dataUser?.token,
    });
  };

  useEffect(() => {
    if (dataUser?.token) {
      handleGetBuilding();
    }
  }, [dataUser]);

  useEffect(() => {
    if (dataUser) {
      if (dataUser?.user?.roleId === 0) {
        getAttributeById({
          id: dataUser?.user?._id,
          token: dataUser?.token,
        });
      } else {
        getAllAttribute({
          token: dataUser?.token,
        });
      }

    }
  }, [dataUser, isAddAttribute]);



  useEffect(() => {
    if (dataAtributeById?.data && dataUser?.user?.roleId === 0) {
      setAllComment(dataAtributeById?.data);
    }
  }, [dataAtributeById]);

  useEffect(() => {
    if (dataAllAttribute?.data) {
      console.log('1111');
      setAllComment(dataAllAttribute?.data);
    }
  }, [dataAllAttribute]);

  useEffect(() => {
    if (selectedBuilding !== '') {
      const comments = dataAllAttribute?.data?.filter(
        item => item?.idBuilding === selectedBuilding,
      );
      setAllComment(comments);
    }

  },[selectedBuilding]);

  // console.log(dataAtributeById?.error);
  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>{dataUser?.user?.roleId === 0 ? 'History' : 'Comment'}</Text>
      </View>
      <View style={{marginTop: 20 ,marginLeft: 12}}>
      {dataBuildings?.data && dataUser?.user?.roleId === 1 && (
            <SelectDropdown
              data={dataBuildings?.data}
              onSelect={(selectedItem, index) => {
                setSelectedBuilding(selectedItem?._id);
              }}
              renderButton={selectedItem => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem?.name) ||
                        'Select buildings'}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && {backgroundColor: '#D2D9DF'}),
                    }}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
        )}
        </View>
      <View style={styles.flat}>
        <FlatList
          // style={styles.flat}
         extraData={allComment}
        showsVerticalScrollIndicator={false}
          data={allComment}
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
    marginBottom: 160,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    // flex:1,
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
  dropdownButtonStyle: {
    width: 250,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    // backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginBottom: 12,

  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },

});

export default MyAttributePage;
