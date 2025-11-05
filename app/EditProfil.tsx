import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfil() {
  const router = useRouter();
  const [name, setName] = useState('Ion Mejievschi');
  const [email, setEmail] = useState('ion.mejievschi@email.com');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    Alert.alert('Salvat', 'Datele personale au fost actualizate.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editează Profilul</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nume</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Introdu numele"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Introdu emailul"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Parolă nouă</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Lasă gol dacă nu vrei să o schimbi"
          placeholderTextColor="#666"
          secureTextEntry
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#000" />
          <Text style={styles.saveText}>Salvează</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={20} color="#FFEE00" />
          <Text style={styles.backText}>Înapoi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: '700', color: '#FFEE00', marginBottom: 20, textAlign: 'center' },
  form: { marginTop: 10 },
  label: { color: '#FFEE00', fontSize: 16, marginBottom: 6 },
  input: {
    backgroundColor: '#111',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEE00',
    borderRadius: 10,
    paddingVertical: 12,
  },
  saveText: { color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 6 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backText: { color: '#FFEE00', fontSize: 16, marginLeft: 6 },
});
