import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    const wishlistData = await AsyncStorage.getItem('wishlist');
    if (wishlistData) {
      setWishlist(JSON.parse(wishlistData));
    }
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.wishlistItem}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
              <Text style={styles.removeBtn}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wishlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  removeBtn: {
    color: 'red',
  },
});
