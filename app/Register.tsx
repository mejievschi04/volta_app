import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonVolta from './components/ButtonVolta';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Eroare', 'Completează toate câmpurile!');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Eroare', 'Parolele nu coincid!');
      return;
    }
    // simulare înregistrare
    Alert.alert('Succes', 'Cont creat cu succes!');
    router.replace('./Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Înregistrare</Text>

        <TextInput
          placeholder="Nume complet"
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Parola"
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmă parola"
          placeholderTextColor="#CCCCCC"
          style={styles.input}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <ButtonVolta title="Creează cont" onPress={handleRegister} />
        <View style={{ height: 10 }} />
        <ButtonVolta title="Ai deja cont? Autentifică-te" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFEE00',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
  },
});
