const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (limit = 10, skip = 0) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();

}