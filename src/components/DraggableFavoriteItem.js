import React from 'react';
import { View, Text, Button, PanResponder, Animated } from 'react-native';

const DraggableFavoriteItem = ({ item, index, onReorder, favorites, onRemove }) => {
    const pan = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: (e, gesture) => {
            const newIndex = Math.max(0, Math.min(favorites.length - 1, index + Math.round(gesture.dy / 50)));
            if (newIndex !== index) {
                const newFavorites = [...favorites];
                [newFavorites[index], newFavorites[newIndex]] = [newFavorites[newIndex], newFavorites[index]];
                onReorder(newFavorites);
            }
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        },
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={{ transform: [{ translateY: pan.y }], padding: 10, backgroundColor: '#f0f0f0', marginBottom: 5 }}
        >
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={onRemove} />
        </Animated.View>
    );
};

export default DraggableFavoriteItem;