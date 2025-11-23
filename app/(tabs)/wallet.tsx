import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DollarSign } from 'lucide-react-native';

export default function WalletScreen() {
  const user = {
    id: 'U12345',
    name: 'Madhumitha',
    email: 'madhumitha@example.com',
    phone: '+91 98765 43210',
  };

  const earnings = [
    { id: 'e1', type: 'Referral', amount: 500, date: '2025-11-01' },
    { id: 'e2', type: 'Bonus', amount: 200, date: '2025-11-05' },
  ];

  const commissions = [
    { id: 'c1', type: 'Sale', amount: 150, date: '2025-11-02' },
    { id: 'c2', type: 'Level Bonus', amount: 120, date: '2025-11-04' },
    { id: 'c3', type: 'Team Bonus', amount: 250, date: '2025-11-09' },
  ];

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <ScrollView style={styles.container}>
      {/* USER DETAILS */}
      <View style={styles.userCard}>
        <Text style={styles.userTitle}>User Details</Text>

        <View style={styles.userRow}>
          <Text style={styles.userLabel}>User ID</Text>
          <Text style={styles.userValue}>{user.id}</Text>
        </View>

        <View style={styles.userRow}>
          <Text style={styles.userLabel}>Name</Text>
          <Text style={styles.userValue}>{user.name}</Text>
        </View>

        <View style={styles.userRow}>
          <Text style={styles.userLabel}>Email</Text>
          <Text style={styles.userValue}>{user.email}</Text>
        </View>

        <View style={styles.userRow}>
          <Text style={styles.userLabel}>Phone</Text>
          <Text style={styles.userValue}>{user.phone}</Text>
        </View>
      </View>

      {/* TOTALS */}
      <View style={styles.totalsCard}>
        <View style={styles.totalItem}>
          <DollarSign size={20} color="#FFD700" />
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalValue}>₹{totalEarnings}</Text>
        </View>

        <View style={styles.totalItem}>
          <DollarSign size={20} color="#4CAF50" />
          <Text style={styles.totalLabel}>Total Commissions</Text>
          <Text style={styles.totalValue}>₹{totalCommissions}</Text>
        </View>
      </View>

      {/* Earnings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earnings</Text>

        {earnings.map((e) => (
          <View key={e.id} style={styles.listItem}>
            <Text style={styles.itemType}>{e.type}</Text>
            <Text style={styles.itemAmount}>₹{e.amount}</Text>
            <Text style={styles.itemDate}>
              {new Date(e.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>

      {/* Commissions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commissions</Text>

        {commissions.map((c) => (
          <View key={c.id} style={styles.listItem}>
            <Text style={styles.itemType}>{c.type}</Text>
            <Text style={styles.itemAmount}>₹{c.amount}</Text>
            <Text style={styles.itemDate}>
              {new Date(c.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },

  userCard: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  userTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '700',
    marginBottom: 12,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userLabel: { color: '#bdbdbd', fontSize: 14 },
  userValue: { color: '#FFD700', fontSize: 14, fontWeight: '600' },

  totalsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 20,
  },
  totalItem: { alignItems: 'center', width: '48%' },
  totalLabel: { color: '#ccc', marginTop: 6 },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 4,
  },

  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  itemType: { color: '#fff', flex: 1, fontSize: 14 },
  itemAmount: {
    color: '#4CAF50',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  itemDate: { color: '#888', flex: 1, fontSize: 12, textAlign: 'right' },
});
