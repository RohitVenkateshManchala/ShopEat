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
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  brand: {
    marginTop: 4,
    color: "#555",
  },
  price: {
    fontSize: 20,
    color: "#007bff",
    marginTop: 8,
  },
  discount: {
    marginTop: 4,
    color: "green",
    fontWeight: "bold",
  },
  rating: {
    marginTop: 4,
  },
  stock: {
    marginTop: 6,
    color: "red",
    fontWeight: "600",
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007bff",
    width: 8,
    height: 8,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  bottomButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomQtyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
  },
  qtyButton: {
    fontSize: 24,
    color: "#fff",
    paddingHorizontal: 20,
  },
  qtyText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  similarTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  similarCard: {
    width: 150,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    elevation: 3,
  },
  similarImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  similarName: {
    marginTop: 6,
    fontSize: 14,
  },
  similarPrice: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#007bff",
  },
  detailsWishlist: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});