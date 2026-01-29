// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, Platform, PermissionsAndroid, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';
import RestaurantItem from '../components/RestaurantItem';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useFavorites();

  useEffect(() => {
    const getLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Location permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => setLocation(position.coords),
        (err) => setError(err.message)
      );
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchRestaurants();
    }
  }, [location]);

  const fetchRestaurants = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://developers.zomato.com/api/v2.1/search', {
        headers: { 'user-key': 'YOUR_ZOMATO_API_KEY' },
        params: {
          lat: location?.latitude,
          lon: location?.longitude,
          q: query || 'restaurants',
          count: 20,
        },
      });
      setRestaurants(response.data.restaurants || []);
    } catch (err) {
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchRestaurants(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search restaurants or cuisines"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>{error}</Text>}
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantItem
            item={item.restaurant}
            onPress={() => navigation.navigate('Details', { restaurantId: item.restaurant.id })}
            onFavorite={() => dispatch({ type: 'ADD_FAVORITE', payload: item.restaurant })}
          />
        )}
        keyExtractor={(item) => item.restaurant.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default HomeScreen;