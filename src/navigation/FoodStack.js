import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import MealListScreen from "../screens/MealListScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import HeaderCartButton from "../components/HeaderCartButton";

const Stack = createNativeStackNavigator();

export default function FoodStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderCartButton />,
      }}>
      <Stack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MealList"
        component={MealListScreen}
        options={{
          title: "Meals",
          headerRight: () => <HeaderCartButton />,
        }}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={{
          title: "Details",
          headerRight: () => <HeaderCartButton />,
        }}
      />
    </Stack.Navigator>
  );
}