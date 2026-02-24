import React, { createContext, useState } from "react";
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const toggleWishlist = (product) =>{
        const exists = wishlistItems.find((item)=> item.id === product.id);
        if(exists){
            setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
        } else {
            setWishlistItems([...wishlistItems, product]);
        }
    };

    const isInWishlist = (id) => {
        return wishlistItems.some((item) => item.id === id);
    }

    return (
        <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};