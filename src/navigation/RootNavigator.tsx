// src/navigation/RootNavigator.tsx
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

export default function RootNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // This is the ONLY correct pattern
  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}