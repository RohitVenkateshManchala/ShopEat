// src/screens/RestaurantsScreen.js

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
import { fetchFoodCategories } from "../services/foodService";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

const SkeletonCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonTextLong} />
    <View style={styles.skeletonTextShort} />
  </View>
);

const ErrorView = ({ message, onRetry }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{message}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

const EmptyView = () => (
  <View style={styles.centerContainer}>
    <Text style={styles.emptyText}>No categories found</Text>
  </View>
);

const CategoryCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Image
      source={{ uri: item.strCategoryThumb }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.strCategory}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.strCategoryDescription}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function RestaurantsScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const data = await fetchFoodCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Food</Text>
          <Text style={styles.subHeading}>What are you craving?</Text>
        </View>
        <FlatList
          data={Array.from({ length: 6 })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <SkeletonCard />}
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
        <ErrorView message={error} onRetry={() => loadCategories()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Food</Text>
        <Text style={styles.subHeading}>What are you craving?</Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadCategories(true)}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>All Categories</Text>
        }
        ListEmptyComponent={<EmptyView />}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            onPress={() =>
              navigation.navigate("MealList", {
                category: item.strCategory,
                categoryThumb: item.strCategoryThumb,
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
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  heading: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  subHeading: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  sectionLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    width: "100%",
    height: 110,
  },
  cardBody: {
    padding: SPACING.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  skeletonCard: {
    width: "48%",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
  },
  skeletonImage: {
    width: "100%",
    height: 110,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: SPACING.sm,
  },
  skeletonTextLong: {
    width: "80%",
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginBottom: 6,
  },
  skeletonTextShort: {
    width: "50%",
    height: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
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
  retryButtonText: {
    color: "#FFFFFF",
    ...TYPOGRAPHY.body,
    fontWeight: "600",
  },
});