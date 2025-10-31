import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonVolta from './components/ButtonVolta';

export default function Promotii() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promotii</Text>
      <ButtonVolta title="Înapoi" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#000' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFEE00', marginBottom: 20 },
});
