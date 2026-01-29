import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import DraggableFavoriteItem from '../components/DraggableFavoriteItem';

const FavoritesScreen = () => {
  const { state, dispatch } = useFavorites();
  const [animValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleReorder = (newFavorites) => {
    dispatch({ type: 'REORDER_FAVORITES', payload: newFavorites });
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: animValue }]}>Favorites</Animated.Text>
      <FlatList
        data={state.favorites}
        renderItem={({ item, index }) => (
          <DraggableFavoriteItem
            item={item}
            index={index}
            onReorder={handleReorder}
            favorites={state.favorites}
            onRemove={() => dispatch({ type: 'REMOVE_FAVORITE', payload: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});

export default FavoritesScreen;