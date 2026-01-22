import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../redux/hooks';
export default function SplashScreen() {
  const navigation = useNavigation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        // @ts-ignore (navigation types later)
        navigation.replace('Main');
      } else {
        // @ts-ignore
        navigation.replace('Auth');
      }
    }, 2000); // 2 sec splash

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ShopEat</Text>
      <ActivityIndicator size="large" color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 48, fontWeight: 'bold', color: '#FF6347', marginBottom: 40 },
});