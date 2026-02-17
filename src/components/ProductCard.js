import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProductDetails", { product: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
        </TouchableOpacity >
    );

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 4,
        marginBottom: 16,
        flex: 1,
        marginHorizontal: 8,
    },
    image: {
        width: "100%",
        height: 140,
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    price: {
        marginTop: 4,
        fontSize: 15,
        color: "#007bff",
    },
    rating: {
        marginTop: 4,
        fontSize: 14,
        color: "#888",
    },
});