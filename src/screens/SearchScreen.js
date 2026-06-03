import React, { useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { searchMeals } from "../services/foodService";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

const DEBOUNCE_MS = 500;

const SectionHeader = ({ title, count }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionCount}>{count} results</Text>
  </View>
);

const ResultCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Image
      source={{ uri: item.image }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardBody}>
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>
          {item.type === "food" ? "🍔 Food" : "🛍️ Product"}
        </Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {item.subtitle}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
  </TouchableOpacity>
);

const EmptyResults = ({ query }) => (
  <View style={styles.emptyContainer}>
    <Ionicons name="search-outline" size={52} color={COLORS.border} />
    <Text style={styles.emptyTitle}>No results for "{query}"</Text>
    <Text style={styles.emptySubtitle}>
      Try a different word or check your spelling
    </Text>
  </View>
);

const IdleState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="search" size={52} color={COLORS.border} />
    <Text style={styles.emptyTitle}>Search ShopEat</Text>
    <Text style={styles.emptySubtitle}>
      Find products and food recipes in one place
    </Text>
  </View>
);

export default function SearchScreen() {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const [productsResult, foodResult] = await Promise.allSettled([
        fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=10`
        ).then((r) => r.json()),
        searchMeals(searchQuery),
      ]);

      const combined = [];
      if (productsResult.status === "fulfilled") {
        const products = productsResult.value?.products || [];
        products.forEach((p) =>
          combined.push({
            id: `product_${p.id}`,
            title: p.title,
            image: p.thumbnail,
            subtitle: `₹${p.price} · ${p.category}`,
            type: "product",
            raw: p,
          })
        );
      }
      if (foodResult.status === "fulfilled") {
        const meals = foodResult.value || [];
        meals.forEach((m) =>
          combined.push({
            id: `food_${m.id}`,
            title: m.name,
            image: m.image,
            subtitle: `${m.category} · ${m.area || "International"}`,
            type: "food",
            raw: m,
          })
        );
      }

      setResults(combined);
    } catch (err) {
      console.error("[SearchScreen] search error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleQueryChange = (text) => {
    setQuery(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      performSearch(text);
    }, DEBOUNCE_MS);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const handleResultPress = (item) => {
    Keyboard.dismiss();
    if (item.type === "product") {
      navigation.navigate("Home", {
        screen: "ProductDetails",
        params: { product: item.raw },
      });
    } else {
      navigation.navigate("Food", {
        screen: "MealDetails",
        params: { mealId: item.raw.id, mealName: item.title },
      });
    }
  };

  const showEmpty = hasSearched && !loading && results.length === 0;
  const showIdle = !hasSearched && !loading;
  const showResults = !loading && results.length > 0;
  const productResults = results.filter((r) => r.type === "product");
  const foodResults = results.filter((r) => r.type === "food");
  const flatData = [];
  if (productResults.length > 0) {
    flatData.push({ id: "header_products", isHeader: true, title: "Products", count: productResults.length });
    flatData.push(...productResults);
  }
  if (foodResults.length > 0) {
    flatData.push({ id: "header_food", isHeader: true, title: "Food & Recipes", count: foodResults.length });
    flatData.push(...foodResults);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search products & food..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={handleQueryChange}
          returnKeyType="search"
          onSubmitEditing={() => performSearch(query)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}
      {showIdle && <IdleState />}
      {showEmpty && <EmptyResults query={query} />}

      {showResults && (
        <FlatList
          data={flatData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            if (item.isHeader) {
              return <SectionHeader title={item.title} count={item.count} />;
            }
            return (
              <ResultCard item={item} onPress={() => handleResultPress(item)} />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: SPACING.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  sectionCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingRight: SPACING.sm,
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  cardBody: {
    flex: 1,
    padding: SPACING.sm,
    gap: 3,
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeBadgeText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    gap: 10,
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
  listContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  separator: {
    height: 8,
  },
});