import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';


import {useDispatch} from 'react-redux';
import getImages from '../libs/getImages';


const SplashPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNavigate = async () => {


      setTimeout(() => {

      }, 3000);
    };
    handleNavigate();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={getImages('')}
        style={styles.imageStyle}
        resizeMode="center"
      />
      <Text style={styles.textStyle}>Dẫn bước thành công</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: defaultTh?.colors?.background,
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 8,
  },
  imageStyle: {
    height: 170,
    width: 260,
  },
});

export default SplashPage;
