import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ImageBackground,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);


        setTimeout(() => {
            login();
            setLoading(false);
        }, 1500);
    }
    return (
        <ImageBackground
            source={require("../assets/images/background_image.jpg")}
            style={styles.background}
        >


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Welcome Back 👋</Text>

                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            autoCapitalize="none"
                        />

                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                        {error ? <Text style={styles.error}>{error}</Text> : null}

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "flex-end",
    },

    card: {
        width: "100%",
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    content: {
        width: "100%",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
    },

    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },

    button: {
        backgroundColor: "#000",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },

    error: {
        color: "#ff4d4f",
        marginBottom: 10,
        textAlign: "center",
    },
});