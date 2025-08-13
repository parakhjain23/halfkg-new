import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const organicProducts = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: '₹120',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Bananas',
    category: 'Fruits',
    weight: '1kg',
  },
  {
    id: 2,
    name: 'Fresh Spinach',
    price: '₹80',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Spinach',
    category: 'Vegetables',
    weight: '500g',
  },
  {
    id: 3,
    name: 'Organic Quinoa',
    price: '₹350',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Quinoa',
    category: 'Grains',
    weight: '1kg',
  },
  {
    id: 4,
    name: 'Organic Apples',
    price: '₹200',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Apples',
    category: 'Fruits',
    weight: '1kg',
  },
  {
    id: 5,
    name: 'Organic Carrots',
    price: '₹90',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Carrots',
    category: 'Vegetables',
    weight: '500g',
  },
  {
    id: 6,
    name: 'Brown Rice',
    price: '₹150',
    image: 'https://via.placeholder.com/150x150/000000/FFFFFF?text=Rice',
    category: 'Grains',
    weight: '1kg',
  },
];

const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Dairy'];

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredProducts = organicProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ProductCard = ({ product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productWeight}>{product.weight}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>halfkg</Text>
          <Text style={styles.headerSubtitle}>Organic Store</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#000000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search organic products..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  categoryButtonActive: {
    backgroundColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#000000',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});