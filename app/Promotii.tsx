import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = Math.round(height * 0.25); // 25% of screen height

const promos = [
  { id: 'p1', title: 'Promoția 1', subtitle: 'Reducere 20% la toate produsele' },
  { id: 'p2', title: 'Promoția 2', subtitle: 'Transport gratuit' },
  { id: 'p3', title: 'Promoția 3', subtitle: 'Cumpără 2, primești 1' },
  { id: 'p4', title: 'Promoția 4', subtitle: 'Cadou la prima comandă' },
  { id: 'p5', title: 'Promoția 5', subtitle: 'Ofertă limitată' },
];

export default function Promotii() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promoții</Text>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {promos.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, { height: ITEM_HEIGHT, width: width - 40 }]}
            activeOpacity={0.85}
            onPress={() => {
              // placeholder: navigate to promo details or show details
              router.push('/Promotii');
            }}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.cardSubtitle}>{p.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#FFEE00', marginBottom: 12 },
  list: { paddingBottom: 40, alignItems: 'center' },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cardContent: { paddingHorizontal: 16 },
  cardTitle: { color: '#FFEE00', fontSize: 20, fontWeight: '700', marginBottom: 6 },
  cardSubtitle: { color: '#DDD', fontSize: 14 },
});
