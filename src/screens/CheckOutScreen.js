import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { CartContext } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

export default function CheckoutScreen({ navigation }) {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const grandTotal = totalPrice + deliveryCharge;

  const generateOrderId = () => {
    return "ORD" + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !city || !pincode) {
      Alert.alert("Error", "Please fill all shipping details");
      return;
    }

    if (paymentMethod === "UPI" && !upiId) {
      Alert.alert("Error", "Enter UPI ID");
      return;
    }

    if (paymentMethod === "CARD" && !cardNumber) {
      Alert.alert("Error", "Enter Card Number");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const orderId = generateOrderId();

      const newOrder = {
        id: orderId,
        items: cartItems,
        total: grandTotal,
        date: new Date().toLocaleString(),
        paymentMethod,
      };

      try {
        const existingOrders = await AsyncStorage.getItem("orders");
        const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];

        const updatedOrders = [newOrder, ...parsedOrders];

        await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
      } catch (error) {
        console.log("Error saving order:", error);
      }

      setLoading(false);
      clearCart();
      navigation.replace("Success", { orderId });
    }, 2000);
  };


  const renderPaymentOption = (method, label) => (
    <TouchableOpacity
      style={styles.paymentOption}
      onPress={() => setPaymentMethod(method)}
    >
      <View style={styles.radioCircle}>
        {paymentMethod === method && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.paymentText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        contentContainerStyle={{ padding: SPACING.lg, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= SHIPPING ================= */}
        <Text style={styles.sectionTitle}>Shipping Details</Text>

        <View style={styles.card}>
          <TextInput placeholder="Full Name" placeholderTextColor={COLORS.textSecondary} style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Phone Number" placeholderTextColor={COLORS.textSecondary} style={styles.input} keyboardType="numeric" value={phone} onChangeText={setPhone} />
          <TextInput placeholder="Address" placeholderTextColor={COLORS.textSecondary} style={styles.input} value={address} onChangeText={setAddress} />
          <TextInput placeholder="City" placeholderTextColor={COLORS.textSecondary} style={styles.input} value={city} onChangeText={setCity} />
          <TextInput placeholder="Pincode" placeholderTextColor={COLORS.textSecondary} style={styles.input} keyboardType="numeric" value={pincode} onChangeText={setPincode} />
        </View>

        {/* ================= PAYMENT ================= */}
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.card}>
          {renderPaymentOption("COD", "Cash on Delivery")}
          {renderPaymentOption("UPI", "UPI")}
          {renderPaymentOption("CARD", "Credit / Debit Card")}

          {paymentMethod === "UPI" && (
            <TextInput
              placeholder="Enter UPI ID"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
              value={upiId}
              onChangeText={setUpiId}
            />
          )}

          {paymentMethod === "CARD" && (
            <TextInput
              placeholder="Enter Card Number"
              placeholderTextColor={COLORS.textSecondary}
              style={styles.input}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          )}
        </View>

        {/* ================= SUMMARY ================= */}
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.card}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryTitle}>{item.title}</Text>
              <Text style={styles.summaryPrice}>
                ₹ {item.price} x {item.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹ {totalPrice}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>
              {deliveryCharge === 0 ? "Free" : `₹ ${deliveryCharge}`}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.grandLabel}>Grand Total</Text>
            <Text style={styles.grandLabel}>₹ {grandTotal}</Text>
          </View>
        </View>

        {/* ================= BUTTON ================= */}
        <TouchableOpacity
          style={styles.placeOrder}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    color: COLORS.textPrimary,
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },

  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  paymentText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },

  summaryItem: {
    marginBottom: SPACING.sm,
  },

  summaryTitle: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
  },

  summaryPrice: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },

  priceLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  priceValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },

  grandLabel: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
  },

  placeOrder: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: 30,
    alignItems: "center",
    marginTop: SPACING.lg,
  },

  placeOrderText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background,
  },
});