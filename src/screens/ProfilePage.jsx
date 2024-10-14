import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProfilePage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            {/* Replace with icons */}
            <Text style={styles.icon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.icon}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          {/* Circle with user's initials */}
          <Text style={styles.avatarText}>T</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Tradly Team</Text>
          <Text style={styles.userPhone}>+1 9998887776</Text>
          <Text style={styles.userEmail}>info@tradly.co</Text>
        </View>
      </View>

      {/* Profile Actions */}
      <View style={styles.profileActions}>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Option */}
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  icons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 10,
  },
  profileInfo: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: '#000',
  },
  userInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  profileActions: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
  },
  actionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  logout: {
    padding: 15,
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
