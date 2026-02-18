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
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        refreshing={loading}
        onRefresh={() => loadProducts(true)}
        onEndReached={() => loadProducts()}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListFooterComponent={
          loading && page > 0 ? (
            <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
          ) : null
        }

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
  },
  searchInput: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});