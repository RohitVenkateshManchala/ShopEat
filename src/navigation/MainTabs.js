// src/navigation/MainTabs.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/colors";
import HomeStack from "./HomeStack";
import FoodStack from "./FoodStack";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import WishlistScreen from "../screens/WishlistScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const TAB_ICONS = {
  Home:     ["home",        "home-outline"],
  Food:     ["restaurant",  "restaurant-outline"],
  Search:   ["search",      "search-outline"],
  Cart:     ["cart",        "cart-outline"],
  Wishlist: ["heart",       "heart-outline"],
  Orders:   ["receipt",     "receipt-outline"],
  Profile:  ["person",      "person-outline"],
};

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = TAB_ICONS[route.name] ?? ["help", "help-outline"];
          return (
            <Ionicons
              name={focused ? active : inactive}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home"     component={HomeStack} />
      <Tab.Screen name="Food"     component={FoodStack} />
      <Tab.Screen name="Search"   component={SearchScreen} />
      <Tab.Screen name="Cart"     component={CartScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Orders"   component={OrderHistoryScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}