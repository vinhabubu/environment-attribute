import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const AddBuilding = () => {
  // State to store the form data
  const [name, setName] = useState('');
  const [amountFloor, setAmountFloor] = useState('');
  const [idQr, setIdQr] = useState('');

  // Function to handle form submission
  const handleAddBuilding = () => {
    // Validate input (you can add more validation as needed)
    if (name === '' || amountFloor === '' || idQr === '') {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Build new building object
    const newBuilding = {
      name,
      amountFloor: parseInt(amountFloor, 10), // Convert to number
      idQr,
    };

    // For now, just alert the new building (you can send it to the server here)
    Alert.alert('Building Added', JSON.stringify(newBuilding));

    // Clear form after submission
    setName('');
    setAmountFloor('');
    setIdQr('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Building</Text>

      {/* Input for building name */}
      <TextInput
        style={styles.input}
        placeholder="Enter Building Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      {/* Input for amount of floors (number) */}
      <TextInput
        style={styles.input}
        placeholder="Enter Number of Floors"
        value={amountFloor}
        onChangeText={text => setAmountFloor(text)}
        keyboardType="numeric" // Ensures numeric input for floors
      />

      {/* Input for QR ID */}
      <TextInput
        style={styles.input}
        placeholder="Enter QR Code ID"
        value={idQr}
        onChangeText={text => setIdQr(text)}
      />

      {/* Button to submit form */}
      <Button title="Add Building" onPress={handleAddBuilding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default AddBuilding;
