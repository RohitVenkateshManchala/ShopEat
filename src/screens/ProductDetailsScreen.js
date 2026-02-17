import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.rating}>⭐ {product.rating}</Text>

        <Text style={styles.description}>
          This is a high-quality product designed for modern users.
          It offers excellent performance and durability.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#007bff",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    marginTop: 4,
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});