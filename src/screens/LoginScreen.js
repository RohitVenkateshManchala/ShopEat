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
        justifyContent: "center",
    },
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    card: {
        marginTop: 200,
        borderTopLeftRadius: 150,
        width: "100%",
        height: "75%",
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    content: {
        marginTop: 100,
    }
});