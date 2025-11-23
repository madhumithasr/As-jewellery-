import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router'; // for navigation

export default function ReferralScreen() {
  const referralCode = 'MADHU123';
  const inviteLink = `https://yourapp.com/ref/${referralCode}`;

  const rows = [
    { amount: 150, percent: 10 },
    { amount: 45, percent: 3 },
    { amount: 30, percent: 2 },
    { amount: 22.5, percent: 1.5 },
    { amount: 11.25, percent: 0.75 },
    { amount: 11.25, percent: 0.75 },
    { amount: 7.5, percent: 0.5 },
    { amount: 7.5, percent: 0.5 },
    { amount: 7.5, percent: 0.5 },
    { amount: 7.5, percent: 0.5 },
  ];

  const bonus = 200;
  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
  const totalPercent = rows.reduce((sum, r) => sum + r.percent, 0);
  const totalReferralBonus = totalAmount + bonus;

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', 'Copied to clipboard.');
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Join me using my referral link: ${inviteLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share link.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Referral Program</Text>

      {/* Referral Statistics */}
      <View style={styles.statsBox}>
        <Text style={styles.statsLabel}>Total Referral Bonus</Text>
        <Text style={styles.statsValue}>₹ {totalReferralBonus.toFixed(2)}</Text>
      </View>

      {/* Referral Code */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Referral Code</Text>
        <Text style={styles.codeText}>{referralCode}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => copyToClipboard(referralCode)}
        >
          <Text style={styles.buttonText}>Copy Code</Text>
        </TouchableOpacity>
      </View>

      {/* Invite Link */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Invite Link</Text>
        <Text style={styles.linkText}>{inviteLink}</Text>
        <TouchableOpacity style={styles.button} onPress={shareLink}>
          <Text style={styles.buttonText}>Share Link</Text>
        </TouchableOpacity>
      </View>

      {/* Referral Table */}
      <Text style={styles.tableTitle}>Referral Bonus Table</Text>
      <View style={styles.tableBox}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.index]}>#</Text>
          <Text style={[styles.cell, styles.amount]}>Amount</Text>
          <Text style={[styles.cell, styles.percent]}>%</Text>
        </View>

        {rows.map((r, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.cell, styles.index]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.amount]}>
              ₹ {r.amount.toFixed(2)}
            </Text>
            <Text style={[styles.cell, styles.percent]}>({r.percent}%)</Text>
          </View>
        ))}

        <View style={styles.bonusRow}>
          <Text style={styles.bonusLabel}>Extra Bonus</Text>
          <Text style={styles.bonusValue}>₹ {bonus.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            Total ₹ {totalAmount + bonus} ({totalPercent.toFixed(1)}%)
          </Text>
        </View>
      </View>

      {/* NEW BUTTON SECTION */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FFD700' }]}
          onPress={() => router.push('/(tabs)/myActivityPlan')} // navigate to another page
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>
            Go to Referral History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 10, backgroundColor: '#444' }]}
          onPress={() => router.push('/wallet')} // navigate to Wallet page
        >
          <Text style={styles.buttonText}> Earn & commissions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: {
    color: 'gold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsBox: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  statsLabel: { color: '#aaa', fontSize: 16 },
  statsValue: { color: 'gold', fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: 'gold',
    borderWidth: 1,
  },
  cardTitle: { color: 'gold', fontSize: 16, marginBottom: 6 },
  codeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkText: { color: '#ccc', fontSize: 14, marginBottom: 10 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tableTitle: { color: 'gold', fontSize: 18, marginBottom: 10 },
  tableBox: {
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 10,
    borderColor: 'gold',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cell: { color: '#fff', fontSize: 14 },
  index: { width: '10%', textAlign: 'center' },
  amount: { width: '60%' },
  percent: { width: '30%', textAlign: 'right' },
  bonusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  bonusLabel: { color: 'gold', fontWeight: 'bold' },
  bonusValue: { color: '#fff' },
  totalRow: {
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 6,
    marginTop: 8,
  },
  totalText: {
    color: 'gold',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
