import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

export default function SuccessScreen({ route, navigation }) {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={40} color={COLORS.background} />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Order Confirmed
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Thank you for shopping with us.
        </Text>

        {/* Order Card */}
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderId}>{orderId}</Text>
        </View>

      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    padding: SPACING.lg,
  },

  content: {
    alignItems: "center",
    marginTop: 80,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },

  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },

  orderCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: "center",
  },

  orderLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },

  orderId: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.background,
  },
});