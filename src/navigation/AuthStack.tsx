import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
// import SignupScreen from '../features/auth/screens/SignupScreen';
// import OTPScreen from '../features/auth/screens/OTPScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
      {/* <Stack.Screen name="OTP" component={OTPScreen} /> */}
    </Stack.Navigator>
  );
}