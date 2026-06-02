import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchMealById } from "../services/foodService";
import { CartContext } from "../context/CartContext";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

export default function MealDetailsScreen({ route, navigation }) {
  const { mealId, mealName = "Meal Details" } = route.params ?? {};

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    navigation.setOptions({ title: mealName });
  }, [mealName, navigation]);

  const loadMeal = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMealById(mealId);
      setMeal(data);
    } catch (err) {
      setError(err.message || "Could not load meal details.");
    } finally {
      setLoading(false);
    }
  }, [mealId]);

  useEffect(() => {
    loadMeal();
  }, [loadMeal]);
  const handleAddToCart = () => {
    if (!meal) return;
    const cartItem = {
      id: `meal_${meal.id}`,
      title: meal.name,
      price: 199,
      thumbnail: meal.image,
      category: meal.category,
      type: "food",
      quantity: 1,
    };

    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };
  const handleWatchVideo = async () => {
    if (!meal?.youtubeUrl) return;
    const canOpen = await Linking.canOpenURL(meal.youtubeUrl);
    if (canOpen) {
      Linking.openURL(meal.youtubeUrl);
    }
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.mutedText, { marginTop: SPACING.md }]}>
            Loading meal details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMeal}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (!meal) return null;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: meal.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.mealTitle}>{meal.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Ionicons name="restaurant-outline" size={12} color={COLORS.textSecondary} />
              <Text style={styles.badgeText}>{meal.category}</Text>
            </View>
            {meal.area ? (
              <View style={styles.badge}>
                <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
                <Text style={styles.badgeText}>{meal.area}</Text>
              </View>
            ) : null}
          </View>
          {meal.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {meal.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsGrid}>
            {meal.ingredients.map((ing, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientName}>{ing.name}</Text>
                <Text style={styles.ingredientMeasure}>{ing.measure}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{meal.instructions}</Text>
          {meal.youtubeUrl ? (
            <>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.youtubeButton}
                onPress={handleWatchVideo}
                activeOpacity={0.85}>
                <Ionicons name="logo-youtube" size={20} color="#FF0000" />
                <Text style={styles.youtubeText}>Watch on YouTube</Text>
              </TouchableOpacity>
            </>
          ) : null}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
      <View style={styles.ctaContainer}>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>₹199</Text>
        </View>
        <TouchableOpacity
          style={[styles.addToCartBtn, addedToCart && styles.addedBtn]}
          onPress={handleAddToCart}
          activeOpacity={0.85}>
          <Ionicons
            name={addedToCart ? "checkmark" : "cart-outline"}
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.addToCartText}>
            {addedToCart ? "Added!" : "Add to Cart"}
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
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  heroImage: {
    width: "100%",
    height: 260,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: SPACING.sm,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
    marginBottom: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  ingredientsGrid: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  ingredientName: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  ingredientMeasure: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  instructions: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  youtubeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 12,
    paddingVertical: SPACING.md,
  },
  youtubeText: {
    color: "#FF0000",
    fontWeight: "600",
    fontSize: 14,
  },
  ctaContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 12,
  },
  priceBox: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  addToCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: 30,
  },
  addedBtn: {
    backgroundColor: COLORS.success,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.danger,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  mutedText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 30,
  },
  retryText: {
    color: "#FFFFFF",
    ...TYPOGRAPHY.body,
    fontWeight: "600",
  },
});