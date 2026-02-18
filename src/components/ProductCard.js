import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function ProductCard({ item }) {
    const { cartItems, addToCart, increaseQty, decreaseQty } = useContext(CartContext);
    const navigation = useNavigation();
    const product = item;

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProductDetails", { product: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
                {!existingItem ? (
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => addToCart(item)}
                    >
                        <Ionicons name="cart-outline" size={30} color="#007bff" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.qtyContainer}>
                        <TouchableOpacity
                            onPress={() => decreaseQty(product.id)}
                        >
                            <Text style={styles.qtyButton}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>
                            {existingItem.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(product.id)}
                        >
                            <Text style={styles.qtyButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    cartButton: {
        position: "absolute",
        top: 50,
        right: 10,
        left: 100,
    },
    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 50,
        right: 10,
        left: 80,
    },
    qtyButton: {
        fontSize: 20,
        color: "#007bff",
        paddingHorizontal: 10,
    },
    qtyText: {
        fontSize: 16,
        marginHorizontal: 5,
    },
});