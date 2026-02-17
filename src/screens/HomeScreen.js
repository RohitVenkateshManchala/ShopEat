import React, { useState } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { products as productData } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {
  const [products, setProducts] = useState(productData);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setProducts([...productData].sort(() => Math.random() - 0.5));
      setRefreshing(false);
    }, 1500);
  };

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}

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