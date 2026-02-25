import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const LIMIT = 100;

  const loadProducts = async (isRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(LIMIT, isRefresh ? 0 : page * LIMIT);
      if (isRefresh) {
        console.log(data, "EFFE");

        setProducts(data.products);
        setPage(1);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, []);
  const filteredProducts = products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.subHeading}>Find your style</Text>
      </View>

      {/* ===== SEARCH ===== */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* ===== PRODUCT GRID ===== */}
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: SPACING.md,
          paddingBottom: 120,
        }}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard item={item} allProducts={products} />
        )}
        refreshing={loading}
        onRefresh={() => loadProducts(true)}
        onEndReached={() => loadProducts()}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListFooterComponent={
          loading && page > 0 ? (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={{ marginVertical: SPACING.md }}
            />
          ) : null
        }
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

  searchWrapper: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },

  searchInput: {
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.body,
  },
});