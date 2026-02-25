import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import { COLORS } from "../theme/colors";

export default function HeaderCartButton() {
  const { cartItems } = useContext(CartContext);
  const navigation = useNavigation();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cart")}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <Ionicons
          name="cart-outline"
          size={24}
          color={COLORS.textPrimary}
        />

        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalItems > 99 ? "99+" : totalItems}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },

  iconWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: "600",
  },
});