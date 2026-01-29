import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import createNativeStackNavigator from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <FavoritesProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Food Explorer' }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={RestaurantDetailsScreen}
                        options={{title: 'Restaurant Details'}}
                    />
                    <Stack.Screen
                        name="Favorites"
                        component={FavoritesScreen}
                        options={{title: 'My Favorites'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
    );
}