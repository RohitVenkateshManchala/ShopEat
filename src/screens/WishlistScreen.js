import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

const EmptyWishlist = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color={COLORS.border} />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Tap the heart on any product to save it here
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.exploreButtonText}>Explore Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const WishlistCard = ({ item, onRemove, onMoveToCart }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.thumbnail }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardPrice}>₹ {item.price}</Text>
      {item.rating ? (
        <Text style={styles.cardRating}>⭐ {item.rating}</Text>
      ) : null}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={onMoveToCart}
          activeOpacity={0.85}
        >
          <Ionicons name="cart-outline" size={14} color="#FFFFFF" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          activeOpacity={0.85}
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function WishlistScreen() {
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const wishlistCount = wishlistItems.length;

  const handleMoveToCart = (item) => {
    addToCart(item);
    toggleWishlist(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Wishlist</Text>
        {wishlistCount > 0 && (
          <Text style={styles.countText}>
            {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
          </Text>
        )}
      </View>

      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyWishlist />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <WishlistCard
            item={item}
            onRemove={() => toggleWishlist(item)}
            onMoveToCart={() => handleMoveToCart(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  heading: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  countText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 120,
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    width: 110,
    height: 130,
  },
  cardBody: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: "space-between",
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  cardPrice: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.primary,
    marginTop: 4,
  },
  cardRating: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: SPACING.sm,
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    borderRadius: 20,
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  removeButton: {
    padding: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    gap: 12,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  exploreButton: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 30,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    ...TYPOGRAPHY.body,
  },
  separator: {
    height: SPACING.md,
  },
});