import React, {useState} from 'react';
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

const HomePage = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedItems, setSelectedItems] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState('');

  const buildings = [
    {title: 'Building A'},
    {title: 'Building B'},
    {title: 'Building C'},
  ];
  const floors = [
    {title: '1st Floor'},
    {title: '2nd Floor'},
    {title: '3rd Floor'},
  ];
  const reviewItems = [
    {title: 'Lights'},
    {title: 'Fans'},
    {title: 'Tables'},
    {title: 'Chairs'},
    {title: 'Air Conditioning'},
    {title: 'Trash Cans'},
    {title: 'Walls'},
  ];

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

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 0}]}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <View style={styles.marginView}>
          {/* Building Dropdown */}
          <Text style={styles.label}>Select Building:</Text>
          <SelectDropdown
            data={buildings}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select buildings'}
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
          {/* Floor Dropdown */}
          <Text style={styles.label}>Select Floor:</Text>
          <SelectDropdown
            data={floors}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
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
              console.log(selectedItem, index);
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
          <Button
            title="Submit Review"
            onPress={() =>
              console.log(
                'Submit',
                selectedBuilding,
                selectedFloor,
                selectedItems,
                rating,
                comment,
              )
            }
            style={{backgroundColor: '#4CA394'}}
          />
          {/* <TouchableOpacity>
            <Text>Submit</Text>
          </TouchableOpacity> */}
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
});

export default HomePage;
