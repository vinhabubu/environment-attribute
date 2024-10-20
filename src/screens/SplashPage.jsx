import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {useDispatch} from 'react-redux';
import getImages from '../libs/getImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addUserInfo} from '../redux/reducer/IssueReducer';

const SplashPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNavigate = async () => {
      const valueUser = await AsyncStorage.getItem('dataUser');
      console.log(valueUser);
      const dataUser = JSON.parse(valueUser);
      dispatch(addUserInfo(dataUser));
      setTimeout(() => {
        if (dataUser?.token) {
          navigation.navigate('BottomTabNavigator');
        } else {
          navigation.navigate('LoginPage');
        }
      }, 3000);
    };
    handleNavigate();
  }, [dispatch, navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={getImages('iconApp')}
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
    backgroundColor: '#4CA394',
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: '#fff',
  },
  imageStyle: {
    height: 170,
    width: 260,
  },
});

export default SplashPage;
