/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import StarRating from 'react-native-star-rating-widget';
import {launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/AntDesign';
import {
  useCreateAttributeMutation,
  useGetBuildingMutation,
} from '../redux/reducer/RestfulApi';
import {useDispatch, useSelector} from 'react-redux';
import {tokens} from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {addAttribute} from '../redux/reducer/IssueReducer';
import { resetCache } from '../../metro.config';

const HomePage = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedItems, setSelectedItems] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState('');
  const [getBuilding, dataBuildings] = useGetBuildingMutation();
  const dataUser = useSelector(state => state?.issue?.dataUser);
  const [floorBuildings, setFloorBuilding] = useState([]);
  const [createAttribute, dataCreateAttribute] = useCreateAttributeMutation();
  const [nameBuilding, setNameBuilding] = useState('');
  const navigation = useNavigation();
  const qrText = useSelector(state => state?.issue?.qrText);
  const [defaultBuilding, setDefaultBuilding] = useState({});
  const dispatch = useDispatch();
  const isAddAttribute = useSelector(state => state?.issue?.isAddAttribute);
  const dropdownRef = useRef(null);

  const reviewItems = [
    {title: 'Lights'},
    {title: 'Fans'},
    {title: 'Tables'},
    {title: 'Chairs'},
    {title: 'Air Conditioning'},
    {title: 'Trash Cans'},
    {title: 'Walls'},
  ];

  const generateFloors = num => {
    return Array.from({length: num}, (v, i) => ({
      title: `Floor ${i + 1}`,
    }));
  };

  const handleGetBuilding = async () => {
    await getBuilding({
      token: dataUser?.token,
    });
  };

  useEffect(() => {
    if (qrText !== '' && dataBuildings?.data) {
      const buildings = dataBuildings?.data?.filter(
        item => item?.idQr === qrText,
      );
      if (buildings?.length > 0) {



        setDefaultBuilding(buildings[0]);
        // console.log(buildings[0]?._id);
        setSelectedBuilding(buildings[0]?._id);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Building not found',
        });
      }
    }
  }, [qrText, dataBuildings]);

  useEffect(() => {
    if (selectedBuilding !== '') {
      // console.log(selectedBuilding);
      const buildings = dataBuildings?.data?.filter(
        item => item?._id === selectedBuilding,
      );
      if (buildings?.length > 0) {
        setNameBuilding(buildings[0]?.name);
        const floors = generateFloors(buildings[0]?.amountFloor);
        setFloorBuilding(floors);
      }
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (dataUser?.token) {
      handleGetBuilding();
    }
  }, [dataUser]);

  useEffect(() => {
    if (dataCreateAttribute?.data) {
      Toast.show({
        type: 'success',
        text1: 'Attribute created successfully',
      });
      dispatch(addAttribute(!isAddAttribute));

      setRating(0);
      setComment('');
      setImages('');
    }
  }, [dataCreateAttribute]);

  useEffect(() => {
    if (dataCreateAttribute?.error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to create attribute. Try again',
      });
    }
  }, [dataCreateAttribute]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error: ', response.errorMessage);
      } else {
        setImages(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    const url = 'https://freeimage.host/api/1/upload';
    const formData = new FormData();

    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('action', 'upload');

    // Assuming you have a file URI (in this case, from postman-cloud or local device)
    const fileUri = images; // Change this to your actual file URI
    const fileName = fileUri.split('/').pop();

    // Append the file to FormData
    formData.append('source', {
      uri: fileUri,
      type: 'image/jpeg', // Adjust the MIME type if necessary
      name: fileName,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Cookie: 'PHPSESSID=uo5paotm32hc0ksnff7lrhi9gm',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const jsonResponse = await response.json();
      await createAttribute({
        token: dataUser?.token,
        body: {
          name: nameBuilding,
          buildingId: selectedBuilding,
          floor: selectedFloor,
          item: selectedItems,
          image: jsonResponse?.image?.image?.url,
          level: rating,
          description: comment,
          idUser: dataUser?.user?._id,
        },
      });
      // console.log('Upload response:', jsonResponse);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload image fail . Please try again',
      });
      console.error('Upload failed:', error);
    }
  };

  const handlePushAttribute = async () => {
    if (
      selectedBuilding === '' ||
      selectedFloor === '' ||
      selectedItems === '' ||
      rating === 0 ||
      comment === '' ||
      nameBuilding === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid input. Please check again',
      });
      return false;
    }

    if (dataCreateAttribute?.isLoading) {
      Toast.show({
        type: 'error',
        text1: 'Creating attribute is in progress. Please wait',
      });
      return false;
    }
    if (images === '') {
      await createAttribute({
        token: dataUser?.token,
        body: {
          name: nameBuilding,
          buildingId: selectedBuilding,
          floor: selectedFloor,
          item: selectedItems,
          level: rating,
          description: comment,
          idUser: dataUser?.user?._id,
        },
      });
    } else {
      uploadImage();
    }
  };

  const handleScanPage = () => {
    navigation.navigate('QrScanPage');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.header,
            {paddingTop: Platform.OS === 'ios' ? 50 : 20},
          ]}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity onPress={handleScanPage}>
            <Icons name="qrcode" size={30} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
        <View style={styles.marginView}>
          {/* Building Dropdown */}
          <Text style={styles.label}>Select Building:</Text>
          {dataBuildings?.data && (
            <SelectDropdown
              data={dataBuildings?.data}
              defaultValue={defaultBuilding}
              onSelect={(selectedItem, index) => {
                setSelectedBuilding(selectedItem?._id);
              }}
              ref={dropdownRef}
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

          {/* Floor Dropdown */}
          <Text style={styles.label}>Select Floor:</Text>
          <SelectDropdown
            data={floorBuildings}
            onSelect={(selectedItem, index) => {
              setSelectedFloor(index + 1);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select floors'}
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
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          {/* Review Items Dropdown */}
          <Text style={styles.label}>Select Review Item:</Text>
          <SelectDropdown
            data={reviewItems}
            onSelect={(selectedItem, index) => {
              setSelectedItems(selectedItem?.title);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select items'}
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
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <Text style={styles.label}>Attribute (1-5 star)</Text>
          <StarRating rating={rating} onChange={setRating} maxStars={5} />

          {/* Comment Section */}
          <Text style={styles.labelComment}>Comment:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Add your comment"
            multiline
            value={comment}
            onChangeText={text => setComment(text)}
          />

          {/* <Button title="Chọn Ảnh" onPress={pickImage} /> */}

          <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
            <Text style={styles.uploadButtonText}>Upload Images</Text>
          </TouchableOpacity>
          {images !== '' && (
            <Image source={{uri: images}} style={styles.image} />
          )}

          {/* Submit Button */}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[
                styles.buttonSubmit,
                {
                  backgroundColor: dataCreateAttribute?.isLoading
                    ? '#505050'
                    : '#4CA394',
                },
              ]}
              onPress={handlePushAttribute}>
              <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#4CA394',
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 20,
  },
  dropdownBtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 20,
    color: '#000000',
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
  pickImage: {
    backgroundColor: '#4CA394',
    width: 180,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
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
  marginView: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  labelComment: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#4CA394',
    marginTop: 12,
  },
  buttonSubmit: {
    padding: 4,
    marginVertical: 18,
    borderRadius: 8,
  },
  textButton: {
    fontWeight: '700',
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF',
  },
});

export default HomePage;
