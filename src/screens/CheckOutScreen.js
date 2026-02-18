import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";

export default function CheckoutScreen({ navigation }) {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Summary</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>
              ₹ {item.price} x {item.quantity}
            </Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ₹ {totalPrice}</Text>

      <TouchableOpacity
        style={styles.placeOrder}
        onPress={() => {
          clearCart();
          navigation.replace("Success")
        }}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  item: { marginBottom: 10 },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  placeOrder: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
