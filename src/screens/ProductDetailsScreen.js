import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");

export default function ProductDetailsScreen({ route }) {
  const { product, allProducts } = route.params;
  const navigation = useNavigation();

  const { cartItems, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const { isInWishlist, toggleWishlist } =
    useContext(WishlistContext);

  const [activeIndex, setActiveIndex] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const inWishlist = isInWishlist(product.id);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  const imageList =
    product?.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const similarProducts = allProducts
    ?.filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 6);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* IMAGE SLIDER */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const slideSize =
                event.nativeEvent.layoutMeasurement.width;
              const index = Math.floor(
                event.nativeEvent.contentOffset.x / slideSize
              );
              setActiveIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {imageList.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.image}
              />
            ))}
          </ScrollView>

          {/* Wishlist Heart */}
          <TouchableOpacity
            style={styles.detailsWishlist}
            onPress={() => toggleWishlist(product)}
          >
            <Ionicons
              name={inWishlist ? "heart" : "heart-outline"}
              size={28}
              color={inWishlist ? "red" : "#fff"}
            />
          </TouchableOpacity>

          {/* Dots */}
          <View style={styles.dotsContainer}>
            {imageList.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* PRODUCT INFO */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.brand}>
            Brand: {product.brand}
          </Text>

          <Text style={styles.price}>
            ₹ {product.price}
          </Text>

          {product.discountPercentage && (
            <Text style={styles.discount}>
              {product.discountPercentage}% OFF
            </Text>
          )}

          <Text style={styles.rating}>
            ⭐ {product.rating}
          </Text>

          {product.stock < 10 && (
            <Text style={styles.stock}>
              Only {product.stock} left in stock!
            </Text>
          )}

          <Text style={styles.description}>
            {product.description}
          </Text>
        </View>

        {/* SIMILAR PRODUCTS */}
        {similarProducts?.length > 0 && (
          <>
            <Text style={styles.similarTitle}>
              Similar Products
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
              }}
            >
              {similarProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.similarCard}
                  onPress={() =>
                    navigation.push("ProductDetails", {
                      product: item,
                      allProducts,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.similarImage}
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.similarName}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.similarPrice}>
                    ₹ {item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* FIXED BOTTOM BAR */}
      <View style={styles.bottomBar}>
        {!existingItem ? (
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }] }}
          >
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                animateButton();
                addToCart(product);
              }}
            >
              <Text style={styles.bottomButtonText}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.bottomQtyContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  image: {
    width: width,
    height: 340,
    backgroundColor: COLORS.surface,
  },

  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    lineHeight: 30,
  },

  brand: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },

  price: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 14,
  },

  discount: {
    marginTop: 6,
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 14,
  },

  rating: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  stock: {
    marginTop: 8,
    fontSize: 13,
    color: "#DC2626",
    fontWeight: "600",
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: COLORS.primary,
    width: 8,
    height: 8,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 15,
  },

  bottomButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  bottomButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  bottomQtyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  qtyButton: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "600",
  },

  qtyText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },

  similarTitle: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 20,
    color: COLORS.textPrimary,
  },

  similarCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  similarImage: {
    width: "100%",
    height: 130,
    borderRadius: 14,
  },

  similarName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  similarPrice: {
    marginTop: 6,
    fontWeight: "700",
    fontSize: 15,
    color: COLORS.primary,
  },

  detailsWishlist: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 30,
  },
});