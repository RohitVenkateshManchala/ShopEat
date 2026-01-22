import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or FontAwesome, etc.

import HomeScreen from '../features/home/screens/HomeScreen';
import ShopScreen from '../features/home/screens/ShopScreen';
import EatScreen from '../features/home/screens/EatScreen';
import CartScreen from '../features/home/screens/CartScreen';
import ProfileScreen from '../features/home/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Shop') iconName = 'shopping-cart';
          else if (route.name === 'Eat') iconName = 'restaurant';
          else if (route.name === 'Cart') iconName = 'shopping-bag';
          else if (route.name === 'Profile') iconName = 'person';
          else iconName = 'help';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6347', // tomato color theme
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