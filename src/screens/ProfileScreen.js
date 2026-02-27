import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const user = {
    name: "Rohit",
    email: "rohit@email.com",
  };

  const { logout } = useContext(AuthContext);
  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.background} />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <MenuItem
            icon="receipt-outline"
            title="My Orders"
            onPress={() => navigation.navigate("Orders")}
          />

          <MenuItem
            icon="heart-outline"
            title="Wishlist"
            onPress={() => navigation.navigate("Wishlist")}
          />

          <MenuItem
            icon="location-outline"
            title="Address"
            onPress={() => { }}
          />

          <MenuItem
            icon="card-outline"
            title="Payment Methods"
            onPress={() => { }}
          />

          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => { }}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },

  email: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },

  menuSection: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },

  menuText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },

  logoutButton: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.lg,
    backgroundColor: "#FF4D4F",
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: "center",
  },

  logoutText: {
    ...TYPOGRAPHY.button,
    color: "#fff",
  },
});