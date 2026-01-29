// src/screens/RestaurantDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const RestaurantDetailsScreen = ({ route }) => {
  const { restaurantId } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantId}`, {
          headers: { 'user-key': 'YOUR_ZOMATO_API_KEY' },
        });
        setDetails(response.data);
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [restaurantId]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      {details.photo_url && <Image source={{ uri: details.photo_url }} style={styles.image} />}
      <Text>{details.name}</Text>
      <Text>Address: {details.location.address}</Text>
      <Text>Phone: {details.phone_numbers}</Text>
      <Text>Timings: {details.timings}</Text>
      {/* Menu if available: Zomato has /dailymenu but limited; extend as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200 },
});

export default RestaurantDetailsScreen;