import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';

const RestaurantItem = ({ item, onPress, onFavorite }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {item.thumb && <Image source={{ uri: item.thumb }} style={styles.image} />}
      <Text>{item.name}</Text>
      <Text>Cuisine: {item.cuisines}</Text>
      <Text>Rating: {item.user_rating.aggregate_rating}</Text>
      <Button title="Add to Favorites" onPress={onFavorite} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { padding: 10, backgroundColor: '#f0f0f0', marginBottom: 5 },
  image: { width: 100, height: 100 },
});

export default RestaurantItem;