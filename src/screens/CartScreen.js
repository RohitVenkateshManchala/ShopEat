import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography"

export default function CartScreen() {
  const { cartItems, increaseQty, decreaseQty, totalPrice } =
    useContext(CartContext);

  const navigation = useNavigation();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png",
          }}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven’t added anything yet.
        </Text>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={() =>
            navigation.navigate("Home", {
              screen: "HomeScreen",
            })
          }
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item.id)}
                >
                  <Text style={styles.qtyButton}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item.id)}
                >
                  <Text style={styles.qtyButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 140 }}
      />

      <View style={styles.bottomSection}>
        <Text style={styles.totalText}>
          Total: ₹ {totalPrice}
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ================= EMPTY STATE ================= */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
  },

  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: SPACING.lg,
    opacity: 0.8,
  },

  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },

  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },

  shopButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
  },

  shopButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background,
  },

  /* ================= CART CARD ================= */

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 20,
    padding: SPACING.md,
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 16,
  },

  infoContainer: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "space-between",
  },

  title: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
  },

  price: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },

  qtyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },

  qtyButton: {
    ...TYPOGRAPHY.h3,
    color: COLORS.background,
  },

  qtyText: {
    ...TYPOGRAPHY.bodyBold,
    marginHorizontal: SPACING.md,
    color: COLORS.textPrimary,
  },

  /* ================= BOTTOM SECTION ================= */

  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },

  totalText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },

  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 30,
    alignItems: "center",
  },

  checkoutText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background,
  },
});