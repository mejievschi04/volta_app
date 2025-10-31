import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.replace('./Login'), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ Volta App</Text>
      <ActivityIndicator size="large" color="#FFEE00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 32, color: '#FFEE00', fontWeight: 'bold', marginBottom: 20 },
});
