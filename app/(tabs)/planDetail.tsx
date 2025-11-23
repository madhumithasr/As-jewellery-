import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar,
  Wallet,
  Award,
  UserCircle,
  Phone,
} from 'lucide-react-native';

interface Plan {
  id: string;
  name: string;
  monthly_amount: number;
  duration_months: number;
  payment_months: number;
  bonus_percentage?: number;
  bonus_amount?: number;
  status: string;
  pending_amount: number;
  months_paid: number;
}

export default function PlanDetail() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const { profile } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);

  const fetchPlanDetail = async () => {
    try {
      const data: Plan = {
        id: planId || '1',
        name:
          planId === '1'
            ? 'Gold Plan'
            : planId === '2'
            ? 'Silver Plan'
            : planId === '3'
            ? 'Platinum Plan'
            : 'Bronze Plan',
        monthly_amount:
          planId === '1'
            ? 1000
            : planId === '2'
            ? 500
            : planId === '3'
            ? 2000
            : 300,
        duration_months:
          planId === '1' ? 12 : planId === '2' ? 6 : planId === '3' ? 24 : 3,
        payment_months:
          planId === '1' ? 12 : planId === '2' ? 6 : planId === '3' ? 24 : 3,
        bonus_percentage:
          planId === '1' ? 5 : planId === '2' ? 3 : planId === '3' ? 7 : 2,
        bonus_amount:
          planId === '1'
            ? 500
            : planId === '2'
            ? 150
            : planId === '3'
            ? 1400
            : 18,
        status:
          planId === '1'
            ? 'active'
            : planId === '2'
            ? 'completed'
            : planId === '3'
            ? 'active'
            : 'completed',
        pending_amount:
          planId === '1'
            ? 2000
            : planId === '2'
            ? 0
            : planId === '3'
            ? 8000
            : 0,
        months_paid:
          planId === '1' ? 10 : planId === '2' ? 6 : planId === '3' ? 20 : 3,
      };
      setPlan(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (planId) fetchPlanDetail();
  }, [planId]);

  if (!plan) return null;

  const remainingMonths = plan.duration_months - plan.months_paid;
  const pendingPerMonth =
    remainingMonths > 0 ? plan.pending_amount / remainingMonths : 0;

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.userCard}>
        <UserCircle size={80} color="#FFD700" />
        <Text style={styles.userName}>{profile?.full_name || 'Demo User'}</Text>
        <View style={styles.userPhoneRow}>
          <Phone size={16} color="#999" />
          <Text style={styles.userPhone}>
            {profile?.phone_number || '1234567890'}
          </Text>
        </View>
      </View>

      {/* Plan Detail */}
      <Text style={styles.title}>{plan.name}</Text>
      <View style={styles.detailCard}>
        <View style={styles.row}>
          <Wallet size={20} color="#FFD700" />
          <Text style={styles.label}>Monthly Amount:</Text>
          <Text style={styles.value}>₹{plan.monthly_amount}</Text>
        </View>
        <View style={styles.row}>
          <Calendar size={20} color="#FFD700" />
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{plan.duration_months} months</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Months Paid:</Text>
          <Text style={styles.value}>{plan.months_paid}</Text>
        </View>
        <View style={styles.row}>
          <Award size={20} color="#FFD700" />
          <Text style={styles.label}>Bonus:</Text>
          <Text style={styles.value}>
            {plan.bonus_amount} ({plan.bonus_percentage}%)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{plan.status.toUpperCase()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pending Payment:</Text>
          <Text
            style={[
              styles.value,
              plan.pending_amount > 0
                ? { color: '#ef4444' }
                : { color: '#999' },
            ]}
          >
            ₹{plan.pending_amount} | ₹{pendingPerMonth.toFixed(0)}/month
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 16 },
  userCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 8,
  },
  userPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  userPhone: { color: '#999', fontSize: 14 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  label: { color: '#999', fontSize: 16, flex: 1 },
  value: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
