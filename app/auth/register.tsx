import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      // ----------------------------------------------------
      // VALIDATIONS
      // ----------------------------------------------------
      if (!fullName.trim()) return Alert.alert('Error', 'Enter full name');

      if (!phone || phone.length < 10)
        return Alert.alert('Error', 'Enter valid phone number');

      if (password.length < 6)
        return Alert.alert('Error', 'Password must be at least 6 characters');

      if (password !== confirmPassword)
        return Alert.alert('Error', 'Passwords do not match');

      if (!/^\d{12}$/.test(aadharNumber))
        return Alert.alert('Error', 'Enter valid 12-digit Aadhar');

      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber))
        return Alert.alert('Error', 'Invalid PAN format (ABCDE1234F)');

      setLoading(true);

      // ----------------------------------------------------
      // CREATE AUTH ACCOUNT
      // ----------------------------------------------------
      const sanitizedPhone = phone.replace(/\D+/g, '');
      const email = `${sanitizedPhone}@asjewellers.app`;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone: sanitizedPhone,
            full_name: fullName.trim(),
          },
        },
      });

      if (authError) throw authError;
      if (!authData?.user) throw new Error('Signup failed');

      // ----------------------------------------------------
      // REFERRAL CHECK
      // ----------------------------------------------------
      let referrerId = null;

      if (referralCode.trim()) {
        const { data: refUser, error: refErr } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', referralCode.trim().toUpperCase())
          .maybeSingle();

        if (refErr) throw refErr;
        if (!refUser) {
          setLoading(false);
          return Alert.alert('Error', 'Invalid referral code');
        }

        referrerId = refUser.id;
      }

      const generatedReferral =
        'REF' + Math.floor(100000 + Math.random() * 900000);

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        phone_number: sanitizedPhone,
        full_name: fullName.trim(),
        aadhar_number: aadharNumber,
        pan_number: panNumber.toUpperCase(),
        referral_code: generatedReferral,
        referred_by: referrerId,
        status: 'active',
        kyc_verified: false,
      });

      if (profileError) throw profileError;

      // ----------------------------------------------------
      // CREATE WALLET
      // ----------------------------------------------------
      const { error: walletError } = await supabase.from('wallets').insert({
        user_id: authData.user.id,
        saving_balance: 0,
        referral_balance: 0,
        total_balance: 0,
      });

      if (walletError) console.log('Wallet error:', walletError);

      // ----------------------------------------------------
      // FINISH
      // ----------------------------------------------------
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/auth/login'),
        },
      ]);
    } catch (err: any) {
      console.log('Register Error:', err);
      Alert.alert('Error', err.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join A S Jewellers Today</Text>

        {/* FULL NAME */}
        <Input
          label="Full Name *"
          value={fullName}
          onChange={setFullName}
          placeholder="Enter your full name"
        />

        {/* PHONE */}
        <Input
          label="Phone Number *"
          value={phone}
          onChange={setPhone}
          keyboardType="phone-pad"
          placeholder="1234567890"
        />

        {/* PASSWORD */}
        <Input
          label="Password *"
          value={password}
          onChange={setPassword}
          placeholder="Minimum 6 characters"
          secureTextEntry
        />

        {/* CONFIRM PASSWORD */}
        <Input
          label="Confirm Password *"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter password"
          secureTextEntry
        />

        {/* AADHAR */}
        <Input
          label="Aadhar Number *"
          value={aadharNumber}
          onChange={(text) =>
            setAadharNumber(text.replace(/\D/g, '').slice(0, 12))
          }
          keyboardType="numeric"
          placeholder="12-digit Aadhar"
          maxLength={12}
        />

        {/* PAN */}
        <Input
          label="PAN Number *"
          value={panNumber}
          onChange={(t) => setPanNumber(t.toUpperCase().slice(0, 10))}
          placeholder="ABCDE1234F"
          maxLength={10}
        />

        {/* REFERRAL */}
        <Input
          label="Referral Code (Optional)"
          value={referralCode}
          onChange={(t) => setReferralCode(t.toUpperCase())}
          placeholder="Referral code"
        />

        {/* BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.replace('/auth/login')}
        >
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginTextBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  keyboardType,
  maxLength,
}: any) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  content: { padding: 24, paddingTop: 60 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: '#999', marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#fff', marginBottom: 8 },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#1a1a1a', fontSize: 16, fontWeight: 'bold' },
  loginLink: { marginTop: 24, alignItems: 'center', marginBottom: 40 },
  loginText: { color: '#999', fontSize: 14 },
  loginTextBold: { color: '#FFD700', fontWeight: 'bold' },
});
