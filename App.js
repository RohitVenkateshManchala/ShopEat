import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import AuthProvider from "./src/context/AuthContext";
import CartProvider from "./src/context/CartContext";
import {WishlistProvider} from "./src/context/WishlistContext";

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>

    );
}