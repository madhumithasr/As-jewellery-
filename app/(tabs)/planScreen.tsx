import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';

export default function InstallmentPaymentScreen() {
  const params = useLocalSearchParams<{ planId: string | string[] }>();
  const planId = Array.isArray(params.planId)
    ? params.planId[0]
    : params.planId || '';

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handlePayNow = () => {
    setErrorMsg('');

    if (!amount || Number(amount) < 5000) {
      setErrorMsg('Minimum installment must be ₹5000');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  // ⭐ CHANGE: Continue → Profile Screen
  const handleContinue = () => {
    router.push('/(tabs)/myActivityPlan');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Installment Payment</Text>
      <Text style={styles.subText}>Plan ID: {planId}</Text>

      <Text style={styles.label}>Enter Installment Amount *</Text>
      <TextInput
        placeholder="₹ Enter amount"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <Text style={[styles.label, { marginTop: 20 }]}>Select Payment Mode</Text>

      <View style={styles.methodContainer}>
        {['UPI', 'Card', 'NetBanking', 'Cash'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.methodButton,
              paymentMethod === method && styles.methodActive,
            ]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text
              style={[
                styles.methodText,
                paymentMethod === method && styles.methodTextActive,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayNow}>
        <Text style={styles.buttonText}>Proceed to Pay</Text>
      </TouchableOpacity>

      {/* Processing Modal */}
      <Modal transparent visible={processing} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text style={styles.processingText}>Processing Payment…</Text>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal transparent visible={success} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.successBox}>
            <Text style={styles.successTick}>✔</Text>
            <Text style={styles.successText}>Payment Successful</Text>

            <Text style={styles.successLabel}>Amount</Text>
            <Text style={styles.successValue}>₹{amount}</Text>

            <Text style={styles.successLabel}>Method</Text>
            <Text style={styles.successValue}>{paymentMethod}</Text>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#aaa',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  methodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 10,
  },
  methodButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  methodActive: {
    backgroundColor: '#FFD700',
  },
  methodText: {
    color: '#fff',
    fontWeight: '600',
  },
  methodTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  processingText: {
    marginTop: 10,
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successBox: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  successTick: {
    fontSize: 50,
    color: '#4CAF50',
    marginBottom: 10,
  },
  successText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  successValue: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  continueText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
