import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const orderHistory = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 450,
    items: [
      { name: 'Organic Bananas', quantity: 2, price: 120, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=B' },
      { name: 'Fresh Spinach', quantity: 1, price: 80, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=S' },
      { name: 'Brown Rice', quantity: 1, price: 150, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=R' },
    ],
  },
  {
    id: 'ORD002',
    date: '2024-01-12',
    status: 'Delivered',
    total: 320,
    items: [
      { name: 'Organic Quinoa', quantity: 1, price: 350, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=Q' },
    ],
  },
  {
    id: 'ORD003',
    date: '2024-01-10',
    status: 'In Transit',
    total: 280,
    items: [
      { name: 'Organic Apples', quantity: 1, price: 200, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=A' },
      { name: 'Organic Carrots', quantity: 1, price: 90, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=C' },
    ],
  },
  {
    id: 'ORD004',
    date: '2024-01-08',
    status: 'Processing',
    total: 180,
    items: [
      { name: 'Fresh Spinach', quantity: 2, price: 80, image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=S' },
    ],
  },
];

export default function MyOrdersScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Processing', 'In Transit', 'Delivered'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#28a745';
      case 'In Transit': return '#ffc107';
      case 'Processing': return '#007bff';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return 'checkmark-circle';
      case 'In Transit': return 'car';
      case 'Processing': return 'time';
      default: return 'help-circle';
    }
  };

  const filteredOrders = selectedFilter === 'All' 
    ? orderHistory 
    : orderHistory.filter(order => order.status === selectedFilter);

  const OrderCard = ({ order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
            <Ionicons name={getStatusIcon(order.status)} size={16} color={getStatusColor(order.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.slice(0, 2).map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>Qty: {item.quantity} × ₹{item.price}</Text>
            </View>
          </View>
        ))}
        {order.items.length > 2 && (
          <Text style={styles.moreItems}>+{order.items.length - 2} more items</Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalAmount}>Total: ₹{order.total}</Text>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#000000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={80} color="#CCC" />
            <Text style={styles.emptyStateText}>No orders found</Text>
            <Text style={styles.emptyStateSubtext}>Your {selectedFilter.toLowerCase()} orders will appear here</Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  filtersContainer: {
    height: 50,
    paddingVertical: 10,
    maxHeight: 54,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  filterButtonActive: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  itemsContainer: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  itemDetails: {
    fontSize: 12,
    color: '#666',
  },
  moreItems: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginRight: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 100,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});