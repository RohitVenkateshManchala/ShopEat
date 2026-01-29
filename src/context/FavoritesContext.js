import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(
                    item => item.id !== action.payload.id,
                ),
            };
        case 'LOAD_FAVORITES':
            return { ...state, favorites: action.payload };
        case 'REORDER_FAVORITES':
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
};

export const FavoritesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const stored = await AsyncStorage.getItem('favorites');
                if(stored){
                    dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(stored) });
                }
            } catch (error){
                console.error('Failed to load favorites from storage', error);
            }
        };
        loadFavorites();
    }, []);

    useEffect(()=>{
        const saveFavorites = async () =>{
            try{
                await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
            } catch (error){
                console.error('Failed to save favorites to storage', error);
            }
        };
        saveFavorites();
    }, [state.favorites]);

    return(
        <FavoritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => React.useContext(FavoritesContext);