import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import BottomMenu from './components/BottomMenu';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Slot />
        <BottomMenu />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Add a small top padding globally so screen content doesn't start flush
  // with the very top edge on all routes. Screens that already manage
  // safe-area insets may add additional spacing; this is intentionally small.
  container: { flex: 1, backgroundColor: '#000', paddingTop: 12 },
});
