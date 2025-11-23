import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function PlanScreen() {
  const { planId } = useLocalSearchParams<{ planId: string | string[] }>();

  // Ensure planId is always a string
  const planIdStr = Array.isArray(planId) ? planId[0] : planId || '';

  const userId = 'USER12345'; // static for now

  // Static plan details
  const monthlyAmount = 1500;
  const durationMonths = 12;
  const bonusPercentage = 5;

  const goldRate = 8500;
  const startDate = '01/01/2025';
  const endDate = '01/01/2026';

  const goldSavingGram = ((monthlyAmount * durationMonths) / goldRate).toFixed(
    2
  );

  const bonusAmount = (
    (monthlyAmount * durationMonths * bonusPercentage) /
    100
  ).toFixed(2);

  const totalPayable = (
    monthlyAmount * durationMonths +
    Number(bonusAmount)
  ).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Plan Details</Text>

      <View style={styles.card}>
        <Detail label="Plan ID" value={planIdStr} />
        <Detail label="User ID" value={userId} />
        <Detail label="Gold Rate" value={`₹ ${goldRate}`} />
        <Detail label="Start Date" value={startDate} />
        <Detail label="End Date" value={endDate} />
        <Detail label="Duration" value={`${durationMonths} months`} />
        <Detail label="Monthly Amount" value={`₹ ${monthlyAmount}`} />
        <Detail label="Bonus Amount" value={`₹ ${bonusAmount}`} />
        <Detail label="Total Payable" value={`₹ ${totalPayable}`} />
        <Detail label="Gold Saving (Grams)" value={`${goldSavingGram} g`} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/myActivityPlan',
            params: { planId: planIdStr },
          })
        }
      >
        <Text style={styles.buttonText}>Pay Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ✅ FIXED DETAIL COMPONENT (NO TypeScript warnings)
type DetailProps = {
  label: string;
  value: string;
};

function Detail({ label, value }: DetailProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

// ------------------- STYLES ---------------------

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detailLabel: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
