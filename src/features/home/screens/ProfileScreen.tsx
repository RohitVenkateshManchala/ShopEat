import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/slices/authSlice';
import { persistor } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              dispatch(logout());
              await persistor.purge();
              Alert.alert('Success', 'You have been logged out.');
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert('Error', 'Something went wrong during logout.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Welcome back! (placeholder for user info)</Text>

      {/* Example user info + icon */}
      <View style={styles.userInfo}>
        <MaterialIcons name="person" size={80} color="#FF6347" />
        <Text style={styles.userName}>Rohit Kumar</Text>
        <Text style={styles.userEmail}>example@email.com</Text>
      </View>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 40,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});