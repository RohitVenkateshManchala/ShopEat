import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPOGRAPHY } from "../theme/typography";

export default function ProductCard({ item, allProducts }) {
    const { cartItems, addToCart, increaseQty, decreaseQty } =
        useContext(CartContext);

    const { isInWishlist, toggleWishlist } =
        useContext(WishlistContext);

    const navigation = useNavigation();

    const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
    );

    const inWishlist = isInWishlist(item.id);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
                navigation.navigate("ProductDetails", {
                    product: item,
                    allProducts,
                })
            }
        >
            {/* Image Section */}
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                />

                {/* Wishlist */}
                <TouchableOpacity
                    style={styles.wishlistIcon}
                    onPress={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                    }}
                >
                    <Ionicons
                        name={inWishlist ? "heart" : "heart-outline"}
                        size={18}
                        color={inWishlist ? COLORS.primary : COLORS.textSecondary}
                    />
                </TouchableOpacity>
            </View>

            {/* Info Section */}
            <View style={styles.infoContainer}>
                <Text
                    style={styles.title}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                <Text style={styles.price}>
                    ₹ {item.price}
                </Text>

                <Text style={styles.rating}>
                    ⭐ {item.rating}
                </Text>

                {!existingItem ? (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                        }}
                    >
                        <Text style={styles.addButtonText}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.qtyContainer}>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                decreaseQty(item.id);
                            }}
                        >
                            <Text style={styles.qtyButton}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>
                            {existingItem.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                increaseQty(item.id);
                            }}
                        >
                            <Text style={styles.qtyButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 18,
        marginBottom: SPACING.lg,
        marginHorizontal: SPACING.sm,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },

    imageWrapper: {
        position: "relative",
    },

    image: {
        width: "100%",
        height: 160,
    },

    wishlistIcon: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: COLORS.background,
        padding: 8,
        borderRadius: 20,
    },

    infoContainer: {
        padding: SPACING.md,
    },

    title: {
        ...TYPOGRAPHY.body,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },

    price: {
        marginTop: 6,
        ...TYPOGRAPHY.subtitle,
        color: COLORS.primary,
    },

    rating: {
        marginTop: 4,
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    addButton: {
        marginTop: SPACING.md,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },

    addButtonText: {
        color: COLORS.background,
        fontWeight: "600",
        fontSize: 14,
    },

    qtyContainer: {
        marginTop: SPACING.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    qtyButton: {
        fontSize: 18,
        color: COLORS.background,
    },

    qtyText: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.background,
    },
});