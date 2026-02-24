import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";

export default function HeaderCartButton() {
    const { cartItems } = useContext(CartContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Cart")}
        >
            <View>
                <Ionicons name="cart-outline" size={26} color="#000" />

                {cartItems.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {cartItems.length}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
    badge: {
        position: "absolute",
        top: -6,
        right: -8,
        backgroundColor: "red",
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
});