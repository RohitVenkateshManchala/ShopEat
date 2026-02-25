import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

export default function OrderHistoryScreen() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const storedOrders = await AsyncStorage.getItem("orders");
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            }
        } catch (error) {
            console.log("Error loading orders:", error);
        }
    };

    if (orders.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Orders Yet 🛍️</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContent}
                data={orders}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={styles.screenTitle}>My Orders</Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.95}>
                        {/* Header */}
                        <View style={styles.headerRow}>
                            <Text style={styles.orderId}>
                                Order #{item.id}
                            </Text>

                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>
                                    Delivered
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.date}>{item.date}</Text>

                        {/* Items */}
                        <View style={styles.itemsContainer}>
                            {item.items.slice(0, 2).map((product, index) => (
                                <View key={index} style={styles.itemRow}>
                                    <Image
                                        source={{ uri: product.thumbnail }}
                                        style={styles.image}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.productName}
                                        >
                                            {product.title}
                                        </Text>
                                        <Text style={styles.quantity}>
                                            Qty: {product.quantity}
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            {item.items.length > 2 && (
                                <Text style={styles.moreItems}>
                                    +{item.items.length - 2} more items
                                </Text>
                            )}
                        </View>

                        {/* Footer */}
                        <View style={styles.footerRow}>
                            <Text style={styles.totalLabel}>
                                Total Amount
                            </Text>
                            <Text style={styles.total}>
                                ₹ {item.total}
                            </Text>
                        </View>
                    </TouchableOpacity>
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

    listContent: {
        padding: 20,
        paddingBottom: 40,
    },

    screenTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 24,
    },

    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 22,
        padding: 22,
        marginBottom: 22,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    orderId: {
        fontSize: 15,
        color: COLORS.textSecondary,
        fontWeight: "500",
    },

    statusBadge: {
        backgroundColor: "#E6F7EC",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 50,
    },

    statusText: {
        color: "#0F9D58",
        fontWeight: "600",
        fontSize: 12,
    },

    date: {
        marginTop: 6,
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    itemsContainer: {
        marginTop: 16,
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    image: {
        width: 52,
        height: 52,
        borderRadius: 10,
        marginRight: 12,
    },

    productName: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },

    quantity: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    moreItems: {
        marginTop: 6,
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: "500",
    },

    footerRow: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#F1F5F9",
        paddingTop: 14,
    },

    totalLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    total: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.primary,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },

    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
});