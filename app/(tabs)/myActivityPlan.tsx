import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Calendar, UserCircle, Phone } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface Plan {
  id: string;
  name: string;
  monthly_amount: number;
  duration_months: number;
  bonus_percentage?: number;
  bonus_amount?: number;
  status: string;
  months_paid: number;
  pending_amount: number;
}

export default function MyActivityPlan() {
  const { profile } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const data: Plan[] = [
        {
          id: '1',
          name: 'Gold Plan',
          monthly_amount: 1000,
          duration_months: 12,
          bonus_percentage: 5,
          bonus_amount: 500,
          status: 'active',
          months_paid: 5,
          pending_amount: 7000,
        },
        {
          id: '2',
          name: 'Silver Plan',
          monthly_amount: 500,
          duration_months: 6,
          bonus_percentage: 3,
          bonus_amount: 150,
          status: 'active',
          months_paid: 5,
          pending_amount: 500,
        },
        {
          id: '3',
          name: 'Platinum Plan',
          monthly_amount: 2000,
          duration_months: 24,
          bonus_percentage: 7,
          bonus_amount: 1400,
          status: 'active',
          months_paid: 5,
          pending_amount: 38000,
        },
        {
          id: '4',
          name: 'Bronze Plan',
          monthly_amount: 300,
          duration_months: 3,
          bonus_percentage: 2,
          bonus_amount: 18,
          status: 'active',
          months_paid: 2,
          pending_amount: 300,
        },
      ];
      setPlans(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
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

      <Text style={styles.title}>My Activity Plans</Text>
      {plans.map((plan) => {
        const remainingMonths = plan.duration_months - plan.months_paid;
        const pendingPerMonth =
          remainingMonths > 0 ? plan.pending_amount / remainingMonths : 0;

        return (
          <TouchableOpacity
            key={plan.id}
            style={styles.planCard}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/planDetail',
                params: { planId: plan.id },
              })
            }
          >
            <View style={styles.planRow}>
              <Calendar size={24} color="#FFD700" />
              <Text style={styles.planName}>{plan.name}</Text>
            </View>
            <Text style={styles.planInfo}>Monthly: ₹{plan.monthly_amount}</Text>
            <Text style={styles.planInfo}>
              Duration: {plan.duration_months} months | Paid: {plan.months_paid}{' '}
              months | Status: {plan.status.toUpperCase()}
            </Text>
            <Text
              style={[
                styles.planInfo,
                plan.pending_amount > 0
                  ? { color: '#ef4444' }
                  : { color: '#999' },
              ]}
            >
              Pending Payment: ₹{plan.pending_amount} | ₹
              {pendingPerMonth.toFixed(0)}/month
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* NEW BUTTON SECTION */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FFD700' }]}
          onPress={() => router.push('/(tabs)/planDetail')}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>
            Go to Referral History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 12, backgroundColor: '#444' }]}
          onPress={() => router.push('/wallet')} // Navigate to Wallet / Invite & Earn
        >
          <Text style={styles.buttonText}>Invite & Earn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

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
  },

  planCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  planName: { fontSize: 18, fontWeight: '600', color: '#fff' },
  planInfo: { fontSize: 14, color: '#999' },

  buttonSection: { marginTop: 24 },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
