import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../features/home/screens/HomeScreen';
import ShopScreen from '../features/home/screens/ShopScreen';
import EatScreen from '../features/home/screens/EatScreen';
import CartScreen from '../features/home/screens/CartScreen';
import ProfileScreen from '../features/home/screens/ProfileScreen';

// Define allowed icon names for your tabs (type-safe!)
type TabIconName = 
  | 'home' 
  | 'shopping-cart' 
  | 'restaurant' 
  | 'shopping-bag' 
  | 'person' 
  | 'help';  // fallback

// Optional: Map route names to icon names (even better type safety)
const routeToIcon: Record<string, TabIconName> = {
  Home: 'home',
  Shop: 'shopping-cart',
  Eat: 'restaurant',
  Cart: 'shopping-bag',
  Profile: 'person',
};

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Safe lookup — TypeScript knows it's TabIconName
          const iconName = routeToIcon[route.name] ?? 'help';

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Eat" component={EatScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}