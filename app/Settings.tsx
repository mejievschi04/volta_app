import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setări</Text>
      <Text style={styles.text}>Setările aplicației vor fi aici.</Text>
      <Button title="Înapoi" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: '700', color: '#FFEE00', marginBottom: 12 },
  text: { color: '#EEE', marginBottom: 20 },
});
