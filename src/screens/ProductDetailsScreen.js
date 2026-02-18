import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { CartContext } from "../context/CartContext";

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { cartItems, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.images?.[0] || product.thumbnail }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.brand}>Brand: {product.brand}</Text>

        <Text style={styles.price}>₹ {product.price}</Text>

        {product.discountPercentage && (
          <Text style={styles.discount}>
            {product.discountPercentage}% OFF
          </Text>
        )}

        <Text style={styles.rating}>⭐ {product.rating}</Text>

        {product.stock < 10 && (
          <Text style={styles.stock}>
            Only {product.stock} left in stock!
          </Text>
        )}

        <Text style={styles.description}>
          {product.description}
        </Text>

        {!existingItem ? (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                animateButton();
                addToCart(product);
              }}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => {
                  animateButton();
                  decreaseQty(product.id);
                }}
              >
                <Text style={styles.qtyButton}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>
                {existingItem.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  animateButton();
                  increaseQty(product.id);
                }}
              >
                <Text style={styles.qtyButton}>+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
  brand: {
    marginTop: 4,
    color: "#555",
  },

  discount: {
    marginTop: 4,
    color: "green",
    fontWeight: "bold",
  },

  stock: {
    marginTop: 6,
    color: "red",
    fontWeight: "600",
  },


});