import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getItemQuantity, updateQuantity: updateCartQuantity } = useCart();

  const currentCartQuantity = getItemQuantity(product.id);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity selector after adding
    
    // Show success feedback
    Alert.alert(
      'Added to Cart! ✅',
      `${quantity} ${product.name} ${quantity > 1 ? 'items have' : 'item has'} been added to your cart.`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('Cart'),
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productWeight}>{product.weight}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>{product.price}</Text>
            <Text style={styles.originalPrice}>₹{parseInt(product.price.slice(1)) + 50}</Text>
          </View>

          <Text style={styles.descriptionTitle}>About this product</Text>
          <Text style={styles.description}>
            Fresh, organic {product.name.toLowerCase()} sourced directly from certified organic farms. 
            Rich in nutrients and free from harmful pesticides and chemicals. 
            Perfect for a healthy and sustainable lifestyle.
          </Text>

          <Text style={styles.benefitsTitle}>Health Benefits</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
              <Text style={styles.benefitText}>Rich in vitamins and minerals</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
              <Text style={styles.benefitText}>100% organic certification</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
              <Text style={styles.benefitText}>Pesticide-free cultivation</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
              <Text style={styles.benefitText}>Farm-fresh quality</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
          >
            <Ionicons name="remove" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <Ionicons name="add" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 0,
    marginBottom: 20,
  },
  productInfo: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 120,
  },
  categoryBadge: {
    backgroundColor: theme.colors.border.light,
    paddingHorizontal: theme.spacing.xs * 2.4,
    paddingVertical: theme.spacing.xs * 1.2,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  categoryText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  productName: {
    fontSize: 28,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm * 0.8,
  },
  productWeight: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  productPrice: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  originalPrice: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  descriptionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.xl * 0.83,
  },
  benefitsTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  benefitsList: {
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingVertical: 5,
    marginRight: 15,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  addToCartPrice: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
});