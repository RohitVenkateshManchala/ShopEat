import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();

    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (e) {
            console.log('Failed to fetch token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (identifier) => {
        const fakeToken = "dummy-token-123";

        const userData = {
            id: "1",
            name: identifier,
            email: identifier.includes("@") ? identifier : `${identifier}@demo.com`,
        };

        await AsyncStorage.setItem("userToken", fakeToken);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        setUserToken(fakeToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}