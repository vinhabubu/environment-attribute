'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  View,
  Platform,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addQrText } from '../redux/reducer/IssueReducer';

const QrScanPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Handle QR code scan success
  const handleSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occurred', err),
    // );
    // console.log(e);
    dispatch(addQrText(e?.data));
    setTimeout(() => {
      navigation.goBack();
    },500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
        <Text style={styles.headerTitle}>Qr code</Text>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="back" size={30} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>
      <QRCodeScanner
        onRead={handleSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={<Text style={styles.centerText}>scan the QR code.</Text>}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    fontWeight: 'bold',
    color: '#4CA394',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#4CA394',
  },
  buttonTouchable: {
    padding: 16,
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
});

export default QrScanPage;
