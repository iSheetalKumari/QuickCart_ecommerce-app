import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import ProductCard from '../components/ProductCard';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Refresh function
  const handleRefresh = () => {
    setRefreshing(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setRefreshing(false);
      });
  };

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      />

      {/* Category Filters */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={{
              marginRight: 10,
              padding: 8,
              backgroundColor: selectedCategory === category ? 'blue' : 'gray',
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>{category}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setSelectedCategory('')}
          style={{
            padding: 8,
            backgroundColor: selectedCategory === '' ? 'blue' : 'gray',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white' }}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
