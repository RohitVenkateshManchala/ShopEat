import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useAppDispatch } from '../../../redux/hooks';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogin = () => {
    // Very basic validation (improve later)
    if (!phoneOrEmail || !password) {
      Alert.alert('Error', 'Please enter phone/email and password');
      return;
    }

    // For testing: fake successful login
    // In real app → call API → save token → get user data
    dispatch(
      loginSuccess({
        name: 'Rohit Test',
        email: phoneOrEmail,
      })
    );

    Alert.alert('Success', 'Logged in! (fake for now)');
    // Navigation will auto-redirect because isAuthenticated changed
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to ShopEat</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone or Email"
          value={phoneOrEmail}
          onChangeText={setPhoneOrEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert('Coming soon', 'Signup flow in next step')}
        >
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert('Coming soon', 'Forgot password flow')}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#FF6347',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
});