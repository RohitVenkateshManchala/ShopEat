import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { cartItems, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);


  const existingItem = cartItems.find((item) => item.id === product.id);
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

        {!existingItem ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(product)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() => decreaseQty(product.id)}
            >
              <Text style={styles.qtyButton}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>
              {existingItem.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => increaseQty(product.id)}
            >
              <Text style={styles.qtyButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}
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
  addButton: {
  backgroundColor: "#007bff",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 20,
},

addButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

qtyContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#007bff",
  borderRadius: 8,
  marginTop: 20,
  paddingVertical: 10,
},

qtyButton: {
  fontSize: 24,
  color: "#fff",
  paddingHorizontal: 20,
},

qtyText: {
  fontSize: 18,
  color: "#fff",
  fontWeight: "bold",
},

});