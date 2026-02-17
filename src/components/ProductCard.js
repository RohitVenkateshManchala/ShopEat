import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProductCard({ item }) {
    return (
        <TouchableOpacity style={styles.card} >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
        </TouchableOpacity >
    );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    marginTop: 4,
    fontSize: 15,
    color: "#007bff",
  },
  rating: {
    marginTop: 4,
    fontSize: 14,
    color: "#888",
  },
});