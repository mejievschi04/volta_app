import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonVolta from './components/ButtonVolta';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" placeholderTextColor="#CCCCCC" style={styles.input} />
      <TextInput placeholder="Parola" secureTextEntry placeholderTextColor="#CCCCCC" style={styles.input} />

      <ButtonVolta title="Autentificare" onPress={() => router.replace('./Home')} />
      <ButtonVolta title="Înregistrează-te" onPress={() => router.push('./Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFEE00', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
  },
});
