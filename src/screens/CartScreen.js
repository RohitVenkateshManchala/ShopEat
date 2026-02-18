import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const { cartItems, increaseQty, decreaseQty, totalPrice } =
    useContext(CartContext);

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>₹ {item.price}</Text>

            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => decreaseQty(item.id)}
              >
                <Text style={styles.qtyButton}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => increaseQty(item.id)}
              >
                <Text style={styles.qtyButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ₹ {totalPrice}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Checkout")}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 12,
    borderRadius: 10,
    marginTop: 30,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  qtyButton: {
    fontSize: 22,
    paddingHorizontal: 12,
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    padding: 16,
    margin: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});