import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMealsByCategory } from "../services/foodService";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";
const SkeletonMealCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonText} />
  </View>
);

const MealCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Image
      source={{ uri: item.strMealThumb }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.strMeal}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function MealListScreen({ route, navigation }) {
  const { category = "Meals", categoryThumb } = route.params ?? {};

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    navigation.setOptions({ title: category });
  }, [category, navigation]);

  const loadMeals = useCallback(async (isRefreshing = false) => {
    try {
      isRefreshing ? setRefreshing(true) : setLoading(true);
      setError(null);
      const data = await fetchMealsByCategory(category);
      setMeals(data);
    } catch (err) {
      setError(err.message || "Could not load meals. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);
  useEffect(() => {
    loadMeals();
  }, [loadMeals]);
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Array.from({ length: 8 })}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => <SkeletonMealCard />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadMeals()}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {categoryThumb ? (
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: categoryThumb }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>{category}</Text>
        </View>
      ) : (
        <View style={styles.plainHeader}>
          <Text style={styles.heading}>{category}</Text>
        </View>
      )}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadMeals(true)}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListHeaderComponent={
          <Text style={styles.countLabel}>
            {meals.length} {meals.length === 1 ? "meal" : "meals"} found
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No meals found in this category</Text>
          </View>
        }
        renderItem={({ item }) => (
          <MealCard
            item={item}
            onPress={() =>
              navigation.navigate("MealDetails", {
                mealId: item.idMeal,
                mealName: item.strMeal,
              })
            }
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
  heroBanner: {
    height: 160,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  heroTitle: {
    position: "absolute",
    bottom: SPACING.md,
    left: SPACING.lg,
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  plainHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  heading: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 120,
    paddingTop: SPACING.md,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  countLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },

  card: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 160,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  skeletonCard: {
    width: "48%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skeletonImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E7EB",
  },
  skeletonText: {
    position: "absolute",
    bottom: SPACING.sm,
    left: SPACING.sm,
    width: "70%",
    height: 12,
    backgroundColor: "#D1D5DB",
    borderRadius: 6,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    marginTop: 60,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.danger,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
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