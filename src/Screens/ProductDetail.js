import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetail({ route }) {
  const { product } = route.params; // Receiving product data from navigation

  const addToCart = async () => {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to Cart!');
  };

  const addToWishlist = async () => {
    let wishlist = await AsyncStorage.getItem('wishlist');
    wishlist = wishlist ? JSON.parse(wishlist) : [];
    wishlist.push(product);
    await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Added to Wishlist!');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wishlistButton} onPress={addToWishlist}>
        <Text style={styles.buttonText}>Add to Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#ff5733',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  wishlistButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
